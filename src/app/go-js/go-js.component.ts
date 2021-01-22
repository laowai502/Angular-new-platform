import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import { GoJsService } from './go-js.service';

import * as go from 'gojs';
import * as _ from 'lodash';

import './config/figure';

@Component({
    selector: 'app-go-js',
    templateUrl: './go-js.component.html',
    styleUrls: ['./go-js.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoJsComponent implements OnInit, AfterViewInit {

    dia: any;
    pla: any;

    constructor(
        private el: ElementRef,
        private gjs: GoJsService
    ) { }

    @HostListener('window:resize', ['$event']) public onResize = _.throttle(this.dealResize, 50);

    ngOnInit() {
        this.dealResize();
    }

    ngAfterViewInit() {}

    dealResize() {
        const { children: ele } = this.el.nativeElement;
        this.gjs.setMainSize(ele[0].clientWidth, ele[0].clientHeight);
    }

}
