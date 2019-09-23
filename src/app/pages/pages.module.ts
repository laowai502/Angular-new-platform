import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule, Components } from './pages-routing.module';
import { ChildsComponent } from './component/component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// External plugins
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';

import { MarkdownModule } from 'ngx-markdown';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
    declarations: [
        ...Components,
        ...ChildsComponent
    ],
    imports: [
        FormsModule,
        PagesRoutingModule,
        HttpClientModule,
        PanelMenuModule,
        ButtonModule,
        MarkdownModule.forRoot({
            loader: HttpClient // optional, only if you use [src] attribute
        }),
        NgxEchartsModule
    ]
})
export class PagesModule {}
