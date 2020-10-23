import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
    selector: 'app-flow-tool-bar',
    templateUrl: './toolbar.html',
    styleUrls: ['./toolbar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FlowToolBar implements OnInit {

    keyword: string;

    constructor() {
        this.keyword = '';
    }

    ngOnInit() {}

    expand() {

    }

    fullScreen() {

    }


}
