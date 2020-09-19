import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './main/angular/about/about.component';
import { AboutOne } from './main/angular/about/about_one/about_one';
import { About_One_Child } from './main/angular/about/about_one/about_one_one/about_one_one';
import { CharOne } from './main/plugin/ngx-echarts/component/charOne';
import { CharTwo } from './main/plugin/ngx-echarts/component/charTwo';
import { DomComponent } from './main/angular/dom/dom.component';
import { DomChildComponent } from './main/angular/dom/domChild';
import { AngularBusyComponent } from './main/angular/angular-busy/angular-busy.component';
import { StyleSyntaxComponent } from './main/angular/style-syntax/styleSyntax.component';

import { HomeComponent } from './main/home/home.component';
import { NgxEchartsComponent } from './main/plugin/ngx-echarts/ngx-echarts.component';

import { PagesComponent } from './pages.component';


export const Components = [
    HomeComponent,
    AboutComponent,
    StyleSyntaxComponent,
    // angular-plugin
    NgxEchartsComponent,
    AngularBusyComponent,
    // router-outlet
    PagesComponent,
    // child
    AboutOne,
    About_One_Child,
    CharOne,
    CharTwo,
    DomComponent,
    DomChildComponent
];

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { // route param 相关
                path: 'about',
                component: AboutComponent,
                children: [
                    {
                        path: 'about_one/:id',
                        component: AboutOne,
                        children: [
                            {
                                path: 'about_one_one/:id',
                                component: About_One_Child
                            }
                        ]
                    }
                ]
            },
            { // rxjs page
                path: 'angular/angular-busy',
                component: AngularBusyComponent
            },
            {
                path: 'angular/dom',
                component: DomComponent
            },
            {
                path: 'angular/style-syntax',
                component: StyleSyntaxComponent
            },
            { // echarts
                path: 'plugin/ngx-echarts',
                component: NgxEchartsComponent
            },
            { // markdown
                path: 'home',
                component: HomeComponent
            },
            {
                path: '**',
                component: HomeComponent
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: null
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
