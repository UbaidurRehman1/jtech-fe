import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ConversationService} from '../../service/conversation/conversation.service';
import {Session} from '../../model/session/session';
import {AuthService} from '../../service/auth/auth.service';
import {User} from '../../model/user/user';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SessionService} from '../../service/session/session.service';
import {Message} from '../../model/conversation/messageModel';
import {Timestamp} from 'rxjs/internal-compatibility';
import {AssertNotNull} from '@angular/compiler';

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
    ) {
    }
    private currentSession: Session = null;
    private currentConversation: Observable<Message[]> = null;
    private currentUserId: string = null;
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
                this.sessionService.getCurrentSession(sessionId).subscribe((session: Session) => {
                    console.log(session);
                    this.currentSession = session;
                    this.conversationService.populateConversation(sessionId).subscribe(() => {
                        this.conversation = this.conversationService.getCurrentConversation();
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

    get userName(): any {
        return null;
    }

    set userName(value: any) {
    }

    public onSend(): void {
        this.conversationService.sendMessage({...new Message('1', this.currentSession.id,
            this.message, this.authService.user.id, new Date(), null, null, null)}).subscribe();
    }
    public getConversation(): Observable<Message[]> {
        // return this.activeRoute.paramMap.pipe(switchMap((value: ParamMap) => {
        //     if (value.has(ConversationPage.sessionId)) {
        //         const sessionId = value.get(ConversationPage.sessionId);
        //         return this.conversationService.getConversation(sessionId);
        //     }
        // }));
        return  null;
    }
    ngOnDestroy(): void {
        // this.sock._disconnect();
    }
}
