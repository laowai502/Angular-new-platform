import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
import * as go from 'gojs';
import * as _ from 'lodash';

import { textStyle, nodeStyle, makePort, showLinkLabel } from '../../utils';

@Component({
    selector: 'app-test-diagram',
    templateUrl: './test-diagram.component.html',
    styleUrls: ['./test-diagram.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TestDiagramComponent implements OnInit, AfterViewInit {

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
                model: $(go.GraphLinksModel, { linkKeyProperty: 'text' }) // linkKeyProperty必要的，使用GraphLinkModel时必须为合并和数据同步定义
            }
        );

        dia.addDiagramListener('Modified', (e) => {
            console.log(e);
        });

        // define the Node templates for regular nodes
        dia.nodeTemplateMap.add('',  // the default category
            $(go.Node, 'Table', nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                $(go.Panel, 'Auto',
                    $(go.Shape, 'Rectangle',
                        { fill: '#282c34', stroke: '#00A9C9', strokeWidth: 3.5 },
                        new go.Binding('figure', 'figure')),
                    $(go.TextBlock, textStyle(),
                        {
                            margin: 8,
                            maxSize: new go.Size(160, NaN),
                            wrap: go.TextBlock.WrapFit,
                            editable: true
                        },
                        new go.Binding('text').makeTwoWay())
                ),
                // four named ports, one on each side:
                makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
                makePort('L', go.Spot.Left, go.Spot.LeftSide, true, true),
                makePort('R', go.Spot.Right, go.Spot.RightSide, true, true),
                makePort('B', go.Spot.Bottom, go.Spot.BottomSide, true, false)
            ));

        dia.nodeTemplateMap.add('Conditional',
            $(go.Node, 'Table', nodeStyle(),
                // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
                $(go.Panel, 'Auto',
                    $(go.Shape, 'Diamond',
                        { fill: '#282c34', stroke: '#00A9C9', strokeWidth: 3.5 },
                        new go.Binding('figure', 'figure')),
                    $(go.TextBlock, textStyle(),
                        {
                            margin: 8,
                            maxSize: new go.Size(160, NaN),
                            wrap: go.TextBlock.WrapFit,
                            editable: true
                        },
                        new go.Binding('text').makeTwoWay())
                ),
                // four named ports, one on each side:
                makePort('T', go.Spot.Top, go.Spot.Top, false, true),
                makePort('L', go.Spot.Left, go.Spot.Left, true, true),
                makePort('R', go.Spot.Right, go.Spot.Right, true, true),
                makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
            ));

        dia.nodeTemplateMap.add('Start',
            $(go.Node, 'Table', nodeStyle(),
                $(go.Panel, 'Spot',
                    $(go.Shape, 'Circle',
                        { desiredSize: new go.Size(70, 70), fill: '#282c34', stroke: '#09d3ac', strokeWidth: 3.5 }),
                    $(go.TextBlock, 'Start', textStyle(),
                        new go.Binding('text'))
                ),
                // three named ports, one on each side except the top, all output only:
                makePort('L', go.Spot.Left, go.Spot.Left, true, false),
                makePort('R', go.Spot.Right, go.Spot.Right, true, false),
                makePort('B', go.Spot.Bottom, go.Spot.Bottom, true, false)
            ));

        dia.nodeTemplateMap.add('End',
            $(go.Node, 'Table', nodeStyle(),
                $(go.Panel, 'Spot',
                    $(go.Shape, 'Circle',
                        { desiredSize: new go.Size(60, 60), fill: '#282c34', stroke: '#DC3C00', strokeWidth: 3.5 }),
                    $(go.TextBlock, 'End', textStyle(),
                        new go.Binding('text'))
                ),
                // three named ports, one on each side except the bottom, all input only:
                makePort('T', go.Spot.Top, go.Spot.Top, false, true),
                makePort('L', go.Spot.Left, go.Spot.Left, false, true),
                makePort('R', go.Spot.Right, go.Spot.Right, false, true)
            ));

        // taken from ../extensions/Figures.js:
        go.Shape.defineFigureGenerator('File', function(shape, w, h) {
            const geo = new go.Geometry();
            const fig = new go.PathFigure(0, 0, true); // starting point
            geo.add(fig);
            fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
            fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
            fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
            fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
            const fig2 = new go.PathFigure(.75 * w, 0, false);
            geo.add(fig2);
            // The Fold
            fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
            fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
            geo.spot1 = new go.Spot(0, .25);
            geo.spot2 = go.Spot.BottomRight;
            return geo;
        });

        dia.nodeTemplateMap.add('Comment',
            $(go.Node, 'Auto', nodeStyle(),
                $(go.Shape, 'File',
                    { fill: '#282c34', stroke: '#DEE0A3', strokeWidth: 3 }),
                $(go.TextBlock, textStyle(),
                    {
                        margin: 8,
                        maxSize: new go.Size(200, NaN),
                        wrap: go.TextBlock.WrapFit,
                        textAlign: 'center',
                        editable: true
                    },
                    new go.Binding('text').makeTwoWay())
                // no ports, because no links are allowed to connect with a comment
            ));


        // replace the default Link template in the linkTemplateMap
        dia.linkTemplate =
            $(go.Link,  // the whole link panel
                {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5, toShortLength: 4,
                    relinkableFrom: true,
                    relinkableTo: true,
                    reshapable: true,
                    resegmentable: true,
                    selectionAdorned: false
                },
                new go.Binding('points').makeTwoWay(),
                $(go.Shape,  // the highlight shape, normally transparent
                    { isPanelMain: true, strokeWidth: 8, stroke: 'transparent', name: 'HIGHLIGHT' }),
                $(go.Shape,  // the link path shape
                    { isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
                    new go.Binding('stroke', 'isSelected', function(sel) { return sel ? 'dodgerblue' : 'gray'; }).ofObject()),
                $(go.Shape,  // the arrowhead
                    { toArrow: 'standard', strokeWidth: 0, fill: 'gray' }),
                $(go.Panel, 'Auto',  // the link label, normally not visible
                    { visible: false, name: 'LABEL', segmentIndex: 2, segmentFraction: 0.5 },
                    new go.Binding('visible', 'visible').makeTwoWay(),
                    $(go.Shape, 'RoundedRectangle',  // the label shape
                        { fill: '#F8F8F8', strokeWidth: 0 }),
                    $(go.TextBlock, 'Yes',  // the label
                        {
                            textAlign: 'center',
                            font: '10pt helvetica, arial, sans-serif',
                            stroke: '#333333',
                            editable: true
                        },
                        new go.Binding('text').makeTwoWay())
                )
            );

        return dia;
    }

    constructor() { }

    ngOnInit() {}

    ngAfterViewInit() {
        console.log(this.dia.diagram.nodeTemplate);
    }

}
