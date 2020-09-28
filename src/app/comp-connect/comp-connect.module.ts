import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CompConnectService } from './comp-connect.service';

import { CompConnectRoutingModule} from './comp-connect-routing.module';

import { FatherComponent } from './father/father.component';
import { Child1Component } from './father/child1/child1.component';
import { Child2Component } from './father/child2/child2.component';
import { Child3Component } from './father/child3/child3.component';

@NgModule({
    declarations: [FatherComponent, Child1Component, Child2Component, Child3Component],
    imports: [
        CommonModule,
        FormsModule,
        CompConnectRoutingModule
    ],
    providers: [CompConnectService]
})
export class CompConnectModule { }
