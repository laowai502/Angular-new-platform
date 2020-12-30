import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    },
    {
        path: 'responsive',
        loadChildren: () => import('./responsive/responsive.module').then(m => m.ResponsiveModule)
    },
    {
        path: 'gojs',
        loadChildren: () => import('./go-js/go-js.module').then(m => m.GoJsModule)
    },
    {
        path: 'comp-connect',
        loadChildren: () => import('./comp-connect/comp-connect.module').then(m => m.CompConnectModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    // imports: [RouterModule.forRoot(routes, {
    //     preloadingStrategy: PreloadAllModules
    // })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
