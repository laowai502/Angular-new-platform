import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, ElementRef } from '@angular/core';

import { SHAPES } from '../../config/shape';

import { GoJsService } from '../../go-js.service';

@Component({
    selector: 'app-flow-tool-bar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowToolBar implements OnInit {

    @ViewChild('top', { static: true }) top: ElementRef;

    keyword: string;

    shapes: Array<any>;

    get bH(): number {
        const { mainHeight: mH, headerHeight: hH } = this.gjs;
        const { nativeElement: ele } = this.top;
        return mH - hH - ele.clientHeight;
    }

    constructor(private gjs: GoJsService) {
        this.keyword = '';
        this.shapes = SHAPES;
        this.shapes.forEach((obj:any, i:number) => {
            obj.selected = i<2;
        })
    }

    ngOnInit() {}

    expand(flag: boolean) {
        this.shapes.forEach((obj:any) => {
            obj.selected = flag
        })
    }

    fullScreen() {

    }


}
