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
    private currentUser: User = null;
    // tslint:disable-next-line:variable-name
    private _isAuth = false;
    constructor(private userService: UserService) {
    }
   get user(): User {
        return  this.currentUser;
    }
    set user(value: User) {
        this.currentUser = value;
    }
    public isAuth(): boolean {
        return this.user != null;
    }
    public logout(): void {
        this.user = null;
    }
}
