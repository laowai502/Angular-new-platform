import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { CompConnectService } from '../../comp-connect.service';

@Component({
    selector: 'app-child1',
    templateUrl: './child1.component.html',
    styleUrls: ['./child1.component.scss']
})
export class Child1Component implements OnInit, AfterContentInit, OnDestroy {

    @Input() fTxt: string;
    @Input() fCount: number;

    @Input() fComponent: any;

    @Input() fFn: any;

    @Output() recallChild1 = new EventEmitter<string>();

    num: number;
    txt = '';

    connectTxt = '';
    conectCount = 1;

    compToCompDestory: any;

    constructor(private cnSercice: CompConnectService) {
        this.num = 0;
    }

    get dynamicTxt() {
        return this.cnSercice.normalData;
    }
    set dynamicTxt(val: string) {
        this.cnSercice.normalData = val;
    }

    ngOnInit() {
        console.log(this.fComponent);

        // this.compToCompDestory = this.cnSercice.compToComp.subscribe((data: string) => {
        this.cnSercice.compToComp.subscribe((data: string) => {
            this.connectTxt = data;
            console.log('child1:' + data);
        });
    }

    ngAfterContentInit() {
        console.log(this.fComponent);
    }

    ngOnDestroy() {
        // this.cnSercice.compToComp = new EventEmitter();
        // this.compToCompDestory.unsubscribe();
        // this.cnSercice.compToComp.unsubscribe();
    }

    countFn() {
        this.fCount++;
        this.fTxt += this.fCount;
    }

    call1() {
        // this.fFn(this.fTxt); // err this => child1
        this.fComponent.father_fn(this.fTxt);
    }

    clickSend() {
        this.recallChild1.emit('child1: ' + ++this.num + ' by @Output');
    }

    resetData() {
        this.num = 0;
        this.txt = '';
    }

    connect() {
        this.cnSercice.compToComp.emit('The msg from child1 ！！！');
    }

}
