import { Injectable } from '@angular/core';
import {User} from '../../model/user/user';
import {UserService} from '../user/user.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // tslint:disable-next-line:variable-name
    private _userId = '1';
    constructor(private userService: UserService) {
    }
    public getUser(): Observable<User> {
        return this.userService.getUser('1').pipe(take(1), map((user: User) => {
            return user;
        }));
    }
    get userId(): string {
        return this._userId;
    }
}
