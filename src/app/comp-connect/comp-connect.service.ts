import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CompConnectService {

    normalData: string;
    dynamicData: string;

    compToComp: EventEmitter<any>;

    constructor() {
        this.compToComp = new EventEmitter();
    }

    public getData(): string {
        return this.normalData;
    }

    public setData(val: string = '') {
        this.normalData = val;
    }

}
