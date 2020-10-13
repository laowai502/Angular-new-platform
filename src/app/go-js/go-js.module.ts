import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GojsAngularModule } from 'gojs-angular';

import { GoJsRoutingModule, Components } from './go-js-routing.module';
import { AppPaletteComponent } from './components/palette/palette.component';
import { OverviewComponent } from './components/overview/overview.component';

@NgModule({
    declarations: [Components, AppPaletteComponent, OverviewComponent],
    imports: [
        CommonModule,
        FormsModule,
        GojsAngularModule,
        GoJsRoutingModule
    ]
})
export class GoJsModule { }
