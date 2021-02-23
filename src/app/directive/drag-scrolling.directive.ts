import { Directive, HostListener, ElementRef } from '@angular/core';

import { throttle } from 'lodash';

@Directive({
    selector: '[WorkareaDragScrolling]'
})
export class WorkareaDragScrolDirective {

    // 记录Y轴滚动距离
    private scrollTop = 0;
    // 记录X轴滚动距离
    private scrollLeft = 0;
    // 记录鼠标落点X坐标
    private startX = 0;
    // 记录鼠标落点Y坐标
    private startY = 0;
    // 开关标识
    private swtich = false;

    constructor(private el: ElementRef) {}

    @HostListener('mousedown', ['$event']) private mouseDown(e) {
        if (e.button === 2) {
            this.swtich = true;
            const { nativeElement: dom } = this.el;
            dom.style.cursor = 'move';
            this.startX = e.clientX;
            this.startY = e.clientY;
            dom.onmousemove = throttle(this.moving.bind(this), 20);
        }
    }

    @HostListener('mouseup', ['$event']) private mouseUp(e) {
        if (e.button === 2) {
            this.swtich = false;
            this.dealMouseUp();
            e.stopPropagation(); // 防止再触发document:mouseup
        }
    }

    // 这种情况是处理鼠标脱离当前范围松开
    @HostListener('document:mouseup', ['$event']) private domMouseUp(e) {
        if (e.button === 2 && this.swtich) {
            this.swtich = false;
            this.dealMouseUp();
        }
    }

    @HostListener('contextmenu', ['$event']) private contextMenu(e: Event) {
        e.preventDefault();
    }

    dealMouseUp() {
        const { nativeElement: dom } = this.el;
        this.scrollTop = dom.scrollTop;
        this.scrollLeft = dom.scrollLeft;
        dom.style.cursor = 'default';
        dom.onmousemove = null;
    }

    moving(e) {
        const { nativeElement: dom } = this.el;
        const rateX = dom.scrollWidth/dom.offsetWidth;
        const rateY = dom.scrollHeight/dom.offsetHeight;
        const moveX = (e.clientX - this.startX) * rateX;
        const moveY = (e.clientY - this.startY) * rateY;
        dom.scrollLeft = this.scrollLeft + moveX;
        dom.scrollTop = this.scrollTop + moveY;
    }

}
