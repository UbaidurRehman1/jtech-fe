import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionService} from '../../service/session/session.service';
import {Session} from '../../model/session/session';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.page.html',
    styleUrls: ['./chatbox.page.scss'],
})
export class ChatboxPage implements OnInit {
    ngOnInit(): void {
    }
}
