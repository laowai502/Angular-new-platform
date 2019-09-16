import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule, Components } from './pages-routing.module';
import { ChildsComponent } from './component/component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// External plugins
import { MarkdownModule } from 'ngx-markdown';
import { PanelMenuModule } from 'primeng/panelmenu';

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
        MarkdownModule.forRoot({
            loader: HttpClient // optional, only if you use [src] attribute
        })
    ]
})
export class PagesModule {}
