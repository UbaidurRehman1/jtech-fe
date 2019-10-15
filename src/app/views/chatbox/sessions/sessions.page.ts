import { Component, OnInit } from '@angular/core';
import {Session} from '../../../model/session/session';
import {SessionService} from '../../../service/session/session.service';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.page.html',
    styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
    // tslint:disable-next-line:variable-name
    private _sessions: Session[] = null;
    constructor(private sessionService: SessionService) { }

    ngOnInit() {
        this.sessionService.sessions.subscribe((session: Session[]) => {
            this.sessions = session;
        });
    }

    get sessions(): Session[] {
        return this._sessions;
    }
    set sessions(value: Session[]) {
        this._sessions = value;
    }
}
