import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
// import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.html',
    styleUrls: ['./menu.scss']
})
export class Menu implements OnInit, OnDestroy {

    public items: MenuItem[];

    // destroyRouter: any;

    constructor(
        // private routeParams: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        // this.destroyRouter = this.router.events.pipe(
        //     filter(event => event instanceof NavigationStart)
        // ).subscribe((event: NavigationStart) => {
        //     console.log(event);
        // });
        this.items = [
            {
                label: 'Angular',
                items: [
                    { // 测试多重带参子路由
                        label: 'child-route-params',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/about']);
                        }
                    },
                    // { // angular8 different loading
                    //     label: 'Different Loading',
                    //     icon: 'pi pi-star-o',
                    //     command: () => {
                    //         this.router.navigate(['/pages/angular/diff-loading']);
                    //     }
                    // },
                    { // dom operate in angular
                        label: 'Dom',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/angular/dom']);
                        }
                    },
                    { // dom operate in angular
                        label: 'Style-syntax',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/angular/style-syntax']);
                        }
                    }
                ]
            },
            {
                label: 'Plugin',
                items: [
                    {
                        label: 'Ngx-echarts-test',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/plugin/ngx-echarts']);
                        }
                    },
                    {
                        label: 'Angular-busy',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/plugin/angular-busy']);
                        }
                    }
                ]
            },
            {
                label: 'RxJS',
                items: [
                    { label: 'New', icon: 'pi pi-plus' },
                    { label: 'Open', icon: 'pi pi-download' }
                ]
            },
            {
                label: 'Es6',
                items: [
                    {
                        label: 'ArrayBuffer',
                        icon: 'pi pi-inbox',
                        command: () => {
                            // this.router.navigate(['/pages/es6/array-buffer']);
                        }
                    }
                ]
            }
        ];
    }

    ngOnDestroy() {
        // this.destroyRouter.unsubscribe();
    }
}
