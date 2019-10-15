import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ConversationService} from '../../../../service/conversation/conversation.service';
import {Message} from '../../../../model/conversation/message';
import {Session} from '../../../../model/session/session';
import {SessionService} from '../../../../service/session/session.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {User} from '../../../../model/user/user';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.page.html',
    styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
    private static sessionId = 'sessionId';
    private session: Session = null;
    private isLoading = true;
    // tslint:disable-next-line:variable-name
    private _userName = null;
    // tslint:disable-next-line:variable-name
    private _conversation: Message[] = null;
    constructor(public activeRoute: ActivatedRoute,
                public conversationService: ConversationService,
                public authService: AuthService) { }

    ngOnInit() {
        this.isLoading = true;
        this.activeRoute.paramMap.subscribe((value: ParamMap) => {
            if (value.has(ConversationPage.sessionId)) {
                const sessionId = value.get(ConversationPage.sessionId);
                this.conversationService.getConversation(sessionId).subscribe((conversation: Message[]) => {
                    this.conversation = conversation;
                    this.isLoading = false;
                    console.log(this.conversation);
                }, error => {
                    console.log(error);
                });
            }
        });
        this.authService.getUser().subscribe((user: User) => {
            this.userName = user.name;
        });
    }
    get conversation(): Message[] {
        return this._conversation;
    }

    set conversation(value: Message[]) {
        this._conversation = value;
    }

    get userName(): any {
        return this._userName;
    }

    set userName(value: any) {
        this._userName = value;
    }

}
