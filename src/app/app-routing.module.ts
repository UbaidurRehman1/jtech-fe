import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './guards/auth/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'chatbox', pathMatch: 'full', canLoad: [AuthGuard] },
    { path: 'chatbox', loadChildren: () => import('./views/chatbox/chatbox.module').then(m => m.ChatboxPageModule), canLoad: [AuthGuard] },
    { path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthPageModule) },
    { path: 'detail', loadChildren: () => import('./views/detail/detail.module').then(m => m.DetailPageModule), canLoad: [AuthGuard]},
    { path: 'conversation/:sessionId',
        loadChildren: () => import('./views/conversation/conversation.module').then(m => m.ConversationPageModule), canLoad: [AuthGuard]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
