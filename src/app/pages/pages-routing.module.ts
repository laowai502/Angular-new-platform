import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { NewsComponent } from './main/news/news.component';
import { AboutComponent } from './main/angular/about/about.component';
import { DisplayComponent } from './main/display/display.component';

import { NgxEchartsComponent } from './main/plugin/ngx-echarts/ngx-echarts.component';
import { DiffLoadingComponent } from './main/angular/diff-loading/diff-loading.component';

import { PagesComponent } from './pages.component';

import { AboutOne } from './main/angular/about/about_one/about_one';
import { About_One_Child } from './main/angular/about/about_one/about_one_one/about_one_one';
import { CharOne } from './main/plugin/ngx-echarts/component/charOne';
import { CharTwo } from './main/plugin/ngx-echarts/component/charTwo';

export const Components = [
    HomeComponent,
    NewsComponent,
    AboutComponent,
    DisplayComponent,
    NgxEchartsComponent,
    DiffLoadingComponent,
    // router-outlet
    PagesComponent,
    // child
    AboutOne,
    About_One_Child,
    CharOne,
    CharTwo
];

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: 'angular/diff-loading',
                component: DiffLoadingComponent
            },
            {
                path: 'news',
                component: NewsComponent
            },
            {
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
            {
                path: 'plugin/ngx-echarts',
                component: NgxEchartsComponent
            },
            // {
            //     path: 'es6/array-buffer',
            //     component: ArrayBufferComponent
            // },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'display',
                component: DisplayComponent
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
