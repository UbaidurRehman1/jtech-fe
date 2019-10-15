import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatboxPage } from './chatbox.page';
import { ChatboxRoutingModule } from './chatbox-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChatboxRoutingModule
    ],
    declarations: [ChatboxPage]
})
export class ChatboxPageModule {}
