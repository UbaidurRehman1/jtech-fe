import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../../model/session/session';
import {User} from '../../../model/user/user';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
    selector: 'app-sliding-item',
    templateUrl: './sliding-item.component.html',
    styleUrls: ['./sliding-item.component.scss'],
})
export class SlidingItemComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    public _uri = '/conversation';
    @Input() session: Session = null;
    constructor(private authService: AuthService) { }
    ngOnInit() {
        // console.log(this.session);
    }
    get imageURL() {
        return (this.session.sender.id === this.authService.user.id) ? this.session.receiver.imageURL : this.session.sender.imageURL;
    }
    get name() {
        return (this.session.sender.id === this.authService.user.id) ? this.session.receiver.firstName : this.session.sender.firstName;
    }
    get uri() {
        return this._uri + '/' + this.session.id;
    }
}
