import { Injectable } from '@angular/core';
import {Session} from '../../model/session/session';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {User} from '../../model/user/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    private url = 'http://localhost:8200/jtech/sessions/';
    private allSessions: Observable<Session[]> = null;
    constructor(private userService: UserService,
                private http: HttpClient) { }

    /**
     * @param id of the user
     * @return all sessions of this user
     */
    public getSessionsById(id: string): Observable<Session[]> {
            this.allSessions = this.http.get<Session[]>(`${this.url}${id}`);
            return this.allSessions;
    }

    /**
     * @param id of the session
     * @return session of this id
     */
    public getCurrentSession(id: string): Observable<Session> {
        console.log(this.allSessions);
        return this.allSessions.pipe(take(1), map((sessions: Session[]) => {
            return sessions.find((session: Session) => {
                // tslint:disable-next-line:triple-equals
                return session.id == id;
            });
        }));
    }

    /**
     * this method activate the user on the given session
     * @param sessionId of current session
     * @param userId of the current user
     */
    public activateUserOnSession(sessionId: string, userId: string, ) {
        // http://localhost:8200/jtech/sessions/1/user/1/active/true
        const url = `${this.url}${sessionId}/user/${userId}/active/true`;
        console.log(`${url} at session.service line 49`);
        this.http.get(url).subscribe();
    }

    /**
     * deactivate the user on the given session
     * @param sessionId of session
     * @param userId of user
     */
    public deactivateUserOnSession(sessionId: string, userId: string) {
        const url = `${this.url}${sessionId}/user/${userId}/active/false`;
        console.log(`${url} at session.service line 49`);
        this.http.get(url).subscribe();
    }
}
