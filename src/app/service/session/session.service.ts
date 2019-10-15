import { Injectable } from '@angular/core';
import {Session} from '../../model/session/session';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    // total mock up
    // name, image
    private sessionsTemp: Session[] = [
        new Session('1', 'Kashif Nazir Khan',
            'https://res.cloudinary.com/student1234567/image/upload/v1571141876/demo/IMG_20190524_230103.jpg'),
        new Session('2', 'Muhammad Ahsan Farooq',
            'https://res.cloudinary.com/student1234567/image/upload/v1571141876/demo/IMG_20190524_225912.jpg')
    ];
    // tslint:disable-next-line:variable-name
    private _sessions: BehaviorSubject<Session[]> = new BehaviorSubject<Session[]>(this.sessionsTemp);

    constructor() { }

    get sessions(): Observable<Session[]> {
        return this._sessions.asObservable();
    }
}
