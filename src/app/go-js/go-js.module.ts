import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { GoJsRoutingModule, Components } from './go-js-routing.module';
import { AppPaletteComponent } from './components/palette/palette.component';
import { OverviewComponent } from './components/overview/overview.component';
import { TestDiagramComponent } from './components/test-diagram/test-diagram.component';

import { FlowMenuBar } from './components/menu/menu';
import { FlowToolBar } from './components/toolbar/toolbar';

// plugins
import { GojsAngularModule } from 'gojs-angular';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    declarations: [
        Components,
        AppPaletteComponent,
        OverviewComponent,
        TestDiagramComponent,
        FlowMenuBar,
        FlowToolBar
    ],
    imports: [
        CommonModule,
        FormsModule,
        GoJsRoutingModule,
        GojsAngularModule,
        AccordionModule
    ]
})
export class GoJsModule { }
