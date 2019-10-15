import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConversationPage } from './conversation.page';
import {MessageComponent} from '../../../../component/conversation/message/message.component';

const routes: Routes = [
    {
        path: '',
        component: ConversationPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [ConversationPage, MessageComponent]
})
export class ConversationPageModule {}
