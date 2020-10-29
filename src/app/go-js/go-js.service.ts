import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GoJsService {

    /* uesd params to resize */
    // 整体宽高
    public mainWidth: number;
    public mainHeight: number;

    // menu宽高
    public headerWidth: number;
    public headerHeight: number;

    public shareTemplate: EventEmitter<any>;

    constructor() {
        this.shareTemplate = new EventEmitter();
    }

    public setMainSize(w: number = 0, h: number = 0): void {
        this.mainWidth = w;
        this.mainHeight = h;
    }

    public setHeaderSize(w: number = 0, h: number = 0): void {
        this.headerWidth = w;
        this.headerHeight = h;
    }

}
