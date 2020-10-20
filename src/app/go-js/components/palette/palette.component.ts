import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import { SHAPES } from '../../config/shape';

import * as go from 'gojs';
import * as _ from 'lodash';

import { textStyle, nodeStyle, makePort } from '../../utils';

@Component({
    selector: 'app-palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppPaletteComponent implements OnInit {

    public paletteModelData: object = { prop: 'val' };
    public paletteDivClassName = 'myPaletteDiv';

    public paletteNodeData: Array<any> = [];

    public paletteLinkData: Array<any> = [];

    public paletteModelChange(changes: go.IncrementalData) {
        console.log(changes);
        this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
        this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
        this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
    }

    public initPalette(): go.Palette {
        const $ = go.GraphObject.make;
        const palette  = $(go.Palette);

        palette.layout = $(go.GridLayout);
        // palette.contentAlignment = go.Spot.Center;

        palette.nodeTemplate = $(go.Node, {
                selectionAdorned: false,
            },
            $(go.Panel, 'Table',
                // { defaultAlignment: go.Spot.Center },
                $(go.Shape,
                    {
                        stroke: '0.5',
                        fill: 'lightblue',
                        margin: new go.Margin(10, 0, 0, 0),
                        width: 40, height: 28,
                    },
                    new go.Binding('figure', 'fig'), new go.Binding('fill', 'color'),
                    new go.Binding('geometryString', 'geometryString'),
                    new go.Binding('width', 'width'),
                    new go.Binding('height', 'height'),
                    new go.Binding('margin', 'margin')
                )
        ));

        palette.model = $(go.GraphLinksModel, { linkKeyProperty: 'name' });

        return palette;
    }

    constructor() {
        for (const i of SHAPES) {
            this.paletteNodeData.push({
                key: i.name,
                width: i.width,
                height: i.height,
                margin: i.margin,
                color: '#FFFFFF',
                fig: i.figure,
                geometryString: i.geometryString
            });
        }
    }

    ngOnInit() {}


}
