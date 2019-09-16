import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesRoutingModule, Components } from './pages-routing.module';
import { ChildsComponent } from './component/component';

import { HttpClient, HttpClientModule } from '@angular/common/http';

// External plugins
import { MarkdownModule } from 'ngx-markdown';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ArrayBufferComponent } from './main/es6/array-buffer/array-buffer.component';

@NgModule({
    declarations: [
        ...Components,
        ...ChildsComponent,
        ArrayBufferComponent
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
