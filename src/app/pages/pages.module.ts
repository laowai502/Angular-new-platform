import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule, Components } from './pages-routing.module';
import { ChildsComponent } from './component/component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// External plugins
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

import { BusyModule } from '../directive/angular-busy/busy.module';
import { BusyConfig } from '../directive/angular-busy/busy.config';

import { MarkdownModule } from 'ngx-markdown';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
    declarations: [
        ...Components,
        ...ChildsComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        PagesRoutingModule,
        HttpClientModule,
        PanelMenuModule,
        ButtonModule,
        BusyModule.forRoot(
            new BusyConfig({
                minDuration: 600
            })
        ),
        MarkdownModule.forRoot({
            loader: HttpClient // optional, only if you use [src] attribute
        }),
        NgxEchartsModule
    ]
})
export class PagesModule {}
