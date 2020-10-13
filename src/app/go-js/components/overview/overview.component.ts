import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as go from 'gojs';
import * as _ from 'lodash';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OverviewComponent implements OnInit, AfterViewInit {

    public oDivClassName = 'myOverviewDiv';
    public observedDiagram = null;

    public initOverview(): go.Overview {
        const $ = go.GraphObject.make;
        const overview = $(go.Overview);
        return overview;
    }

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() { }

    ngAfterViewInit() {
        if (this.observedDiagram) { return; }
    }

}
