import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as go from 'gojs';
import * as _ from 'lodash';

import { GoJsService } from '../../go-js.service';

import { keyCompare } from '../../utils';
import { palNodeTemplateMap, palGroupTemplateMap } from '../../config/bmpn/palette';

@Component({
    selector: 'app-palette-bmpn',
    template: `
        <gojs-palette #pa
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
export class AppPaletteBMPNComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('pa', { static: true }) public pa: PaletteComponent;

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
        const palette = $(go.Palette, {
            layout: $(go.GridLayout, {}),
            nodeTemplateMap: palNodeTemplateMap,
            groupTemplateMap: palGroupTemplateMap
        });
        palette.model = $(go.GraphLinksModel, {
            linkKeyProperty: 'key',
            copiesArrays: true,
            copiesArrayObjects: true,
        });
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
        this.paletteNodeData = [
            // -------------------------- Event Nodes
            { key: 101, category: 'event', text: 'Start', eventType: 1, eventDimension: 1, item: 'start' },
            { key: 102, category: 'event', text: 'Message', eventType: 2, eventDimension: 2, item: 'Message' }, // BpmnTaskMessage
            { key: 103, category: 'event', text: 'Timer', eventType: 3, eventDimension: 3, item: 'Timer' },
            { key: 104, category: 'event', text: 'End', eventType: 1, eventDimension: 8, item: 'End' },
            { key: 107, category: 'event', text: 'Message', eventType: 2, eventDimension: 8, item: 'Message' }, // BpmnTaskMessage
            { key: 108, category: 'event', text: 'Terminate', eventType: 13, eventDimension: 8, item: 'Terminate' },
            // -------------------------- Task/Activity Nodes
            { key: 131, category: 'activity', text: 'Task', item: 'generic task', taskType: 0 },
            { key: 132, category: 'activity', text: 'User Task', item: 'User task', taskType: 2 },
            { key: 133, category: 'activity', text: 'Service\nTask', item: 'service task', taskType: 6 },
            // subprocess and start and end
            { key: 134, category: 'subprocess', loc: '0 0', text: 'Subprocess', isGroup: true, isSubProcess: true, taskType: 0 },
            { key: -802, category: 'event', loc: '0 0', group: 134, text: 'Start', eventType: 1, eventDimension: 1, item: 'start' },
            { key: -803, category: 'event', loc: '350 0', group: 134, text: 'End', eventType: 1, eventDimension: 8, item: 'end', name: 'end' },
            // -------------------------- Gateway Nodes, Data, Pool and Annotation
            { key: 201, category: 'gateway', text: 'Parallel', gatewayType: 1 },
            { key: 204, category: 'gateway', text: 'Exclusive', gatewayType: 4 },
            { key: 301, category: 'dataobject', text: 'Data\nObject' },
            { key: 302, category: 'datastore', text: 'Data\nStorage' },
            { key: 401, category: 'privateProcess', text: 'Black Box' },
            { key: '501', text: 'Pool 1', isGroup: 'true', category: 'Pool' },
            { key: 'Lane5', text: 'Lane 1', isGroup: 'true', group: '501', color: 'lightyellow', category: 'Lane' },
            { key: 'Lane6', text: 'Lane 2', isGroup: 'true', group: '501', color: 'lightgreen', category: 'Lane' },
            { key: 701, category: 'annotation', text: 'note' }
        ];
        this.paletteNodeDataCopy = _.cloneDeep(this.paletteNodeData);
        this.setPalHeight(this.paletteNodeData.length);
    }

    filterNodeKey(kw: string) {
        if (!!kw) {
            const { paletteNodeDataCopy: d } = this;
            this.paletteNodeData = d.filter(e => e.text.toLowerCase().includes(kw.toLowerCase()));
            this.setPalHeight(this.paletteNodeData.length);
        } else {
            this.resetPalette();
        }
    }

    setPalHeight(len: number) {
        const { nativeElement: ele } = this.pa.paletteDiv;
        if (len < 2 && len > 0) { len = 2; }
        ele.style.height = (Math.ceil((this.paletteNodeData.length / 2)) * 60) + 'px';
    }
}
