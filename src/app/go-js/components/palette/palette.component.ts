import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as go from 'gojs';
import * as _ from 'lodash';

@Component({
    selector: 'app-palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppPaletteComponent implements OnInit {

    public paletteModelData: object = { prop: 'val' };
    public paletteDivClassName = 'myPaletteDiv';

    public paletteNodeData: Array<any> = [
        { key: 'PaletteNode1', color: 'firebrick' },
        { key: 'PaletteNode2', color: 'blueviolet' }
    ];

    public paletteLinkData: Array<any> = [
        { from: 'PaletteNode1', to: 'PaletteNode2' }
    ];

    public paletteModelChange(changes: go.IncrementalData) {
        this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
        this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
        this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
    }

    public initPalette(): go.Palette {
        const $ = go.GraphObject.make;
        const palette = $(go.Palette);

        palette.nodeTemplate = $(go.Node, 'Auto',
            $(go.Shape, 'RoundedRectangle', { stroke: null }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
        );
        palette.model = $(go.GraphLinksModel, { linkKeyProperty: 'key' });

        return palette;
    }

    constructor() { }

    ngOnInit() {}

}
