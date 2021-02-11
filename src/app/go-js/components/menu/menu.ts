import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { GoJsService } from '../../go-js.service';

@Component({
    selector: 'app-flow-menu-bar',
    templateUrl: './menu.html',
    styleUrls: ['./menu.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowMenuBar implements OnInit {

    private isFull: boolean;
    private isExtend: boolean;

    @Output() fullScreen = new EventEmitter<boolean>();
    @Output() extendEvent = new EventEmitter<boolean>();

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

    doFullScreen() {
        this.isFull = !this.isFull;
        this.fullScreen.emit(this.isFull);
    }

}
