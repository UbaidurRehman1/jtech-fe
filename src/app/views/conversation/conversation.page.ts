import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ConversationService} from '../../service/conversation/conversation.service';
import {Session} from '../../model/session/session';
import {AuthService} from '../../service/auth/auth.service';
import {User} from '../../model/user/user';
import {Observable} from 'rxjs';
import {SessionService} from '../../service/session/session.service';
import {Message} from '../../model/conversation/messageModel';
import {UserService} from '../../service/user/user.service';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss']
})
export class ConversationPage implements OnInit, OnDestroy {
    private static sessionId = 'sessionId';
    public message: string;
    private isLoading = true;
    constructor(public activeRoute: ActivatedRoute,
                public conversationService: ConversationService,
                public authService: AuthService,
                private sessionService: SessionService,
                private userService: UserService
    ) {
    }
    private currentSession: Session = null;
    private currentConversation: Observable<Message[]> = null;
    private currentUserId: string = null;
    private currentRecieverUser: User = null;
    ngOnInit() {
        this.isLoading = true;
        this.currentConversation = null;
        this.currentSession = null;
        this.currentUserId = null;
        // TODO add subscription and delete this subscription on ng destroy
        // getting session and then getting conversation
        this.activeRoute.paramMap.subscribe((value: ParamMap) => {
            if (value.has(ConversationPage.sessionId)) {
                const sessionId = value.get(ConversationPage.sessionId);
                // active this user on specified session
                console.log(sessionId);
                this.sessionService.activateUserOnSession(sessionId, this.user.id);
                this.sessionService.getCurrentSession(sessionId).subscribe((session: Session) => {
                    console.log(session);
                    console.log(this.user);
                    // tslint:disable-next-line:triple-equals
                    const recieverId: string = this.user.id == session.senderId ? session.receiverId : session.senderId;
                    console.log(recieverId);
                    this.userService.getUserById(recieverId).subscribe((reciever: User) => {
                        console.log(reciever);
                        this.reciever = reciever;
                    });
                    this.currentSession = session;
                    this.conversationService.populateConversation(sessionId).subscribe(() => {
                        this.conversation = this.conversationService.getCurrentConversation();
                        this.conversationService.startReceivedMessageObserver(sessionId, recieverId);
                        this.isLoading = false;
                    });
                });
            }
        });
    }
    get conversation(): Observable<Message[]> {
        return this.currentConversation;
    }

    set conversation(value: Observable<Message[]>) {
        this.currentConversation = value;
    }

    get user(): User {
        return this.authService.user;
    }
    get reciever(): User {
        return this.currentRecieverUser;
    }
    set reciever(user: User) {
        this.currentRecieverUser = user;
    }
    public onSend(): void {
        const message: Message = new Message(null, this.currentSession.id,
            this.message, this.authService.user.id, null, null, null, null);
        this.conversationService.sendMessage({...message}, this.currentSession.id).subscribe();
        this.message = '';
    }
    ngOnDestroy(): void {
        this.conversationService.removePoolingSubscription();
        this.sessionService.deactivateUserOnSession(this.currentSession.id, this.authService.user.id);
    }
}
