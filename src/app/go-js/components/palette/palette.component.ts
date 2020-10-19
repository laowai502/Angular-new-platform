import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { DataSyncService, DiagramComponent, PaletteComponent } from 'gojs-angular';
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

    public paletteNodeData: Array<any> = [
        { category: 'Start', text: 'Start' },
        { text: 'Step' },
        { category: 'Conditional', text: '???' },
        { category: 'End', text: 'End' },
        { category: 'Comment', text: 'Comment' }
    ];

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

        palette.nodeTemplateMap.add('',  // the default category
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

        palette.nodeTemplateMap.add('Conditional',
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

        palette.nodeTemplateMap.add('Start',
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

        palette.nodeTemplateMap.add('End',
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

        go.Shape.defineFigureGenerator('File', (shape, w, h) => {
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

        palette.nodeTemplateMap.add('Comment',
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

        // palette.model = $(go.GraphLinksModel, { linkKeyProperty: 'key' });

        return palette;
    }

    constructor() { }

    ngOnInit() {}

}