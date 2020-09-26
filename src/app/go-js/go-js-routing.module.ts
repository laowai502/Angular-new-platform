import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoJsComponent } from './go-js.component';

export const Components = [
    GoJsComponent
];

const routes: Routes = [
    {
        path: '',
        component: GoJsComponent
    },
    {
        path: '**',
        component: GoJsComponent
    },
    {
        path: '',
        redirectTo: '',
        pathMatch: null
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GoJsRoutingModule {}
