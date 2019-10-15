import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'chatbox', loadChildren: './views/chatbox/chatbox.module#ChatboxPageModule' },
  { path: 'sessions', loadChildren: './views/chatbox/sessions/sessions.module#SessionsPageModule' },
  { path: 'conversation', loadChildren: './views/chatbox/sessions/conversation/conversation.module#ConversationPageModule' },
  { path: 'discover', loadChildren: './views/chatbox/discover/discover.module#DiscoverPageModule' },
  { path: 'detail', loadChildren: './views/chatbox/detail/detail.module#DetailPageModule' },
  { path: 'auth', loadChildren: './views/auth/auth.module#AuthPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
