import { Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, ElementRef } from '@angular/core';

import { fromEvent, timer } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

// import * as _ from 'lodash';

import { SHAPES } from '../../config/shape';
import { GoJsService } from '../../go-js.service';

@Component({
    selector: 'app-flow-tool-bar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowToolBar implements OnInit, AfterViewInit {

    @ViewChild('top', { static: true }) top: ElementRef;
    @ViewChild('search', { static: false }) search: ElementRef;

    keyword: string;

    shapes: Array<any>;

    get bH(): number {
        const { mainHeight: mH, headerHeight: hH } = this.gjs;
        const { nativeElement: ele } = this.top;
        return mH - hH - ele.clientHeight;
    }

    get barWH(): number {
        return this.gjs.toolbarWh;
    }

    set barWH(val: number) {
        this.gjs.toolbarWh = val;
    }

    constructor(private gjs: GoJsService) {
        this.shapes = SHAPES;
        this.shapes.forEach((obj: any, i: number) => {
            obj.selected = i < 2;
        });
    }

    ngOnInit() {
        this.barWH = 226;
        this.keyword = '';
    }

    ngAfterViewInit() {
        const input = this.search.nativeElement;
        fromEvent(input, 'keyup')
            // tslint:disable-next-line:no-string-literal
            .pipe(map(i => i['currentTarget'].value))
            .pipe(debounceTime(500))
            .subscribe(val => {
                this.gjs.palNodeSearch.emit(val);
            });
    }

    expand(flag: boolean) {
        this.shapes.forEach((obj: any) => {
            obj.selected = flag;
        });
    }


    toggleBar() {
        this.barWH = this.barWH === 226 ? 0 : 226;
    }


}
