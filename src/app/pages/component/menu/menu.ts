import { Component, OnInit, OnDestroy } from '@angular/core';

// import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.html',
    styleUrls: ['./menu.scss']
})
export class Menu implements OnInit, OnDestroy {

    // destroyRouter: any;

    constructor(
        // private routeParams: ActivatedRoute,
        // private router: Router
    ) {}

    ngOnInit() {
        // this.destroyRouter = this.router.events.pipe(
        //     filter(event => event instanceof NavigationStart)
        // ).subscribe((event: NavigationStart) => {
        //     console.log(event);
        // });
    }

    ngOnDestroy() {
        // this.destroyRouter.unsubscribe();
    }
}
