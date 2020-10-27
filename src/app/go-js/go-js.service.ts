import { Injectable } from '@angular/core';

@Injectable()
export class GoJsService {

    public mainWidth: number;
    public mainHeight: number;

    public headerWidth: number;
    public headerHeight: number;

    constructor() { }

    public setMainSize(w: number = 0, h: number = 0): void {
        this.mainWidth = w;
        this.mainHeight = h;
    }

    public setHeaderSize(w: number = 0, h: number = 0): void {
        this.headerWidth = w;
        this.headerHeight = h;
    }

}
