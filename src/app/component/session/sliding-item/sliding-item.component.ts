import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../../../model/session/session';
import {User} from '../../../model/user/user';

@Component({
    selector: 'app-sliding-item',
    templateUrl: './sliding-item.component.html',
    styleUrls: ['./sliding-item.component.scss'],
})
export class SlidingItemComponent implements OnInit {
    // tslint:disable-next-line:variable-name
    public _uri = '/conversation';
    @Input() session: Session = null;
    constructor() { }
    ngOnInit() {
    }
    get uri() {
        return this._uri + '/' + this.session.id;
    }
}
