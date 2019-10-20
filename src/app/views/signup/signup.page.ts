import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthUser, User} from '../../model/user/user';
import {FormData} from '../auth/auth.page';
import {UserService} from '../../service/user/user.service';

export interface FormData {
    email: string;
    password: string;
}
@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    form: FormGroup;
    constructor(private userService: UserService) { }

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

    public signup(): void {
        console.log('Signup');
        const data: FormData = this.form.value;
        const user: AuthUser  = new AuthUser(data.email, data.password);
        this.userService.createUser(user).subscribe((newlyCreatedUser: User) => {
           console.log(`user created: ${newlyCreatedUser}`);
        }, (error) => {
            console.log(error);
        });
    }

}
