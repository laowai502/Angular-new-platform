import { Directive, OnInit, HostListener, ElementRef } from '@angular/core';

import { throttle } from 'lodash';

@Directive({
    selector: '[myDragScrolling]'
})
export class DragScrollingDirective {

    // 记录Y轴滚动距离
    private scrollTop = 0;
    // 记录X轴滚动距离
    private scrollLeft = 0;
    // 记录鼠标落点X坐标
    private startX = 0;
    // 记录鼠标落点Y坐标
    private startY = 0;
    // 横向可移动的最大距离
    private limitX: number;
    // 纵向可移动的最大距离
    private limitY: number;

    constructor(private el: ElementRef) {}

    @HostListener('mousedown', ['$event']) private mouseDown(e) {
        if (e.button === 2) {
            const { nativeElement: dom } = this.el;
            dom.style.cursor = 'move';
            this.startX = e.offsetX;
            this.startY = e.clientY;
            this.limitX = (dom.scrollWidth - dom.offsetWidth) * 2;
            this.limitY = (dom.scrollHeight - dom.offsetHeight) * 2;

            dom.onmousemove = throttle(this.moving.bind(this), 20);
            // dom.onmousemove = this.moving.bind(this);
        }
    }

    @HostListener('mouseup', ['$event']) private mouseUp(e) {
        if (e.button === 2) {
            const { nativeElement: dom } = this.el;
            this.scrollTop = dom.scrollTop;
            dom.style.cursor = 'default';
            dom.onmousemove = null;
        }
    }

    @HostListener('contextmenu', ['$event']) private contextMenu(e: Event) {
        e.preventDefault();
    }

    moving(e) {
        let offsetY = (e.clientY - this.startY) * 4;
        console.log(offsetY);
        const { nativeElement: dom } = this.el;
        console.log(this.scrollTop);
        dom.scrollTop = this.scrollTop + offsetY;
    }

    moving1(e) {
        let offsetX = this.startX - e.offsetX;
        let offsetY = this.startY - e.offsetY;
        // PS: 需要注意的是当鼠标向上移动时, 滚动条应该向下移动, 所以这里都是减去的移动距离
        this.scrollTop -= offsetY;
        this.scrollLeft -= offsetX;
        console.log(1);
        // TODO
        // if (this.scrollTop >= this.limitY) {
        //     // 当滑块移动到底端时
        //     this.scrollTop = this.limitY;
        // } else if (this.scrollTop <= 0) {
        //     // 当滑块移动到顶端时
        //     this.scrollTop = 0;
        // }
        // if (this.scrollLeft >= this.limitX) {
        //     // 当滑块移动到左侧时
        //     this.scrollLeft = this.limitX;
        // } else if (this.scrollLeft <= 0) {
        //     // 当滑块移动到右侧时
        //     this.scrollLeft = 0;
        // }
        // 将计算后的距离赋值给滚动条
        const { nativeElement: dom } = this.el;
        dom.scrollTop = this.scrollTop;
        // dom.scrollLeft = this.scrollLeft;
    }

}
