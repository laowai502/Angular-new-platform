import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-dom-child',
    template: `
        <section>
            <ng-content></ng-content>
        </section>
    `
})
export class DomChildComponent implements OnInit, AfterViewInit {


    constructor() {}

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

}
