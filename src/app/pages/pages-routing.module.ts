import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main/home/home.component';
import { NewsComponent } from './main/news/news.component';
import { AboutComponent } from './main/about/about.component';
import { PagesComponent } from './pages.component';
import { DisplayComponent } from './main/display/display.component';
import { AboutOne } from './main/about/about_one/about_one';
import { About_One_Child } from './main/about/about_one/about_one_one/about_one_one';

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
