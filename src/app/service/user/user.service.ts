import {Injectable} from '@angular/core';
import {User} from '../../model/user/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:8200/jtech/users/';
    private allUsers: Observable<User[]> = null;
    constructor(private http: HttpClient) { }
    public getUserByEmail(email: string): Observable<User> {
        return this.http.get<User>(this.url + `by/email/${email}`);
    }
    public populateUsers(): void {
        this.allUsers = this.http.get<User[]>(this.url);
    }
}
