import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, ElementRef } from '@angular/core';

import { GoJsService } from '../../go-js.service';

@Component({
    selector: 'app-flow-menu-bar',
    templateUrl: './menu.html',
    styleUrls: ['./menu.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowMenuBar implements OnInit {

    constructor(
        private el: ElementRef,
        private gjs: GoJsService
    ) {}

    ngOnInit() {
        const { children: ele } = this.el.nativeElement;
        this.gjs.setHeaderSize(ele[0].clientWidth, ele[0].clientHeight);
    }

    expand() {

    }

    fullScreen() {

    }

}
