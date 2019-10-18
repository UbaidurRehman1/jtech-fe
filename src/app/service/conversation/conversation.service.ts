import { Injectable } from '@angular/core';
import {Message} from '../../model/conversation/messageModel';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {User} from '../../model/user/user';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private messagesTemp: Message[] = [
        new Message('1', '1', 'Hello, How are you', '1', new Date(), new Date(), new Date('2019-10-15T22:22:18.101'), null),
        new Message('2', '1', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not',
            '2', new Date(), new Date(), new Date('2019-10-15T22:22:19.101'), null),
        new Message('3', '2', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not',
            '1', new Date(), new Date(), new Date('2019-10-15T22:22:20.101'), null),
        new Message('4', '2', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not',
            '3', new Date(), new Date(), new Date('2019-10-15T22:22:21.101'), null)
    ];

    // tslint:disable-next-line:variable-name
    private _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.messagesTemp);
    constructor(private userService: UserService) { }

    public get messages(): Observable<Message[]> {
        return this._messages.asObservable();
    }
    public getConversation(id: string): Observable<Message[]> {
        return this.messages.pipe(map((messages: Message[]) => {
            return messages.filter((messageModel: Message) => {
                return messageModel.sessionId === id;
            });
        }), tap((messages: Message[]) => {
            // console.log(messages);
            // messages.forEach((messageModel: Message) => {
            //     this.userService.getUser(messageModel.ownerId).subscribe((user: User) => {
            //         messageModel.owner = user;
            //     });
            // });
        }));
    }
    public addMessage(messageModel: Message): Observable<Message[]> {
        return this.messages.pipe(take(1), tap((messages: Message[]) => {
            messages.push(messageModel);
            this._messages.next(messages);
        }));
    }
}
