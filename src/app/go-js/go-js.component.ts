import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as go from 'gojs';
import * as _ from 'lodash';

import { textStyle, nodeStyle, makePort, showLinkLabel } from './utils';

@Component({
    selector: 'app-go-js',
    templateUrl: './go-js.component.html',
    styleUrls: ['./go-js.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoJsComponent implements OnInit, AfterViewInit {

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() { }

}
