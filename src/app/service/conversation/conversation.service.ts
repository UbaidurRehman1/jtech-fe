import { Injectable } from '@angular/core';
import {MessageModel} from '../../model/conversation/messageModel';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {User} from '../../model/user/user';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private messagesTemp: MessageModel[] = [
        new MessageModel('1', '1', 'Hello, How are you', '1', new Date(), new Date(), new Date('2019-10-15T22:22:18.101'), null),
        new MessageModel('2', '1', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not',
            '2', new Date(), new Date(), new Date('2019-10-15T22:22:19.101'), null),
        new MessageModel('3', '2', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not',
            '1', new Date(), new Date(), new Date('2019-10-15T22:22:20.101'), null),
        new MessageModel('4', '2', 'I am find, What are you doing now, I have heard a good news about you. Is this correct or not',
            '3', new Date(), new Date(), new Date('2019-10-15T22:22:21.101'), null)
    ];

    // tslint:disable-next-line:variable-name
    private _messages: BehaviorSubject<MessageModel[]> = new BehaviorSubject<MessageModel[]>(this.messagesTemp);
    constructor(private userService: UserService) { }

    public get messages(): Observable<MessageModel[]> {
        return this._messages.asObservable();
    }
    public getConversation(id: string): Observable<MessageModel[]> {
        return this.messages.pipe(map((messages: MessageModel[]) => {
            return messages.filter((messageModel: MessageModel) => {
                return messageModel.sessionId === id;
            });
        }), tap((messages: MessageModel[]) => {
            console.log(messages);
            messages.forEach((messageModel: MessageModel) => {
                this.userService.getUser(messageModel.ownerId).subscribe((user: User) => {
                    messageModel.owner = user;
                });
            });
        }));
    }
    public addMessage(messageModel: MessageModel): Observable<MessageModel[]> {
        return this.messages.pipe(take(1), tap((messages: MessageModel[]) => {
            messages.push(messageModel);
            this._messages.next(messages);
        }));
    }
}
