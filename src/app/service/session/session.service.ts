import { Injectable } from '@angular/core';
import {Session} from '../../model/session/session';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {User} from '../../model/user/user';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    // total mock up
    // name, image
    private sessionsTemp: Session[] = [
        new Session('1', '1', '2', new Date(), null, null),
        new Session('2', '2', '3', new Date(), null, null)
    ];
    // tslint:disable-next-line:variable-name
    private _sessions: BehaviorSubject<Session[]> = new BehaviorSubject<Session[]>(this.sessionsTemp);

    constructor(private userService: UserService) { }

    get sessions(): Observable<Session[]> {
        return this._sessions.pipe(take(1), tap((sessions: Session[]) => {
            sessions.forEach((session: Session) => {
                this.userService.getUser(session.receiverId).subscribe((user: User) => {
                    session.receiver = user;
                });
            });
        }));
    }
    public getSession(id: string): Observable<Session> {
        return this.sessions.pipe(take(1), map((sessions: Session[]) => {
            return sessions.filter((session: Session) => {
                return session.id === id;
            });
        }), map((session: Session[]) => session[0]));
    }

}
