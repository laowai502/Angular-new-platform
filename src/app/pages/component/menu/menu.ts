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
                    {
                        label: 'Angular-Rxjs',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/angular/angular-busy']);
                        }
                    },
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
                        label: 'Highcharts-angular',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/plugin/highcharts-angular']);
                        }
                    },
                    {
                        label: 'Ng-markdown',
                        icon: 'pi pi-star-o',
                        command: () => {
                            this.router.navigate(['/pages/home']);
                        }
                    }
                ]
            },
            {
                label: 'Responsive Page',
                command: () => {
                    this.router.navigate(['/responsive']);
                }
            },
            {
                label: 'Component connect',
                command: () => {
                    this.router.navigate(['/comp-connect']);
                }
            },
            {
                label: 'Life circle',
                command: () => {
                    this.router.navigate(['/life-circle']);
                }
            }
        ];
    }

    ngOnDestroy() {
        // this.destroyRouter.unsubscribe();
    }
}
