import { Component, OnInit } from '@angular/core';
import {SessionService} from '../../service/session/session.service';
import {Session} from '../../model/session/session';

@Component({
    selector: 'app-chatbox',
    templateUrl: './chatbox.page.html',
    styleUrls: ['./chatbox.page.scss'],
})
export class ChatboxPage implements OnInit {
    ngOnInit(): void {
    }
}
