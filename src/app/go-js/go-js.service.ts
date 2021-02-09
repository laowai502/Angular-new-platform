import { Injectable, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { RequestService } from 'src/app/common/http/request.service';

@Injectable()
export class GoJsService extends RequestService {

    /* uesd params to resize */
    // 整体宽高
    public mainWidth: number;
    public mainHeight: number;

    // menu宽高
    public headerWidth: number;
    public headerHeight: number;

    public shareTemplate: EventEmitter<any>;
    public nodeDataSync: EventEmitter<any>;
    public panelSyncDiagram: EventEmitter<any>;

    constructor(http: HttpClient) {
        super(http);
        this.shareTemplate = new EventEmitter();
        this.nodeDataSync = new EventEmitter();
        this.panelSyncDiagram = new EventEmitter();
    }

    public setMainSize(w: number = 0, h: number = 0): void {
        this.mainWidth = w;
        this.mainHeight = h;
    }

    public setHeaderSize(w: number = 0, h: number = 0): void {
        this.headerWidth = w;
        this.headerHeight = h;
    }

    public getDetails(str: string): Promise<any> {
        return this.get('/assets/mock/flow/' + str);
    }
    public saveDiaJson(param): Promise<any> {
        return this.post('/api/workflow/saveJson',param);
    }
}
