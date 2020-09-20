import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ResponsiveRoutingModule, Components } from './responsive-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { CalendarModule } from 'primeng/calendar';

import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
    declarations: [
        ...Components
    ],
    imports: [
        FormsModule,
        CommonModule,
        ResponsiveRoutingModule,
        HttpClientModule,
        NgxEchartsModule,
        CalendarModule
    ]
})
export class ResponsiveModule {}
