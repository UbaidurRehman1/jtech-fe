import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Session} from '../../../model/session/session';
import {SessionService} from '../../../service/session/session.service';
import {AuthService} from '../../../service/auth/auth.service';
import {NotificationService} from '../../../service/notification/notification.service';
import {User} from '../../../model/user/user';
import {UserService} from '../../../service/user/user.service';
import {fakeAsync} from '@angular/core/testing';
import {Router} from '@angular/router';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    private isLoading = true;
    // tslint:disable-next-line:variable-name
    private _users: Observable<User[]> = null;
    constructor(private sessionService: SessionService,
                private authService: AuthService,
                private userService: UserService,
                private router: Router) { }
    ngOnInit() {
    }
    public ionViewWillEnter() {
        this.isLoading = true;
        this.userService.getAllUsers().subscribe((users: User[]) => {
            const filteredUsers: User[] = users.filter((user: User) => {
                // tslint:disable-next-line:triple-equals
                return user.id != this.user.id;
            });
            this._users = of(filteredUsers);
            this.isLoading = false;
        });
        // get all users
        // and put logic to not include this one
        // console.log(this.users);
    }
    get users(): Observable<User[]> {
        return this._users;
    }
    set users(value: Observable<User[]>) {
        this._users = value;
    }
    get user(): User {
        return this.authService.user;
    }

    ngOnDestroy(): void {
    }
    /**
     * @param id of the another user, if this session of this id is present then
     *  redirect to the session page, otherwise create new session and then redirect
     */
    public redirectToSession(id: string): void {
        this.sessionService.allSessions.subscribe((sessions: Session[]) => {
            sessions.forEach((session: Session) => {
                console.log(`session id ${session.id} another user id ${id} sender id ${this.user.id}`);
                // first let check if a session contain the id of sender
                // tslint:disable-next-line:triple-equals
                if (session.receiverId == this.user.id) {
                    // tslint:disable-next-line:triple-equals
                    if (session.senderId == id) {
                        // redirect
                        this.router.navigate(['conversation', session.id]).then();
                    }
                    // tslint:disable-next-line:triple-equals
                } else if (session.senderId == this.user.id) {
                    // tslint:disable-next-line:triple-equals
                    if (session.receiverId == id) {
                        // redirect to session id
                        this.router.navigate(['conversation', session.id]).then();
                    }
                }
            });
            console.log('We have to create new session');
        });
    }
}
