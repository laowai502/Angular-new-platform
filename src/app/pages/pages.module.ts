import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule, Components } from './pages-routing.module';
import { ChildsComponent } from './component/component';

import { ROTooltipModule } from '../components/ro-toolTip/tooltip.module';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
    declarations: [
        ...Components,
        ...ChildsComponent
    ],
    imports: [
        FormsModule,
        PagesRoutingModule,
        ROTooltipModule.forRoot(),
        // TooltipModule.forRoot()
    ]
})
export class PagesModule {}
