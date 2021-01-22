/**
 * To load BMPN palette nodeTemplate
 */
import * as go from 'gojs';

const $ = go.GraphObject.make;


// -- common --
const GradientYellow = $(go.Brush, 'Linear', { 0: 'LightGoldenRodYellow', 1: '#FFFF66' });
const GradientLightGreen = $(go.Brush, 'Linear', { 0: '#E0FEE0', 1: 'PaleGreen' });
const GradientLightGray = $(go.Brush, 'Linear', { 0: 'White', 1: '#DADADA' });

// define the appearance of tooltips, shared by various templates
const tooltiptemplate =
    $<go.Adornment>('ToolTip',
        $(go.TextBlock,
            { margin: 3, editable: true },
            new go.Binding('text', '', function (data) {
                if (data.item !== undefined) return data.item;
                return '(unnamed item)';
            }))
    );

// ------------------------------------------  Activity Node Template  ----------------------------------------------

const ActivityNodeWidth = 120;
const ActivityNodeHeight = 80;
const ActivityNodeFill = $(go.Brush, 'Linear', { 0: 'OldLace', 1: 'PapayaWhip' });
const ActivityNodeStroke = '#CDAA7D';
const ActivityMarkerStrokeWidth = 1.5;
const ActivityNodeStrokeWidth = 1;
const ActivityNodeStrokeWidthIsCall = 4;

function nodeActivityTaskTypeColorConverter(s: number) {
    return (s === 5) ? 'dimgray' : 'white';
}

// conversion functions used by data Bindings
function nodeActivityTaskTypeConverter(s: number) {
    const tasks = ['Empty',
        'BpmnTaskMessage',
        'BpmnTaskUser',
        'BpmnTaskManual',   // Custom hand symbol
        'BpmnTaskScript',
        'BpmnTaskMessage',  // should be black on white
        'BpmnTaskService',  // Custom gear symbol
        'InternalStorage'];
    if (s < tasks.length) return tasks[s];
    return 'NotAllowed'; // error
}

// sub-process,  loop, parallel, sequential, ad doc and compensation markers in horizontal array
function makeMarkerPanel(sub: boolean, scale: number) {
    return $(go.Panel, 'Horizontal',
        { alignment: go.Spot.MiddleBottom, alignmentFocus: go.Spot.MiddleBottom },
        $(go.Shape, 'BpmnActivityLoop',
            { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
            new go.Binding('visible', 'isLoop')),
        $(go.Shape, 'BpmnActivityParallel',
            { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
            new go.Binding('visible', 'isParallel')),
        $(go.Shape, 'BpmnActivitySequential',
            { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
            new go.Binding('visible', 'isSequential')),
        $(go.Shape, 'BpmnActivityAdHoc',
            { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth },
            new go.Binding('visible', 'isAdHoc')),
        $(go.Shape, 'BpmnActivityCompensation',
            { width: 12 / scale, height: 12 / scale, margin: 2, visible: false, strokeWidth: ActivityMarkerStrokeWidth, fill: null },
            new go.Binding('visible', 'isCompensation')),
        makeSubButton(sub)
    ); // end activity markers horizontal panel
}

// sub-process,  loop, parallel, sequential, ad doc and compensation markers in horizontal array
function makeSubButton(sub: boolean) {
    if (sub) {
        return [$('SubGraphExpanderButton'),
        { margin: 2, visible: false },
        new go.Binding('visible', 'isSubProcess')];
    }
    return [];
}

const palscale = 3;
const activityNodeTemplateForPalette =
    $(go.Node, 'Vertical',
        {
            selectionAdorned: false,
            cursor: 'pointer',
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Spot',
            {
                name: 'PANEL',
                desiredSize: new go.Size(ActivityNodeWidth / palscale, ActivityNodeHeight / palscale)
            },
            $(go.Shape, 'RoundedRectangle',  // the outside rounded rectangle
                {
                    name: 'SHAPE',
                    fill: ActivityNodeFill, stroke: ActivityNodeStroke,
                    parameter1: 10 / palscale  // corner size (default 10)
                },
                new go.Binding('strokeWidth', 'isCall',
                    function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })),
            $(go.Shape, 'RoundedRectangle',  // the inner "Transaction" rounded rectangle
                {
                    margin: 3,
                    stretch: go.GraphObject.Fill,
                    stroke: ActivityNodeStroke,
                    parameter1: 8 / palscale, fill: null, visible: false
                },
                new go.Binding('visible', 'isTransaction')),
            // task icon
            $(go.Shape, 'BpmnTaskScript',    // will be None, Script, Manual, Service, etc via converter
                {
                    alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
                    width: 22 / palscale, height: 22 / palscale
                },
                new go.Binding('fill', 'taskType', nodeActivityTaskTypeColorConverter),
                new go.Binding('figure', 'taskType', nodeActivityTaskTypeConverter)),
            makeMarkerPanel(false, palscale) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
        ), // End Spot panel
        $(go.TextBlock,  // the center text
            { alignment: go.Spot.Center, textAlign: 'center', margin: 2 },
            new go.Binding('text'))
    );

// ------------------------------------------  Activity Node Template End  ----------------------------------------------


// ------------------------------------------  Event Node Template  ----------------------------------------------

const EventNodeSize = 35;
const EventNodeInnerSize = EventNodeSize - 6;
const EventNodeSymbolSize = EventNodeInnerSize - 14;
const EventEndOuterFillColor = 'pink';
const EventBackgroundColor = GradientLightGreen;
const EventSymbolLightFill = 'white';
const EventSymbolDarkFill = 'dimgray';
const EventDimensionStrokeColor = 'green';
const EventDimensionStrokeEndColor = 'red';
const EventNodeStrokeWidthIsEnd = 4;

function nodeEventDimensionStrokeColorConverter(s: number) {
    if (s === 8) return EventDimensionStrokeEndColor;
    return EventDimensionStrokeColor;
}

function nodeEventDimensionSymbolFillConverter(s: number) {
    if (s <= 6) return EventSymbolLightFill;
    return EventSymbolDarkFill;
}

function nodeEventTypeConverter(s: number) {  // order here from BPMN 2.0 poster
    const tasks = [
        'NotAllowed',
        'Empty',
        'BpmnTaskMessage',
        'BpmnEventTimer',
        'BpmnEventEscalation',
        'BpmnEventConditional',
        'Arrow',
        'BpmnEventError',
        'ThinX',
        'BpmnActivityCompensation',
        'Triangle',
        'Pentagon',
        'ThickCross',
        'Circle'];
    if (s < tasks.length) return tasks[s];
    return 'NotAllowed'; // error
}

const eventNodeTemplate =
    $(go.Node, 'Vertical',
        {
            selectionAdorned: false,
            cursor: 'pointer',
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            toolTip: tooltiptemplate
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        // can be resided according to the user's desires
        { resizable: true, resizeObjectName: 'SHAPE' },
        $(go.Panel, 'Spot',
            $(go.Shape, 'Circle',  // Outer circle
                {
                    strokeWidth: 1,
                    name: 'SHAPE',
                    desiredSize: new go.Size(EventNodeSize, EventNodeSize),
                    portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                    fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide
                },
                // allows the color to be determined by the node data
                new go.Binding('fill', 'eventDimension', function (s) { return (s === 8) ? EventEndOuterFillColor : EventBackgroundColor; }),
                new go.Binding('strokeWidth', 'eventDimension', function (s) { return s === 8 ? EventNodeStrokeWidthIsEnd : 1; }),
                new go.Binding('stroke', 'eventDimension', nodeEventDimensionStrokeColorConverter),
                new go.Binding('strokeDashArray', 'eventDimension', function (s) { return (s === 3 || s === 6) ? [4, 2] : null; }),
                new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)
            ),  // end main shape
            $(go.Shape, 'Circle',  // Inner circle
                { alignment: go.Spot.Center, desiredSize: new go.Size(EventNodeInnerSize, EventNodeInnerSize), fill: null },
                new go.Binding('stroke', 'eventDimension', nodeEventDimensionStrokeColorConverter),
                new go.Binding('strokeDashArray', 'eventDimension', function (s) { return (s === 3 || s === 6) ? [4, 2] : null; }), // dashes for non-interrupting
                new go.Binding('visible', 'eventDimension', function (s) { return s > 3 && s <= 7; }) // inner  only visible for 4 thru 7
            ),
            $(go.Shape, 'NotAllowed',
                { alignment: go.Spot.Center, desiredSize: new go.Size(EventNodeSymbolSize, EventNodeSymbolSize), stroke: 'black' },
                new go.Binding('figure', 'eventType', nodeEventTypeConverter),
                new go.Binding('fill', 'eventDimension', nodeEventDimensionSymbolFillConverter)
            )
        ),  // end Auto Panel
        $(go.TextBlock,
            { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: true },
            new go.Binding('text').makeTwoWay())
    );

// ------------------------------------------  Event Node Template End  ----------------------------------------------

// ------------------------------------------  GateWay Node Template  ------------------------------------------

const GatewayNodeSize = 80;
const GatewayNodeSymbolSize = 45;
const GatewayNodeFill = GradientYellow;
const GatewayNodeStroke = 'darkgoldenrod';
const GatewayNodeSymbolStroke = 'darkgoldenrod';
const GatewayNodeSymbolFill = GradientYellow;
const GatewayNodeSymbolStrokeWidth = 3;

function nodeGatewaySymbolTypeConverter(s: number) {
    const tasks = [
        'NotAllowed',
        'ThinCross',      // 1 - Parallel
        'Circle',         // 2 - Inclusive
        'AsteriskLine',   // 3 - Complex
        'ThinX',          // 4 - Exclusive  (exclusive can also be no symbol, just bind to visible=false for no symbol)
        'Pentagon',       // 5 - double cicle event based gateway
        'Pentagon',       // 6 - exclusive event gateway to start a process (single circle)
        'ThickCross'];   // 7 - parallel event gateway to start a process (single circle)
    if (s < tasks.length) return tasks[s];
    return 'NotAllowed'; // error
}

// tweak the size of some of the gateway icons
function nodeGatewaySymbolSizeConverter(s: number) {
    const size = new go.Size(GatewayNodeSymbolSize, GatewayNodeSymbolSize);
    if (s === 4) {
        size.width = size.width / 4 * 3;
        size.height = size.height / 4 * 3;
    } else if (s > 4) {
        size.width = size.width / 1.6;
        size.height = size.height / 1.6;
    }
    return size;
}

function nodePalGatewaySymbolSizeConverter(s: number) {
    const size = nodeGatewaySymbolSizeConverter(s);
    size.width = size.width / 2;
    size.height = size.height / 2;
    return size;
}

const gatewayNodeTemplateForPalette =
    $(go.Node, 'Vertical',
        {
            selectionAdorned: false,
            cursor: 'pointer',
            toolTip: tooltiptemplate,
            resizable: false,
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            resizeObjectName: 'SHAPE'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Spot',
            $(go.Shape, 'Diamond',
                {
                    strokeWidth: 1, fill: GatewayNodeFill, stroke: GatewayNodeStroke, name: 'SHAPE',
                    desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 2)
                }),
            $(go.Shape, 'NotAllowed',
                { alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke, strokeWidth: GatewayNodeSymbolStrokeWidth, fill: GatewayNodeSymbolFill },
                new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
                // new go.Binding("visible", "gatewayType", function(s) { return s !== 4; }),   // comment out if you want exclusive gateway to be X instead of blank.
                new go.Binding('strokeWidth', 'gatewayType', function (s) { return (s <= 4) ? GatewayNodeSymbolStrokeWidth : 1; }),
                new go.Binding('desiredSize', 'gatewayType', nodePalGatewaySymbolSizeConverter)),
            // the next 2 circles only show up for event gateway
            $(go.Shape, 'Circle',  // Outer circle
                {
                    strokeWidth: 1, stroke: GatewayNodeSymbolStroke, fill: null, desiredSize: new go.Size(EventNodeSize / 2, EventNodeSize / 2)
                },
                // new go.Binding("desiredSize", "gatewayType", new go.Size(EventNodeSize/2, EventNodeSize/2)),
                new go.Binding('visible', 'gatewayType', function (s) { return s >= 5; }) // only visible for > 5
            ),  // end main shape
            $(go.Shape, 'Circle',  // Inner circle
                {
                    alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke,
                    desiredSize: new go.Size(EventNodeInnerSize / 2, EventNodeInnerSize / 2),
                    fill: null
                },
                new go.Binding('visible', 'gatewayType', function (s) { return s === 5; }) // inner  only visible for == 5
            )),

        $(go.TextBlock,
            { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: false },
            new go.Binding('text'))
    );

// ------------------------------------------  GateWay Node Template End  ------------------------------------------

// annotationNodeTemplate
const annotationNodeTemplate =
    $(go.Node, 'Auto',
        { 
            background: GradientLightGray,
            locationSpot: go.Spot.Center,
            selectionAdorned: false,
            cursor: 'pointer'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Annotation', // A left bracket shape
            {
                portId: '', fromLinkable: true, cursor: 'pointer', fromSpot: go.Spot.Left,
                strokeWidth: 2, stroke: 'gray', fill: 'transparent'
            }),
        $(go.TextBlock,
            { margin: 5, editable: true },
            new go.Binding('text').makeTwoWay())
    );

const DataFill = GradientLightGray;
// dataObjectNodeTemplate
const dataObjectNodeTemplate =
    $(go.Node, 'Vertical',
        { 
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            selectionAdorned: false,
            cursor: 'pointer'
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'File',
            {
                name: 'SHAPE', portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                fill: DataFill, desiredSize: new go.Size(EventNodeSize * 0.8, EventNodeSize)
            }),
        $(go.TextBlock,
            {
                margin: 5,
                editable: true
            },
            new go.Binding('text').makeTwoWay())
    );

// dataStoreNodeTemplate
const dataStoreNodeTemplate =
    $(go.Node, 'Vertical',
        {
            selectionAdorned: false,
            cursor: 'pointer', locationObjectName: 'SHAPE', locationSpot: go.Spot.Center },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Database',
            {
                name: 'SHAPE', portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                fill: DataFill, desiredSize: new go.Size(EventNodeSize, EventNodeSize)
            }),
        $(go.TextBlock,
            { margin: 5, editable: true },
            new go.Binding('text').makeTwoWay())
    );

// privateProcessNodeTemplateForPalette
const privateProcessNodeTemplateForPalette =
    $(go.Node, 'Vertical',
        { selectionAdorned: false,
            cursor: 'pointer', locationSpot: go.Spot.Center },
        $(go.Shape, 'Process',
            { fill: DataFill, desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 4) }),
        $(go.TextBlock,
            { margin: 5, editable: true },
            new go.Binding('text'))
    );

// ----------------------------------------  Group template -----------------------------------------------

const subProcessGroupTemplateForPalette =
    $(go.Group, 'Vertical',
        {
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            isSubGraphExpanded: false,
            selectionAdorned: false,
            cursor: 'pointer'
        },
        $(go.Panel, 'Spot',
            {
                name: 'PANEL',
                desiredSize: new go.Size(ActivityNodeWidth / palscale, ActivityNodeHeight / palscale)
            },
            $(go.Shape, 'RoundedRectangle',  // the outside rounded rectangle
                {
                    name: 'SHAPE',
                    fill: ActivityNodeFill, stroke: ActivityNodeStroke,
                    parameter1: 10 / palscale  // corner size (default 10)
                },
                new go.Binding('strokeWidth', 'isCall', function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })
            ),
            $(go.Shape, 'RoundedRectangle',  // the inner "Transaction" rounded rectangle
                {
                    margin: 3,
                    stretch: go.GraphObject.Fill,
                    stroke: ActivityNodeStroke,
                    parameter1: 8 / palscale, fill: null, visible: false
                },
                new go.Binding('visible', 'isTransaction')),
            makeMarkerPanel(true, palscale) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
        ), // end main body rectangles spot panel
        $(go.TextBlock,  // the center text
            { alignment: go.Spot.Center, textAlign: 'center', margin: 2 },
            new go.Binding('text'))
    );  // end go.Group

const poolTemplateForPalette =
    $(go.Group, 'Vertical',
        {
            locationSpot: go.Spot.Center,
            computesBoundsIncludingLinks: false,
            isSubGraphExpanded: false,
            selectionAdorned: false,
            cursor: 'pointer'
        },
        $(go.Shape, 'Process',
            { fill: 'white', desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 4) }),
        $(go.Shape, 'Process',
            { fill: 'white', desiredSize: new go.Size(GatewayNodeSize / 2, GatewayNodeSize / 4) }),
        $(go.TextBlock,
            { margin: 5, editable: true },
            new go.Binding('text'))
    );

const swimLanesGroupTemplateForPalette =
    $(go.Group, 'Vertical'); // empty in the palette

// ----------------------------------------  Group template End -----------------------------------------------


const palNodeTemplateMap = new go.Map<string, go.Node>();
palNodeTemplateMap.add('activity', activityNodeTemplateForPalette);
palNodeTemplateMap.add('event', eventNodeTemplate);
palNodeTemplateMap.add('gateway', gatewayNodeTemplateForPalette);
palNodeTemplateMap.add('annotation', annotationNodeTemplate);
palNodeTemplateMap.add('dataobject', dataObjectNodeTemplate);
palNodeTemplateMap.add('datastore', dataStoreNodeTemplate);
palNodeTemplateMap.add('privateProcess', privateProcessNodeTemplateForPalette);

const palGroupTemplateMap = new go.Map<string, go.Group>();
palGroupTemplateMap.add('subprocess', subProcessGroupTemplateForPalette);
palGroupTemplateMap.add('Pool', poolTemplateForPalette);
palGroupTemplateMap.add('Lane', swimLanesGroupTemplateForPalette);

export { palNodeTemplateMap, palGroupTemplateMap };