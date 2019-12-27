import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ContentChild, AfterContentInit } from '@angular/core';

@Component({
    selector: 'app-dom-child',
    template: `
        <section>
            <ng-content></ng-content>
            <ng-content select="header" #header></ng-content>
        </section>
    `
})
export class DomChildComponent implements OnInit, AfterViewInit, AfterContentInit {


    @ContentChild('header',  { static: false }) childContent: any;

    constructor() {}

    ngOnInit() {}

    ngAfterViewInit() {}

    ngAfterContentInit() {}

}
