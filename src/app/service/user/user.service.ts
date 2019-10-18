import {Injectable} from '@angular/core';
import {User} from '../../model/user/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = 'http://localhost:8200/jtech/users/';
    private usersTemp: User[] = [
        new User('1', 'Ubaid ur Rehman', 'https://res.cloudinary.com/student1234567/image/upload/v1571164297/IMG_20190505_163303_967.jpg'),
        new User('2', 'Kashif Nazir Khan',
            'https://res.cloudinary.com/student1234567/image/upload/v1571141876/demo/IMG_20190524_230103.jpg'),
        new User('3', 'Ahsan Farooq', 'https://res.cloudinary.com/student1234567/image/upload/v1571141876/demo/IMG_20190524_225912.jpg'),
    ];
    // tslint:disable-next-line:variable-name
    private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(this.usersTemp);
    constructor(private http: HttpClient) { }
    get users(): Observable<User[]> {
        return this._users.asObservable();
    }
    public getUserByEmail(email: string): Observable<User> {
        // return this.users.pipe(take(1), map((users: User[]) => {
        //     return users.filter((user: User) => id === user.id);
        // }), map((users: User[]) => users[0]));
        return this.http.get<User>(this.url + `by/email/${email}`);
    }
}
