import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule, Components } from './pages-routing.module';
import { ChildsComponent } from './component/component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// My
import { DirectiveModule } from '../directive/directive.module';

// External plugins
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { MarkdownModule } from 'ngx-markdown';
import { NgxEchartsModule } from 'ngx-echarts';

import { HighchartsChartModule } from 'highcharts-angular';


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
        DirectiveModule,

        PanelMenuModule,
        MessageModule,
        MessagesModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        PanelModule,
        ButtonModule,
        MarkdownModule.forRoot({
            loader: HttpClient // optional, only if you use [src] attribute
        }),
        NgxEchartsModule,
        HighchartsChartModule
    ]
})
export class PagesModule {}
