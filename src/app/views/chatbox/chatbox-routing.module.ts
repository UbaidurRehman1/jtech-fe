import {RouterModule, Routes} from '@angular/router';
import {ChatboxPage} from './chatbox.page';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {path: '', redirectTo: '/views/chatbox/tabs/sessions', pathMatch: 'full'},
    {path: 'tabs',
    component: ChatboxPage,
    children: [
        {path: '', redirectTo: '/views/chatbox/tabs/sessions', pathMatch: 'full'},
        {path: 'sessions',
        children: [
            {path: '', loadChildren: './sessions/sessions.module/#SessionPageModule'},
            {path: ':sessionId', loadChildren: './sessions/conversation/conversation.module#ConversationPageModule'}
        ]},
        {path: '', redirectTo: '/views/chatbox/tabs/all'},
        {path: 'all', loadChildren: './discover/discover.module#DiscoverPageModule'}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChatboxRoutingModule {}
