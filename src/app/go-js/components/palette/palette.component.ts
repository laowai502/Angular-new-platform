import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as go from 'gojs';
import * as _ from 'lodash';

import { GoJsService } from '../../go-js.service';

import {  makePort } from '../../utils';

@Component({
    selector: 'app-palette',
    templateUrl: './palette.component.html',
    styleUrls: ['./palette.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppPaletteComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('pla', { static: true }) public pla: PaletteComponent;

    @Input() nodeData: Array<any>;

    private snDestr: any;

    public paletteModelData: object = { prop: 'val' };
    public paletteDivClassName = 'myPaletteDiv';

    public paletteNodeData: Array<any> = [];

    public paletteLinkData: Array<any> = [];

    public paletteModelChange(changes: go.IncrementalData) {
        this.paletteNodeData = DataSyncService.syncNodeData(changes, this.paletteNodeData);
        this.paletteLinkData = DataSyncService.syncLinkData(changes, this.paletteLinkData);
        this.paletteModelData = DataSyncService.syncModelData(changes, this.paletteModelData);
    }

    public initPalette(): go.Palette {
        const $ = go.GraphObject.make;
        const palette  = $(go.Palette, {
            layout: $(go.GridLayout)
        });

        palette.nodeTemplate = $(go.Node, 'Auto', {
                selectionAdorned: false,
                margin: 0,
                cursor: 'pointer'
            },
            $(go.Shape,
                {
                    stroke: '#5C5C5C',
                    fill: 'lightblue',
                    margin: new go.Margin(10, 0, 0, 0),
                    width: 40, height: 28,
                    mouseEnter:  (e, shape) => { shape.original_fill = shape.fill;  shape.fill = '#B8B8B8'; },
                    mouseLeave:  (e, shape) => { shape.fill = shape.original_fill; },
                },
                new go.Binding('figure', 'fig'),
                new go.Binding('geometryString'),
                new go.Binding('fill'),
                new go.Binding('width'),
                new go.Binding('height'),
                new go.Binding('margin')
            ),
            $(go.TextBlock,
                {
                    font: '8pt Helvetica, Arial, sans-serif',
                    margin: 0,
                    textAlign: 'center',
                    verticalAlignment: go.Spot.Center
                },
                new go.Binding('text').makeTwoWay())
        );

        palette.model = $(go.GraphLinksModel, { linkKeyProperty: 'key' });

        return palette;
    }

    constructor(private gjs: GoJsService) {}

    ngOnInit() {
        this.resetPalette();
    }

    ngAfterViewInit() {
        // this.snDestr = this.gjs.shareTemplate.subscribe(data => {
            // this.pla.palette.nodeTemplateMap = template;
        // });
    }

    ngOnDestroy() {
        // this.snDestr.unsubscribe();
    }

    resetPalette() {
        for (const i of this.nodeData) {
            this.paletteNodeData.push({
                key: i.name,
                width: i.width,
                height: i.height,
                margin: i.margin,
                fill: i.fill || '#FFFFFF',
                fig: i.figure,
                text: i.text,
                size: i.size,
                geometryString: i.geometryString
            });
        }
        const { nativeElement: ele } = this.pla.paletteDiv;
        ele.style.height = (Math.ceil((this.nodeData.length / 4)) * 53) + 'px';
    }

}
