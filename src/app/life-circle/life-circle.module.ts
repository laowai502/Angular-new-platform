import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LifeCircleRoutingModule } from './life-circle-routing.module';
import { LifeCircleComponent } from './life-circle.component';
import { LChildComponent } from './l-child/l-child.component';


@NgModule({
    declarations: [LifeCircleComponent, LChildComponent],
    imports: [
        CommonModule,
        LifeCircleRoutingModule,
        FormsModule
    ]
})
export class LifeCircleModule { }
