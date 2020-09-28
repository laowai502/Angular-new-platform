import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifeCircleComponent } from './life-circle.component';

const routes: Routes = [
    {
        path: '',
        component: LifeCircleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LifeCircleRoutingModule { }
