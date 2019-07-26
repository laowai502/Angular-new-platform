import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { PagesComponent } from './pages.component';
import { DisplayComponent } from './display/display.component';
import { AboutOne } from './about/about_one/about_one';
import { About_One_Child } from './about/about_one/about_one_one/about_one_one';

export const Components = [
    HomeComponent,
    NewsComponent,
    AboutComponent,
    PagesComponent,
    DisplayComponent,
    AboutOne,
    About_One_Child
];

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
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
