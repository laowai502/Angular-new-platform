import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as go from 'gojs';
import * as _ from 'lodash';

@Component({
    selector: 'app-go-js',
    templateUrl: './go-js.component.html',
    styleUrls: ['./go-js.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class GoJsComponent implements OnInit {

    @ViewChild('myDiagram', { static: true }) public myDiagram: DiagramComponent;

    // define node template
    public diagramDivClassName = 'myDiagramDiv';
    public diagramModelData: object = { prop: 'value' };
    public skipsDiagramUpdate = false;

    public diagramNodeData: Array<any> = [
        { key: 'Alpha', color: 'lightblue' },
        { key: 'Beta', color: 'orange' },
        { key: 'Gamma', color: 'lightgreen' },
        { key: 'Delta', color: 'pink' }
    ];

    public diagramLinkData: Array<any> = [
        { key: -1, from: 'Alpha', to: 'Beta' },
        { key: -2, from: 'Alpha', to: 'Gamma' },
        { key: -3, from: 'Beta', to: 'Beta' },
        { key: -4, from: 'Gamma', to: 'Delta' },
        { key: -5, from: 'Delta', to: 'Alpha' }
    ];

    public initDiagram(): go.Diagram { // init fn
        const $ = go.GraphObject.make;
        const dia = $(go.Diagram, {
            'undoManager.isEnabled': true, // 必须设置为允许模型更改监听
            // 'undoManager.maxHistoryLength': 0,  // undoManager.maxHistoryLength为0，则表示为禁用 撤销/重做功能
            model: $(go.GraphLinksModel, { linkKeyProperty: 'key' }) // linkKeyProperty必要的，使用GraphLinkModel时必须为合并和数据同步定义
        });
        dia.nodeTemplate = $(go.Node, 'Auto', { toLinkable: true, fromLinkable: true },
            $(go.Shape, 'RoundedRectangle', { stroke: null }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8 }, new go.Binding('text', 'key'))
        );
        return dia;
    }

    public diagramModelChange(changes: go.IncrementalData) {
        this.skipsDiagramUpdate = true;

        this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
        this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
        this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);
        console.log(changes);
    }

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() { }

    addNode() {
        const { diagram } = this.myDiagram;
        console.log(diagram);
        console.log(this.myDiagram);
        // const node = new go.Node(go.Panel.Auto);
        // const textblock = new go.TextBlock();
        // textblock.text = 'Hello!';
        // textblock.margin = 5;
        // node.add(textblock);
        // diagram.add(node);
    }


}
