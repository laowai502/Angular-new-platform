import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { GojsAngularModule } from 'gojs-angular';

import { GoJsRoutingModule, Components } from './go-js-routing.module';

@NgModule({
    declarations: [Components],
    imports: [
        CommonModule,
        FormsModule,
        GojsAngularModule,
        GoJsRoutingModule
    ]
})
export class GoJsModule { }
