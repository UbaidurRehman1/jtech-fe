import { Injectable } from '@angular/core';
import {User} from '../../model/user/user';
import {UserService} from '../user/user.service';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url = 'http://localhost:8200/jtech/';
    // tslint:disable-next-line:variable-name
    private _user: User = null;
    // tslint:disable-next-line:variable-name
    private _isAuth = false;
    constructor(private userService: UserService) {
    }
    public getUser(): Observable<User> {
        // return this.userService.getUser('1').pipe(take(1), map((user: User) => {
        //     return user;
        // }));
        return ;
    }
    get user(): User {
        return  this._user;
    }
    set user(value: User) {
        this._user = value;
    }
    public isAuth(): boolean {
        return this.user != null;
    }
    public logout(): void {
        this.user = null;
    }
}
