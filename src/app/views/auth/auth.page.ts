import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user/user';
import {AuthService} from '../../service/auth/auth.service';
import {Router} from '@angular/router';

export interface FormData {
    email: string;
    password: string;
}
@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
    public form: FormGroup;
    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router) { }

    ngOnInit() {
        this.userService.populateUsers();
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [Validators.required]
            })
        });
    }

    public login(): void {
        const data: FormData = this.form.value;
        this.userService.getUserByEmail(data.email).subscribe((user: User) => {
            this.authService.user = user;
            // console.log(user);
            this.router.navigate(['/']).then();
        }, (error) => {
            console.log(error);
        });
    }
}
