import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as _ from 'lodash';
import * as go from 'gojs';

import { Store } from '@ngrx/store';
import { enableLoading } from 'src/app/action/loading.action';
import { ActivatedRoute } from '@angular/router';

import { assignGroupLayer } from '../../utils';

import { GoJsService } from '../../go-js.service';

import { LaneResizingTool } from '../../extensions/LaneResizing';
import { DrawCommandHandler } from '../../extensions/DrawCommandHandler';
import { BPMNLinkingTool, BPMNRelinkingTool } from '../../extensions/BPMNClasses.js';
import { nodeTemplateMap, linkTemplateMap, groupTemplateMap } from '../../config/bmpn/diagram';

@Component({
    selector: 'app-bmpn-workarea',
    template: `
        <gojs-diagram #go
            [initDiagram]="init"
            [nodeDataArray]="node"
            [linkDataArray]="link"
            [modelData]="model"
            [skipsDiagramUpdate]="skipsDiagramUpdate"
            (modelChange)="diagramModelChange($event)"
            [divClassName]="diagramDivClassName">
        </gojs-diagram>
    `,
    styleUrls: ['./workarea.scss']
})
export class BmpnWorkareaComponent implements OnInit, AfterViewInit {

    id: string;
    
    link = [];
    node: any = [];
    model: object = { prop: 'value' };
    
    skipsDiagramUpdate = false;
    diagramDivClassName = 'test-diagram';
    
    @ViewChild('go', { static: true }) public dia: DiagramComponent;

    public diagramModelChange(changes: go.IncrementalData) {
        this.skipsDiagramUpdate = true;
        this.node = DataSyncService.syncNodeData(changes, this.node);
        this.link = DataSyncService.syncLinkData(changes, this.link);
        this.model = DataSyncService.syncModelData(changes, this.model);
        console.log(this.model);
    }

    public init(): go.Diagram {
        const $ = go.GraphObject.make;

        let dia = $(go.Diagram,
            {
                grid: $(go.Panel, 'Grid',
                    $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
                    $(go.Shape, 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),
                    $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),
                    $(go.Shape, 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })
                ),
                nodeTemplateMap: nodeTemplateMap,
                linkTemplateMap: linkTemplateMap,
                groupTemplateMap: groupTemplateMap,

                commandHandler: new DrawCommandHandler(),  // defined in DrawCommandHandler.js
                // default to having arrow keys move selected nodes
                'commandHandler.arrowKeyBehavior': 'move',

                mouseDrop: function (e: go.InputEvent) {
                    // when the selection is dropped in the diagram's background,
                    // make sure the selected Parts no longer belong to any Group
                    const ok = dia.commandHandler.addTopLevelParts(dia.selection, true);
                    if (!ok) dia.currentTool.doCancel();
                },
                resizingTool: new LaneResizingTool(),
                linkingTool: new BPMNLinkingTool(), // defined in BPMNClasses.js
                relinkingTool: new BPMNRelinkingTool(), // defined in BPMNClasses.js
                // 'SelectionMoved': relayoutDiagram,  // defined below
                // 'SelectionCopied': relayoutDiagram,
                "LinkDrawn": function (e) { assignGroupLayer(e.subject.containingGroup); },
                "LinkRelinked": function (e) { assignGroupLayer(e.subject.containingGroup); }
            });

        dia.addDiagramListener('LinkDrawn', function (e) {
            if (e.subject.fromNode.category === 'annotation') {
                e.subject.category = 'annotation'; // annotation association
            } else if (e.subject.fromNode.category === 'dataobject' || e.subject.toNode.category === 'dataobject') {
                e.subject.category = 'data'; // data association
            } else if (e.subject.fromNode.category === 'datastore' || e.subject.toNode.category === 'datastore') {
                e.subject.category = 'data'; // data association
            }
        });

        dia.model = $(go.GraphLinksModel, { linkKeyProperty: 'key' });

        return dia;
    }

    constructor(
        private gjs: GoJsService,
        private route: ActivatedRoute,
        private store: Store<{ loading: boolean }>
    ) {
        this.route.queryParams.subscribe(params => {
            this.id = params.id;
        });
    }

    ngOnInit() {
        if (this.id && this.id !== '') {
            setTimeout(() => {
                this.gjs.getDetails(this.id).then(data => {
                    const { diagram: myDiagram } = this.dia;
                    function loadDiagramProperties(e?: go.DiagramEvent) {
                        // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
                        const pos = myDiagram.model.modelData.position;
                        if (pos) myDiagram.initialPosition = go.Point.parse(pos);
                    }
                    myDiagram.addDiagramListener('InitialLayoutCompleted', loadDiagramProperties);  // defined below
                    // create the model from the data in the JavaScript object parsed from JSON text
                    // myDiagram.model = new go.GraphLinksModel(jsondata["nodes"], jsondata["links"]);
                    myDiagram.model = go.Model.fromJson(data);
                    loadDiagramProperties();
                    myDiagram.model.undoManager.isEnabled = true;
                    myDiagram.isModified = false;
                }).catch(err => {
                    console.log(err);
                });
            }, 200);
        }
    }

    ngAfterViewInit() {}

}
