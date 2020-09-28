import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FatherComponent } from './father/father.component';


const routes: Routes = [
    {
        path: 't-father',
        component: FatherComponent
    },
    {
        path: '',
        redirectTo: 't-father',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompConnectRoutingModule { }
