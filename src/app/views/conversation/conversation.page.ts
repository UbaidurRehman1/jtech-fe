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

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss']
})
export class ConversationPage implements OnInit, OnDestroy {
    private static sessionId = 'sessionId';
    private sessionId: string;
    public message: string;
    private session: Session = null;
    private isLoading = true;
    // tslint:disable-next-line:variable-name
    private _userName = null;
    constructor(public activeRoute: ActivatedRoute,
                public conversationService: ConversationService,
                public authService: AuthService,
                private sessionService: SessionService,
    ) {
    }
    // tslint:disable-next-line:variable-name
    public conversation_: Observable<Message[]> = null;
    ngOnInit() {
        this.isLoading = true;
        this.activeRoute.paramMap.subscribe((value: ParamMap) => {
            if (value.has(ConversationPage.sessionId)) {
                this.sessionId = value.get(ConversationPage.sessionId);

                // this.sessionService.getSession(this.sessionId).subscribe((session: Session) => {
                //     this.session = session;
                //     this.conversation = this.getConversation();
                //     this.isLoading = false;
                // });
            }
        });
        // this.authService.getUser().subscribe((user: User) => {
        //     this.userName = user.name;
        // });
    }
    get conversation(): Observable<Message[]> {
        return this.conversation_;
    }

    set conversation(value: Observable<Message[]>) {
        this.conversation_ = value;
    }

    get userName(): any {
        return this._userName;
    }

    set userName(value: any) {
        this._userName = value;
    }

    public onSend(): void {
        this.conversationService.addMessage(new Message('1', this.sessionId, this.message, '1', null, null, null, null)).subscribe();
    }
    public getConversation(): Observable<Message[]> {
        return this.activeRoute.paramMap.pipe(switchMap((value: ParamMap) => {
            if (value.has(ConversationPage.sessionId)) {
                const sessionId = value.get(ConversationPage.sessionId);
                return this.conversationService.getConversation(sessionId);
            }
        }));
    }
    ngOnDestroy(): void {
        // this.sock._disconnect();
    }
}
