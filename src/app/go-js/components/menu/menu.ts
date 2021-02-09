import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

import { GoJsService } from '../../go-js.service';

@Component({
    selector: 'app-flow-menu-bar',
    templateUrl: './menu.html',
    styleUrls: ['./menu.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowMenuBar implements OnInit {

    private isExtend: boolean;

    @Output() extendEvent = new EventEmitter<any>();

    constructor(
        private el: ElementRef,
        private gjs: GoJsService
    ) {
        this.isExtend = false;
    }

    ngOnInit() {
        const { children: ele } = this.el.nativeElement;
        this.gjs.setHeaderSize(ele[0].clientWidth, ele[0].clientHeight);
    }

    expand() {
        this.isExtend = !this.isExtend;
        this.extendEvent.emit(this.isExtend);
    }

    fullScreen() {

    }

}
