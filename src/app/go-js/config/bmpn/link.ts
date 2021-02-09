import * as go from 'gojs';
import { BPMNLinkingTool, BPMNRelinkingTool, PoolLink } from '../../extensions/BPMNClasses';

const $ = go.GraphObject.make;

const messageFlowLinkTemplate =
    $(PoolLink, // defined in BPMNClasses.js
        {
            routing: go.Link.Orthogonal, curve: go.Link.JumpGap, corner: 10,
            fromSpot: go.Spot.TopBottomSides, toSpot: go.Spot.TopBottomSides,
            reshapable: true, relinkableTo: true, toEndSegmentLength: 20
        },
        new go.Binding('points').makeTwoWay(),
        $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [6, 2] }),
        $(go.Shape, { toArrow: 'Triangle', scale: 1, fill: 'white', stroke: 'black' }),
        $(go.Shape, { fromArrow: 'Circle', scale: 1, visible: true, stroke: 'black', fill: 'white' }),
        $(go.TextBlock, {
            editable: true, text: 'label'
        }, // Link label
            new go.Binding('text', 'text').makeTwoWay())
    );

const annotationAssociationLinkTemplate =
    $(go.Link,
        {
            reshapable: true, relinkableFrom: true, relinkableTo: true,
            toSpot: go.Spot.AllSides,
            toEndSegmentLength: 20, fromEndSegmentLength: 40
        },
        new go.Binding('points').makeTwoWay(),
        $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [1, 3] }),
        $(go.Shape, { toArrow: 'OpenTriangle', scale: 1, stroke: 'black' })
    );

const dataAssociationLinkTemplate =
    $(go.Link,
        {
            routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10,
            fromSpot: go.Spot.AllSides, toSpot: go.Spot.AllSides,
            reshapable: true, relinkableFrom: true, relinkableTo: true
        },
        new go.Binding('points').makeTwoWay(),
        $(go.Shape, { stroke: 'black', strokeWidth: 1, strokeDashArray: [1, 3] }),
        $(go.Shape, { toArrow: 'OpenTriangle', scale: 1, fill: null, stroke: 'blue' })
    );

const sequenceLinkTemplate =
    $(go.Link,
        {
            contextMenu:
                $<go.Adornment>('ContextMenu',
                    $('ContextMenuButton',
                        $(go.TextBlock, 'Default Flow'),
                        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
                        { click: function (e: go.InputEvent, obj: go.GraphObject) { 
                            // setSequenceLinkDefaultFlow((obj.part as go.Adornment).adornedObject as go.Link); 
                        } }),
                    $('ContextMenuButton',
                        $(go.TextBlock, 'Conditional Flow'),
                        // in the click event handler, the obj.part is the Adornment; its adornedObject is the port
                        { click: function (e: go.InputEvent, obj: go.GraphObject) { 
                            // setSequenceLinkConditionalFlow((obj.part as go.Adornment).adornedObject as go.Link); 
                        } })
                ),
            routing: go.Link.AvoidsNodes, curve: go.Link.JumpGap, corner: 10,
            // fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide,
            reshapable: true, relinkableFrom: true, relinkableTo: true, toEndSegmentLength: 20
        },
        new go.Binding('points').makeTwoWay(),
        $(go.Shape, { stroke: 'black', strokeWidth: 1 }),
        $(go.Shape, { toArrow: 'Triangle', scale: 1.2, fill: 'black', stroke: null }),
        $(go.Shape, { fromArrow: '', scale: 1.5, stroke: 'black', fill: 'white' },
            new go.Binding('fromArrow', 'isDefault', function (s) {
                if (s === null) return '';
                return s ? 'BackSlash' : 'StretchedDiamond';
            }),
            new go.Binding('segmentOffset', 'isDefault', function (s) {
                return s ? new go.Point(5, 0) : new go.Point(0, 0);
            })),
        $(go.TextBlock, { // this is a Link label
            name: 'Label', editable: true, text: 'label', segmentOffset: new go.Point(-10, -10), visible: false
        },
            new go.Binding('text', 'text').makeTwoWay(),
            new go.Binding('visible', 'visible').makeTwoWay())
    );



export default {
    messageFlowLinkTemplate,
    annotationAssociationLinkTemplate,
    dataAssociationLinkTemplate,
    sequenceLinkTemplate // default
}