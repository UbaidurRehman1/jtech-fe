import { Injectable } from '@angular/core';
import {interval, Observable, Subscription} from 'rxjs';
import {Session} from '../../model/session/session';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Notification} from '../../model/notification/notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private notificationPoolingSubscription: Subscription = null;
    private url = 'http://localhost:8200/jtech/notifications/';
    constructor(private http: HttpClient,
                private authService: AuthService) { }

    public startNotificationPooling(sessionList: Observable<Session[]>): void {
        const counter: Observable<number> = interval(2000);
        this.notificationPoolingSubscription = counter.subscribe((num: number) => {
            const url = `${this.url}by/user/${this.authService.user.id}`;
            this.http.get(url).subscribe((notifications: Notification[]) => {
                sessionList.pipe(tap((sessions: Session[]) => {
                    sessions.forEach((session: Session) => {
                        const specificNotifications: Notification[] =
                            // tslint:disable-next-line:triple-equals
                            notifications.filter((notification: Notification) => notification.sessionId == session.id);
                        session.notificationNumber = specificNotifications.length;
                    });
                })).subscribe();
            });
        });
    }

    /**
     * update all unseen notifications of this user and sessions
     * @param userId of the user
     * @param sessionId of the session
     */
    public setAllUnseenNotificationToSeen(userId: string, sessionId: string) {
        const url = `${this.url}update/by/user/${userId}/session/${sessionId}`;
        this.http.get(url).subscribe();
    }
    public stopNotificationSubscription() {
        this.notificationPoolingSubscription.unsubscribe();
    }
    public getNumberOfNotifications(sessionId: string, notifications: Notification[]): string {
        return ;
    }
}
