import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { filter, windowWhen } from 'rxjs/operators';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy, AfterViewInit {

    data: any = 'string';
    myDestory: any;

    public testTemplete: string;

    isShow = 'show';

    constructor(
        private router: Router
    ) {
        this.myDestory = router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe((event: NavigationEnd) => {
            this.isShow = event.url.indexOf('about_one') !== -1 ? 'hidden' : 'show';
        });
    }

    ngOnInit() {
        this.testTemplete = 'No build';
    }

    ngOnDestroy() {
        this.myDestory.unsubscribe();
    }

    ngAfterViewInit() {}

    toChild() {
        this.router.navigate(['/pages/about/about_one', '1']);
    }

    toLogin() {
        this.router.navigate(['/login']);
    }

    nativeHref() {
        const newState = {
            url: window.location.origin + '/login',
            title: document.title,
            state: 'login'
        };
        window.history.pushState(newState, '', '/login');
    }

}
