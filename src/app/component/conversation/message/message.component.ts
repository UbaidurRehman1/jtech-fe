import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../model/conversation/messageModel';
import {AuthService} from '../../../service/auth/auth.service';
import {User} from '../../../model/user/user';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
    @Input() message: Message = null;
    constructor(private authService: AuthService) { }
    ngOnInit() {
        console.log(this.message);
    }
    public isOwnerMessage(): boolean {
        return this.message.ownerId === this.authService.user.id;
    }
}
