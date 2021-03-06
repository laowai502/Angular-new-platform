import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';

import * as go from 'gojs';
import * as _ from 'lodash';

import { GoJsService } from '../../go-js.service';

import { makePort, showSmallPorts } from '../../utils';

@Component({
    selector: 'app-workarea',
    templateUrl: './workarea.html',
    styleUrls: ['./workarea.scss']
})
export class WorkareaComponent implements OnInit, AfterViewInit {

    @ViewChild('go', { static: true }) public dia: DiagramComponent;

    get waH(): number {
        const { mainHeight: mH, headerHeight: hH } = this.gjs;
        return mH - hH - 90;
    }

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
                grid: $(go.Panel, 'Grid',
                    $(go.Shape, 'LineH', { stroke: 'lightgray', strokeWidth: 0.5 }),
                    $(go.Shape, 'LineH', { stroke: 'gray', strokeWidth: 0.5, interval: 10 }),
                    $(go.Shape, 'LineV', { stroke: 'lightgray', strokeWidth: 0.5 }),
                    $(go.Shape, 'LineV', { stroke: 'gray', strokeWidth: 0.5, interval: 10 })
                ),
                'draggingTool.dragsLink': true,
                'draggingTool.isGridSnapEnabled': true,
                'linkingTool.isUnconnectedLinkValid': true, // 允许链接目标为空
                'linkingTool.portGravity': 30, // 节点间连线自动吸附距离，default: 100
                'relinkingTool.isUnconnectedLinkValid': true, // 不好使啊
                'relinkingTool.portGravity': 30, // 没有链接到节点的线的吸附距离，default: 100
                'relinkingTool.fromHandleArchetype': // 链接线更改时，操作from端样式
                    $(go.Shape, 'Diamond', { segmentIndex: 0, cursor: 'pointer', desiredSize: new go.Size(8, 8), fill: 'tomato', stroke: 'darkred' }),
                'relinkingTool.toHandleArchetype':  // 链接线更改时，操作to端样式
                    $(go.Shape, 'Diamond', { segmentIndex: -1, cursor: 'pointer', desiredSize: new go.Size(8, 8), fill: 'darkred', stroke: 'tomato' }),
                'linkReshapingTool.handleArchetype': // link，中间操作的点样式
                    $(go.Shape, 'Diamond', { desiredSize: new go.Size(7, 7), fill: 'lightblue', stroke: 'deepskyblue' }),
                'rotatingTool.handleAngle': 270, // 旋转操作杆位置，90的倍数
                'rotatingTool.handleDistance': 30,
                'rotatingTool.snapAngleMultiple': 90, // 选择角度标准
                'rotatingTool.snapAngleEpsilon': 15, // 选择角度剩余度数进行自动吸附的角度标准
                'undoManager.isEnabled': true
            }
        );

        const nodeSelectionAdornmentTemplate =
            $(go.Adornment, 'Auto',
                $(go.Shape, { fill: null, stroke: 'deepskyblue', strokeWidth: 1.5, strokeDashArray: [4, 2] }),
                $(go.Placeholder)
            );

        const nodeResizeAdornmentTemplate =
            $(go.Adornment, 'Spot',
                { locationSpot: go.Spot.Right },
                $(go.Placeholder),
                $(go.Shape, { alignment: go.Spot.TopLeft, cursor: 'nw-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.Top, cursor: 'n-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.TopRight, cursor: 'ne-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.Left, cursor: 'w-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.Right, cursor: 'e-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.BottomLeft, cursor: 'se-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.Bottom, cursor: 's-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { alignment: go.Spot.BottomRight, cursor: 'sw-resize', desiredSize: new go.Size(6, 6), fill: 'lightblue', stroke: 'deepskyblue' })
            );

        const nodeRotateAdornmentTemplate =
            $(go.Adornment,
                { locationSpot: go.Spot.Center, locationObjectName: 'ELLIPSE' },
                $(go.Shape, 'Ellipse', { name: 'ELLIPSE', cursor: 'pointer', desiredSize: new go.Size(9, 9), fill: 'lightblue', stroke: 'deepskyblue' }),
                $(go.Shape, { geometryString: 'M4.5 9 L4.5 30', isGeometryPositioned: true, stroke: 'deepskyblue', strokeWidth: 1.5, strokeDashArray: [4, 2] })
            );

        dia.nodeTemplate = $(go.Node, 'Spot',
            { locationSpot: go.Spot.Center },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            { selectable: true, selectionAdornmentTemplate: nodeSelectionAdornmentTemplate },
            { resizable: true, resizeObjectName: 'PANEL', resizeAdornmentTemplate: nodeResizeAdornmentTemplate },
            { rotatable: true, rotateAdornmentTemplate: nodeRotateAdornmentTemplate },
            new go.Binding('angle').makeTwoWay(),
            // the main object is a Panel that surrounds a TextBlock with a Shape
            $(go.Panel, 'Auto',
                { name: 'PANEL' },
                new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
                $(go.Shape, 'Rectangle',  // default figure
                    {
                        portId: '', // the default port: if no spot on link data, use closest side
                        fromLinkable: true, toLinkable: true, cursor: 'pointer',
                        fill: 'white',  // default color
                        strokeWidth: 1
                    },
                    new go.Binding('geometryString', 'geometryString'),
                    new go.Binding('figure', 'fig'),
                    new go.Binding('fill')
                ),
                $(go.TextBlock,
                    {
                        font: 'bold 9pt Helvetica, Arial, sans-serif',
                        margin: new go.Margin(8, 16),
                        // cursor: 'text',
                        // background: '#222222',
                        minSize: new go.Size(65, 30),
                        maxSize: new go.Size(100, NaN),
                        wrap: go.TextBlock.WrapFit,
                        textAlign: 'center',
                        verticalAlignment: go.Spot.Center,
                        editable: true
                    },
                    new go.Binding('text').makeTwoWay())
            ),
            // four small named ports, one on each side:
            makePort('T', go.Spot.Top, false, true),
            makePort('L', go.Spot.Left, true, true),
            makePort('R', go.Spot.Right, true, true),
            makePort('B', go.Spot.Bottom, true, false),
            { // handle mouse enter/leave events to show/hide the ports
                mouseEnter(e, node) { showSmallPorts(node, true); },
                mouseLeave(e, node) { showSmallPorts(node, false); }
            }
        );

        const linkSelectionAdornmentTemplate =
            $(go.Adornment, 'Link',
                $(go.Shape,
                    // isPanelMain declares that this Shape shares the Link.geometry
                    { isPanelMain: true, fill: null, stroke: 'deepskyblue', strokeWidth: 0 })  // use selection object's strokeWidth
            );

        dia.linkTemplate = $(go.Link,  // the whole link panel
            { selectable: true, selectionAdornmentTemplate: linkSelectionAdornmentTemplate },
            { relinkableFrom: true, relinkableTo: true, reshapable: true },
            {
                routing: go.Link.AvoidsNodes,
                curve: go.Link.JumpOver,
                corner: 5,
                toShortLength: 4
            },
            new go.Binding('points').makeTwoWay(),
            $(go.Shape,  // the link path shape
                { isPanelMain: true, strokeWidth: 2 }),
            $(go.Shape,  // the arrowhead
                { toArrow: 'Standard', stroke: null }),
            $(go.Panel, 'Auto',
                new go.Binding('visible', 'isSelected').ofObject(),
                $(go.Shape, 'RoundedRectangle',  // the link shape
                    { fill: '#F8F8F8', stroke: null }),
                $(go.TextBlock,
                    {
                        textAlign: 'center',
                        font: '10pt helvetica, arial, sans-serif',
                        stroke: '#919191',
                        background: 'deepskyblue',
                        cursor: 'text',
                        minSize: new go.Size(10, NaN),
                        editable: true
                    },
                    new go.Binding('text').makeTwoWay())
            )
        );

        dia.model = $(go.GraphLinksModel, { linkKeyProperty: 'key' });

        return dia;
    }

    constructor(private gjs: GoJsService) { }

    ngOnInit() { }

    ngAfterViewInit() {
        // const { nodeTemplate } = this.dia.diagram;
        // this.gjs.shareTemplate.emit(nodeTemplate);
    }

}
