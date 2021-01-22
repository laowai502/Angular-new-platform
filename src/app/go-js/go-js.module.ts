import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { GoJsRoutingModule, Components } from './go-js-routing.module';
import { AppPaletteComponent } from './components/palette/palette.component';
import { AppPaletteBMPNComponent } from './components/palette/paletteBMPN.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FlowMenuBar } from './components/menu/menu';
import { FlowToolBar } from './components/toolbar/toolbar';
import { RulerComponent } from './components/ruler/ruler';
import { WorkareaComponent } from './components/workarea/workarea';

import { GoJsService } from './go-js.service';

// plugins
import { GojsAngularModule } from 'gojs-angular';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
    declarations: [
        Components,
        AppPaletteComponent,
        AppPaletteBMPNComponent,
        OverviewComponent,
        FlowMenuBar,
        FlowToolBar,
        RulerComponent,
        WorkareaComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GoJsRoutingModule,
        GojsAngularModule,
        AccordionModule,
        TabViewModule
    ],
    providers: [
        GoJsService
    ]
})
export class GoJsModule { }
