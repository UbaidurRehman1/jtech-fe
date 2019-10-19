import {Component, OnDestroy, OnInit} from '@angular/core';
import {Session} from '../../../model/session/session';
import {SessionService} from '../../../service/session/session.service';
import {AuthService} from '../../../service/auth/auth.service';
import {interval, Observable, of} from 'rxjs';
import {User} from '../../../model/user/user';
import {tap} from 'rxjs/operators';
import {NotificationService} from '../../../service/notification/notification.service';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.page.html',
    styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit, OnDestroy {
    private isLoading = true;
    // tslint:disable-next-line:variable-name
    private _sessions: Observable<Session[]> = null;
    constructor(private sessionService: SessionService,
                private authService: AuthService,
                private notificationService: NotificationService) { }
    ngOnInit() {
    }
    public ionViewWillEnter() {
        this.isLoading = true;
        this.sessionService.getSessionsById(this.authService.user.id).subscribe((sessions: Session[]) => {
            this._sessions = of(sessions);
            this.startNotificationPooling(this._sessions);
            this.isLoading = false;
        });
        // console.log(this.sessions);
    }
    get sessions(): Observable<Session[]> {
        return this._sessions;
    }
    set sessions(value: Observable<Session[]>) {
        this._sessions = value;
    }
    get user(): User {
        return this.authService.user;
    }
    public startNotificationPooling(sessionList: Observable<Session[]>): void {
        this.notificationService.startNotificationPooling(sessionList);
    }
    public stopNotificationPooling(): void {
        this.notificationService.stopNotificationSubscription();
    }

    ngOnDestroy(): void {
        this.stopNotificationPooling();
    }
}
