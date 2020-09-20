import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsiveComponent } from './responsive.component';
import { ResTableComponent } from './component/table.component';
import { TimelineComponent } from './component/timeline.component';


export const Components = [
    ResponsiveComponent,
    ResTableComponent,
    TimelineComponent
];

const routes: Routes = [
    {
        path: '',
        component: ResponsiveComponent
    },
    {
        path: '**',
        component: ResponsiveComponent
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
export class ResponsiveRoutingModule {}
