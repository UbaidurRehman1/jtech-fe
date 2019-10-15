import { Injectable } from '@angular/core';
import {Message} from '../../model/conversation/message';
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
        new Message('2', '1', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not', '2', new Date(), new Date(), new Date('2019-10-15T22:22:19.101'), null),
        new Message('3', '1', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not', '1', new Date(), new Date(), new Date('2019-10-15T22:22:20.101'), null),
        new Message('4', '1', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not', '2', new Date(), new Date(), new Date('2019-10-15T22:22:21.101'), null)
    ];

    // tslint:disable-next-line:variable-name
    private _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>(this.messagesTemp);
    constructor(private userService: UserService) { }

    private get messages(): Observable<Message[]> {
        return this._messages.asObservable();
    }
    public getConversation(id: string): Observable<Message[]> {
        return this.messages.pipe(take(1), map((messages: Message[]) => {
            return messages.filter((message: Message) => {
                return message.sessionId === id;
            });
        }), tap((messages: Message[]) => {
            messages.forEach((message: Message) => {
                this.userService.getUser(message.ownerId).subscribe((user: User) => {
                    message.owner = user;
                });
            });
        }));
    }
}
