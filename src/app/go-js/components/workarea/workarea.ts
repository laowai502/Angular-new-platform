import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as go from 'gojs';
import * as _ from 'lodash';

import { textStyle, nodeStyle, makePort, showLinkLabel } from '../../utils';

@Component({
    selector: 'app-workarea',
    templateUrl: './workarea.html',
    styleUrls: ['./workarea.scss']
})
export class WorkareaComponent implements OnInit, AfterViewInit {

    @ViewChild('go', { static: true }) public dia: DiagramComponent;

    node: any = [];
    link = [];
    model: object = { prop: 'value' };

    skipsDiagramUpdate = false;
    diagramDivClassName = 'test-diagram';

    public diagramModelChange(changes: go.IncrementalData) {
        this.skipsDiagramUpdate = true;

        this.node = DataSyncService.syncNodeData(changes, this.node);
        this.link = DataSyncService.syncLinkData(changes, this.link);
        this.model = DataSyncService.syncModelData(changes, this.model);
    }

    public init(): go.Diagram {
        const $ = go.GraphObject.make;
        const dia = $(go.Diagram,
            {
                LinkDrawn: showLinkLabel,  // this DiagramEvent listener is defined below
                LinkRelinked: showLinkLabel,
                'undoManager.isEnabled': true, // 必须设置为允许模型更改监听
                model: $(go.GraphLinksModel, { linkKeyProperty: 'key' }), // linkKeyProperty必要的，使用GraphLinkModel时必须为合并和数据同步定义
                'grid.visible': true
            }
        );

        dia.nodeTemplate = $(go.Node, 'Auto', { desiredSize: new go.Size(100, 80) },
            $(go.Shape, { margin: new go.Margin(5, 0, 5, 0) }, new go.Binding('figure', 'fig'), new go.Binding('fill', 'color')),
            $(go.TextBlock, { text: '', editable: true }),
        );

        return dia;
    }

    constructor() { }

    ngOnInit() { }

    ngAfterViewInit() {
        console.log(this.dia.diagram.nodeTemplate);
    }

    add() {
        const { diagram } = this.dia;
        const $ = go.GraphObject.make;
        diagram.add(
            $(go.Node)
        );
    }
}
