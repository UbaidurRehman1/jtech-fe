import {Injectable} from '@angular/core';
import {AuthUser, User} from '../../model/user/user';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map, take, tap} from 'rxjs/operators';

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
    // TODO convert it into array
    // TODO and update it after 5 minutes
    public populateUsers(): void {
        this.http.get<User[]>(this.url).subscribe((users: User[]) => {
            this.allUsers = of(users);
        });
    }

    /**
     * @param id of the user
     * @return the user of give id
     */
    public getUserById(id: string): Observable<User> {
        return this.allUsers.pipe(take(1), map((users: User[]) => {
            // tslint:disable-next-line:triple-equals
            return users.find((user: User) => user.id == id);
        }));
    }
    public authUser(user: AuthUser): Observable<User> {
        return this.http.post<User>(`${this.url}auth`, user);
    }
    public createUser(user: AuthUser): Observable<User> {
        return this.http.post<User>(`${this.url}`, user).pipe(tap(() => {
            this.populateUsers();
        }));
    }
    public getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}`);
    }
}
