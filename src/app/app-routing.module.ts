import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'chatbox', pathMatch: 'full' },
    { path: 'chatbox', loadChildren: () => import('./views/chatbox/chatbox.module').then(m => m.ChatboxPageModule) },
    { path: 'auth', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthPageModule) },
    { path: 'detail', loadChildren: () => import('./views/detail/detail.module').then(m => m.DetailPageModule)},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
