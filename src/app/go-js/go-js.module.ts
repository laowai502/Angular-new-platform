import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectiveModule } from '../directive/directive.module';

import { GoJsRoutingModule, Components } from './go-js-routing.module';

import { AppPaletteComponent } from './components/palette/palette.component';
import { AppPaletteBMPNComponent } from './components/palette/paletteBMPN.component';
import { OverviewComponent } from './components/overview/overview.component';
import { FlowMenuBar } from './components/menu/menu';
import { FlowToolBar } from './components/toolbar/toolbar';
import { RulerComponent } from './components/ruler/ruler';
import { WorkareaComponent } from './components/workarea/workarea';
import { BmpnWorkareaComponent } from './components/workarea/bmpn';
import { DiagramAttrComponent } from './components/attr/attr.component';

import { GoJsService } from './go-js.service';

// plugins
import { GojsAngularModule } from 'gojs-angular';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
    declarations: [
        Components,
        AppPaletteComponent,
        AppPaletteBMPNComponent,
        OverviewComponent,
        FlowMenuBar,
        FlowToolBar,
        RulerComponent,
        WorkareaComponent,
        BmpnWorkareaComponent,
        DiagramAttrComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule,
        GoJsRoutingModule,
        GojsAngularModule,
        AccordionModule,
        TabViewModule,
        PanelModule,
        ButtonModule,
        DialogModule,
        DropdownModule
    ],
    providers: [
        GoJsService
    ]
})
export class GoJsModule { }
