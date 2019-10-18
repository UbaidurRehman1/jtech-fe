import { Component, OnInit } from '@angular/core';
import {Session} from '../../../model/session/session';
import {SessionService} from '../../../service/session/session.service';
import {AuthService} from '../../../service/auth/auth.service';
import {User} from '../../../model/user/user';
import {UserService} from '../../../service/user/user.service';
import {forEach} from '@angular-devkit/schematics';

@Component({
    selector: 'app-sessions',
    templateUrl: './sessions.page.html',
    styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {
    private isLoading = true;
    // tslint:disable-next-line:variable-name
    private _sessions: Session[] = null;
    // tslint:disable-next-line:variable-name
    private _sender: User = null;
    // tslint:disable-next-line:variable-name
    constructor(private sessionService: SessionService,
                private authService: AuthService,
                private userService: UserService) { }

    ngOnInit() {
        this.isLoading = true;
        this.sessionService.getSessionsById(this.authService.user.id).subscribe((sessions: Session[]) => {
            console.log(sessions);
            this.sessions = sessions;
            this.isLoading = false;
        });
        // this.sessionService.sessions.subscribe((sessions: Session[]) => {
        //     this.sessions = sessions;
        //     this.authService.getUser().subscribe((sender: User) => {
        //         this.sender = sender;
        //         this.isLoading = false;
        //     });
        // });
    }

    get sessions(): Session[] {
        return this._sessions;
    }
    set sessions(value: Session[]) {
        this._sessions = value;
    }
    get sender(): User {
        return this._sender;
    }

    set sender(value: User) {
        this._sender = value;
    }
}
