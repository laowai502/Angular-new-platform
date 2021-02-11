import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as go from 'gojs';
import * as _ from 'lodash';

// import { debounce } from 'rxjs/operators';

import { GoJsService } from '../../go-js.service';

@Component({
    selector: 'app-palette',
    template: `
        <gojs-palette #pla
            [initPalette]="initPalette"
            [nodeDataArray]="paletteNodeData"
            [linkDataArray]="paletteLinkData"
            [modelData]="paletteModelData"
            (modelChange)="paletteModelChange($event)"
            [divClassName]="paletteDivClassName">
        </gojs-palette>
    `,
    styleUrls: ['./palette.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppPaletteComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('pla', { static: true }) public pla: PaletteComponent;

    @Input() nodeData: Array<any>;
    @Input() paletteName: string;

    paletteNodeDataCopy: Array<any> = [];

    private pnsDestr: any;

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
                    margin: new go.Margin(8, 0, 0, 0),
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

    constructor(private gjs: GoJsService) {
        this.pnsDestr = this.gjs.palNodeSearch.subscribe((kw: string) => {
            this.filterNodeKey(kw);
        });
    }

    ngOnInit() {
        this.resetPalette();
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        this.pnsDestr.unsubscribe();
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
                nodeUser: null,
                geometryString: i.geometryString
            });
        }
        this.paletteNodeDataCopy = this.paletteNodeData;
        this.setPalHeight(this.nodeData.length);
    }

    filterNodeKey(kw: string) {
        if (!!kw) {
            const { paletteNodeDataCopy: d } = this;
            this.paletteNodeData = d.filter(e => e.key.toLowerCase().includes(kw.toLowerCase()));
            this.setPalHeight(this.paletteNodeData.length);
        } else {
            this.resetPalette();
        }
    }

    setPalHeight(len: number) {
        const { nativeElement: ele } = this.pla.paletteDiv;
        if (len < 4 && len > 0) { len = 4; }
        ele.style.height = (Math.ceil((len / 4)) * 50.6) + 'px';
    }
}
