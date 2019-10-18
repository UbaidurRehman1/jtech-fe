import { Component, OnInit } from '@angular/core';
import {Session} from '../../../model/session/session';
import {SessionService} from '../../../service/session/session.service';
import {AuthService} from '../../../service/auth/auth.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.page.html',
    styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
    private isLoading = true;
    // tslint:disable-next-line:variable-name
    private _sessions: Observable<Session[]> = null;
    constructor(private sessionService: SessionService,
                private authService: AuthService) { }
    ngOnInit() {
    }
    public ionViewWillEnter() {
        this.isLoading = true;
        this.sessions = this.sessionService.getSessionsById(this.authService.user.id);
        console.log(this.sessions);
        this.isLoading = false;
    }
    get sessions(): Observable<Session[]> {
        return this._sessions;
    }
    set sessions(value: Observable<Session[]>) {
        this._sessions = value;
    }
}
