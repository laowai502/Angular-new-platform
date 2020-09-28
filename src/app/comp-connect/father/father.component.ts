import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { Child3Component } from './child3/child3.component';

@Component({
    selector: 'app-father',
    templateUrl: './father.component.html',
    styleUrls: ['./father.component.scss']
})
export class FatherComponent implements OnInit, AfterViewInit {

    count: number;
    txt: string;

    list: Array<string>;

    toggle = true;

    @ViewChild('c1', { static: false }) c1: Child1Component;
    @ViewChild('c2', { static: false }) c2: Child2Component;
    @ViewChild('c3', { static: false }) c3: Child3Component;

    constructor() {
        this.count = 1;
        this.txt = 'father init string val';
    }

    ngOnInit() {
        this.resetList();
    }

    ngAfterViewInit() {
        console.log(this.c1);
    }

    father_fn(val) {
        // console.log(val);
        // console.log(this);
        this.list.push(val);
    }

    resetList() {
        this.list = [
            'obj1', 'obj2', 'obj3', 'obj4', 'obj5', 'obj6'
        ];
    }

    callChild1() {
        this.c1.num++;
        this.c1.txt += this.c1.num++;
    }

    callChildFn1() {
        this.c1.resetData();
    }

    recallChild1(val) {
        this.list.push(val);
    }

    toggelChild() {
        this.toggle = !this.toggle;
    }

    callChild2() {
    }

    callChild3() {
    }


    recallChild2() {
    }

    recallChild3() {
    }


}
