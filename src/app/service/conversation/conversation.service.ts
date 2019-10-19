import { Injectable } from '@angular/core';
import {Message} from '../../model/conversation/messageModel';
import {BehaviorSubject, interval, Observable, pipe, Subscription} from 'rxjs';
import {count, delay, map, startWith, switchMap, take, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';
import {async} from '@angular/core/testing';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private url = 'http://localhost:8200/jtech/messages/';
    // tslint:disable-next-line:variable-name
    private _messages: BehaviorSubject<Message[]> = null;
    private poolingSubscription: Subscription = null;
    constructor(private userService: UserService,
                private http: HttpClient) { }

    public get messages(): Observable<Message[]> {
        return this._messages.asObservable().pipe(tap((messages: Message[]) => {
            console.log(messages);
        }));
    }
    /**
     * it will call when we enter into the conversion (hit the session)
     * we actually want to get SubjectBehavior so that any change can be detected
     * so it will assign a new instance of BehaviourSubject and conversation into it
     * @param sessionId of the session
     * @return all conversation of this session (limit 100)
     */
    public populateConversation(sessionId: string): Observable<Message[]> {
        const url = `${this.url}session/${sessionId}`;
        return this.http.get<Message[]>(url).pipe(take(1), map((messages: Message[]) => {
            messages.forEach((message: Message) => {
                this.userService.getUserById(message.ownerId).subscribe((owner: User) => {
                    message.owner = owner;
                });
            });
            this._messages = new BehaviorSubject<Message[]>(messages);
            return messages;
        }));
    }
    public sendMessage(message: Message, sessionId: string): Observable<Message[]> {
        return this.messages.pipe(take(1), tap((messages: Message[]) => {
            const len: number = messages.length;
            const url = `${this.url}session/${sessionId}`;
            this.http.post(url, message).subscribe();
            this.userService.getUserById(message.ownerId).subscribe((owner: User) => {
                message.owner = owner;
            });
            messages.push(message);
            this._messages.next(messages);
        }));
    }
    // a very basic idea, when we hit a session and enter into conversation
    // the very first method call is getConversation(sessionId) which return all
    // conversation of this session
    // now we have to store this conversation in the behaviour subject of Message[]
    // whenever a new message arrive then we push this message into array and set next
    // which emit all the message some thing like this....
    // lets start
    public getCurrentConversation(): Observable<Message[]> {
        return this.messages;
    }
    public startReceivedMessageObserver(sessionId: string, userId: string): void {
        console.log(`sessionId: ${sessionId} userId: ${userId}`);
        // url which is used to get the not received messages of sender
        const url = `${this.url}session/${sessionId}/user/${userId}`;
        // counter which do repeat it self after 2 seconds, we have removed its subscription at ng destroy
        const counter: Observable<number> = interval(2000);
        // after each 2 seconds it get not received messages
        this.poolingSubscription = counter.subscribe((num: number) => {
            this.http.get(url).subscribe((messages: Message[]) => {
                // this url will update the received time of the message
                const putURL = `${this.url}session`;
                // condition if new message arrived
                const newMessages: boolean = messages.length > 0;
                if (newMessages) {
                    // when new message received then
                    // updating the message
                    this.http.put(putURL, messages).subscribe();
                    // set the owner of the message
                    messages.forEach((message: Message) => {
                        this.userService.getUserById(message.ownerId).subscribe((owner: User) => {
                            message.owner = owner;
                            console.log(`new message: ${message}`);
                        });
                    });
                    // now emit the updated list of message
                    this._messages.next(this._messages.getValue().concat(messages));
                    // this._messages.getValue().concat(messages);
                }
            });
        });
    }
    public removePoolingSubscription() {
        console.log('Removing Pooling subscription');
        this.poolingSubscription.unsubscribe();
    }
}
