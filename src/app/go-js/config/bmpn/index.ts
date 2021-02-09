/**
 * To load BMPN palette & diagram nodeTemplate
 */
import * as go from 'gojs';
import { PoolLayout } from '../../extensions/PoolLayout';

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

const activityNodeTemplate =
    $(go.Node, 'Spot',
        {
            locationObjectName: 'SHAPE', locationSpot: go.Spot.Center,
            resizable: true, resizeObjectName: 'PANEL',
            toolTip: tooltiptemplate,
            selectionAdorned: false,  // use a Binding on the Shape.stroke to show selection
            // contextMenu: activityNodeMenu,
            // itemTemplate: boundaryEventItemTemplate
        },
        new go.Binding('itemArray', 'boundaryEventArray'),
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Auto',
            {
                name: 'PANEL',
                minSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight - 20),
                desiredSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight - 20)
            },
            new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.Panel, 'Spot',
                $(go.Shape, 'RoundedRectangle',  // the outside rounded rectangle
                    {
                        name: 'SHAPE',
                        fill: ActivityNodeFill, stroke: ActivityNodeStroke,
                        parameter1: 10, // corner size
                        portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                        fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide
                    },
                    new go.Binding('fill', 'color'),
                    new go.Binding('strokeWidth', 'isCall',
                        function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })
                ),
                $(go.Shape, 'BpmnTaskScript',    // will be None, Script, Manual, Service, etc via converter
                    {
                        alignment: new go.Spot(0, 0, 5, 5), alignmentFocus: go.Spot.TopLeft,
                        width: 22, height: 22
                    },
                    new go.Binding('fill', 'taskType', nodeActivityTaskTypeColorConverter),
                    new go.Binding('figure', 'taskType', nodeActivityTaskTypeConverter)
                ), // end Task Icon
                makeMarkerPanel(false, 1) // sub-process,  loop, parallel, sequential, ad doc and compensation markers
            ),  // end main body rectangles spot panel
            $(go.TextBlock,  // the center text
                {
                    alignment: go.Spot.Center, textAlign: 'center', margin: 12,
                    editable: true
                },
                new go.Binding('text').makeTwoWay())
        )  // end Auto Panel
    );  // end go.Node, which is a Spot Panel with bound itemArray

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
        'NotAllowed','Empty','BpmnTaskMessage','BpmnEventTimer','BpmnEventEscalation','BpmnEventConditional',
        'Arrow','BpmnEventError','ThinX','BpmnActivityCompensation','Triangle','Pentagon','ThickCross','Circle']
    ;
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

const gatewayNodeTemplate =
    $(go.Node, 'Vertical',
        {
            locationObjectName: 'SHAPE',
            locationSpot: go.Spot.Center,
            toolTip: tooltiptemplate
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        // can be resided according to the user's desires
        { resizable: false, resizeObjectName: 'SHAPE' },
        $(go.Panel, 'Spot',
            $(go.Shape, 'Diamond',
                {
                    strokeWidth: 1, fill: GatewayNodeFill, stroke: GatewayNodeStroke,
                    name: 'SHAPE',
                    desiredSize: new go.Size(GatewayNodeSize, GatewayNodeSize),
                    portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                    fromSpot: go.Spot.NotLeftSide, toSpot: go.Spot.NotRightSide
                },
                new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),  // end main shape
            $(go.Shape, 'NotAllowed',
                { alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke, fill: GatewayNodeSymbolFill },
                new go.Binding('figure', 'gatewayType', nodeGatewaySymbolTypeConverter),
                // new go.Binding("visible", "gatewayType", function(s) { return s !== 4; }),   // comment out if you want exclusive gateway to be X instead of blank.
                new go.Binding('strokeWidth', 'gatewayType', function (s) { return (s <= 4) ? GatewayNodeSymbolStrokeWidth : 1; }),
                new go.Binding('desiredSize', 'gatewayType', nodeGatewaySymbolSizeConverter)),
            // the next 2 circles only show up for event gateway
            $(go.Shape, 'Circle',  // Outer circle
                {
                    strokeWidth: 1, stroke: GatewayNodeSymbolStroke, fill: null, desiredSize: new go.Size(EventNodeSize, EventNodeSize)
                },
                new go.Binding('visible', 'gatewayType', function (s) { return s >= 5; }) // only visible for > 5
            ),  // end main shape
            $(go.Shape, 'Circle',  // Inner circle
                {
                    alignment: go.Spot.Center, stroke: GatewayNodeSymbolStroke,
                    desiredSize: new go.Size(EventNodeInnerSize, EventNodeInnerSize),
                    fill: null
                },
                new go.Binding('visible', 'gatewayType', function (s) { return s === 5; }) // inner  only visible for == 5
            )
        ),
        $(go.TextBlock,
            { alignment: go.Spot.Center, textAlign: 'center', margin: 5, editable: true },
            new go.Binding('text').makeTwoWay())
    ); // end go.Node Vertical

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

// privateProcessNodeTemplate
const privateProcessNodeTemplate =
    $(go.Node, 'Auto',
        { layerName: 'Background', resizable: true, resizeObjectName: 'LANE' },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'Rectangle',
            { fill: null }),
        $(go.Panel, 'Table',     // table with 2 cells to hold header and lane
            {
                desiredSize: new go.Size(ActivityNodeWidth * 6, ActivityNodeHeight),
                background: DataFill, name: 'LANE', minSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight * 0.667)
            },
            new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
            $(go.TextBlock,
                {
                    row: 0, column: 0,
                    angle: 270, margin: 5,
                    editable: true, textAlign: 'center'
                },
                new go.Binding('text').makeTwoWay()),
            $(go.RowColumnDefinition, { column: 1, separatorStrokeWidth: 1, separatorStroke: 'black' }),
            $(go.Shape, 'Rectangle',
                {
                    row: 0, column: 1,
                    stroke: null, fill: 'transparent',
                    portId: '', fromLinkable: true, toLinkable: true,
                    fromSpot: go.Spot.TopBottomSides, toSpot: go.Spot.TopBottomSides,
                    cursor: 'pointer', stretch: go.GraphObject.Fill
                })
        )
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

/* diagrams poolGroup */
const poolGroupTemplate =
    $(go.Group, 'Auto', groupStyle(),
        {
            computesBoundsIncludingLinks: false,
            // use a simple layout that ignores links to stack the "lane" Groups on top of each other
            layout: $(PoolLayout, { spacing: new go.Size(0, 0) })  // no space between lanes
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape,
            { fill: 'white' },
            new go.Binding('fill', 'color')),
        $(go.Panel, 'Table',
            { defaultColumnSeparatorStroke: 'black' },
            $(go.Panel, 'Horizontal',
                { column: 0, angle: 270 },
                $(go.TextBlock,
                    { editable: true, margin: new go.Margin(5, 0, 5, 0) },  // margin matches private process (black box pool)
                    new go.Binding('text').makeTwoWay())
            ),
            $(go.Placeholder,
                { background: 'darkgray', column: 1 })
        )
    ); // end poolGroupTemplate

const swimLanesGroupTemplateForPalette =
    $(go.Group, 'Vertical'); // empty in the palette

function groupStyle() {  // common settings for both Lane and Pool Groups
    return [
        {
            layerName: 'Background',  // all pools and lanes are always behind all nodes and links
            background: 'transparent',  // can grab anywhere in bounds
            movable: true, // allows users to re-order by dragging
            copyable: false,  // can't copy lanes or pools
            avoidable: false  // don't impede AvoidsNodes routed Links
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify)
    ];
}

// hide links between lanes when either lane is collapsed
function updateCrossLaneLinks(group: go.Group) {
    group.findExternalLinksConnected().each((l) => {
        l.visible = (l.fromNode !== null && l.fromNode.isVisible() && l.toNode !== null && l.toNode.isVisible());
    });
}

/* diagrams swimLanesGroupTemplate */
const swimLanesGroupTemplate =
    $(go.Group, 'Spot', groupStyle(),
        {
            name: 'Lane',
            // contextMenu: laneEventMenu,
            minLocation: new go.Point(NaN, -Infinity),  // only allow vertical movement
            maxLocation: new go.Point(NaN, Infinity),
            selectionObjectName: 'SHAPE',  // selecting a lane causes the body of the lane to be highlit, not the label
            resizable: true, resizeObjectName: 'SHAPE',  // the custom resizeAdornmentTemplate only permits two kinds of resizing
            layout: $(go.LayeredDigraphLayout,  // automatically lay out the lane's subgraph
                {
                    isInitial: false,  // don't even do initial layout
                    isOngoing: false,  // don't invalidate layout when nodes or links are added or removed
                    direction: 0,
                    columnSpacing: 10,
                    layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource
                }),
            computesBoundsAfterDrag: true,  // needed to prevent recomputing Group.placeholder bounds too soon
            computesBoundsIncludingLinks: false,  // to reduce occurrences of links going briefly outside the lane
            computesBoundsIncludingLocation: true,  // to support empty space at top-left corner of lane
            handlesDragDropForMembers: true,  // don't need to define handlers on member Nodes and Links
            mouseDrop: function (e: go.InputEvent, grp: go.GraphObject) {  // dropping a copy of some Nodes and Links onto this Group adds them to this Group
                // don't allow drag-and-dropping a mix of regular Nodes and Groups
                if (!e.diagram.selection.any((n) => (n instanceof go.Group && n.category !== 'subprocess') || n.category === 'privateProcess')) {
                    if (!(grp instanceof go.Group) || grp.diagram === null) return;
                    const ok = grp.addMembers(grp.diagram.selection, true);
                    if (ok) {
                        // updateCrossLaneLinks(grp);
                        // relayoutDiagram();
                    } else {
                        grp.diagram.currentTool.doCancel();
                    }
                }
            },
            subGraphExpandedChanged: function (grp: go.Group) {
                if (grp.diagram === null) return;
                if (grp.diagram.undoManager.isUndoingRedoing) return;
                const shp = grp.resizeObject;
                if (grp.isSubGraphExpanded) {
                    shp.height = (grp as any)['_savedBreadth'];
                } else {
                    (grp as any)['_savedBreadth'] = shp.height;
                    shp.height = NaN;
                }
                updateCrossLaneLinks(grp);
            }
        },
        // new go.Binding("isSubGraphExpanded", "expanded").makeTwoWay(),
        $(go.Shape, 'Rectangle',  // this is the resized object
            { name: 'SHAPE', fill: 'white', stroke: null },  // need stroke null here or you gray out some of pool border.
            new go.Binding('fill', 'color'),
            new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify)),

        // the lane header consisting of a Shape and a TextBlock
        $(go.Panel, 'Horizontal',
            {
                name: 'HEADER',
                angle: 270,  // maybe rotate the header to read sideways going up
                alignment: go.Spot.LeftCenter, alignmentFocus: go.Spot.LeftCenter
            },
            $(go.TextBlock,  // the lane label
                { editable: true, margin: new go.Margin(2, 0, 0, 8) },
                new go.Binding('visible', 'isSubGraphExpanded').ofObject(),
                new go.Binding('text', 'text').makeTwoWay()),
            $('SubGraphExpanderButton', { margin: 4, angle: -270 })  // but this remains always visible!
        ),  // end Horizontal Panel
        $(go.Placeholder,
            { padding: 12, alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft }),
        $(go.Panel, 'Horizontal', { alignment: go.Spot.TopLeft, alignmentFocus: go.Spot.TopLeft },
            $(go.TextBlock,  // this TextBlock is only seen when the swimlane is collapsed
                {
                    name: 'LABEL',
                    editable: true, visible: false,
                    angle: 0, margin: new go.Margin(6, 0, 0, 20)
                },
                new go.Binding('visible', 'isSubGraphExpanded', function (e) { return !e; }).ofObject(),
                new go.Binding('text', 'text').makeTwoWay())
        )
    );  // end swimLanesGroupTemplate


/* diagram group */
const SubprocessNodeFill = ActivityNodeFill;
const SubprocessNodeStroke = ActivityNodeStroke;

function assignGroupLayer(grp: go.Part): void {
    if (!(grp instanceof go.Group)) return;
    var lay = grp.isSelected ? "Foreground" : "";
    grp.layerName = lay;
    grp.findSubGraphParts().each(function (m: go.Part) { m.layerName = lay; });
}

const subProcessGroupTemplate =
    $(go.Group, 'Spot',
        {
            locationSpot: go.Spot.Center,
            locationObjectName: 'PH',
            // locationSpot: go.Spot.Center,
            isSubGraphExpanded: false,
            subGraphExpandedChanged: function (grp: go.Group) {
                if (grp.isSubGraphExpanded) grp.isSelected = true;
                assignGroupLayer(grp);
            },
            selectionChanged: assignGroupLayer,
            computesBoundsAfterDrag: true,
            memberValidation: function (group: go.Group, part: go.Part) {
                return !(part instanceof go.Group) ||
                    (part.category !== 'Pool' && part.category !== 'Lane');
            },
            mouseDrop: function (e: go.InputEvent, grp: go.GraphObject) {
                if (e.shift || !(grp instanceof go.Group) || grp.diagram === null) return;
                const ok = grp.addMembers(grp.diagram.selection, true);
                if (!ok) grp.diagram.currentTool.doCancel();
                else assignGroupLayer(grp);
            },
            // contextMenu: activityNodeMenu,
            // itemTemplate: boundaryEventItemTemplate,
            avoidable: false
        },
        new go.Binding('itemArray', 'boundaryEventArray'),
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Auto',
            $(go.Shape, 'RoundedRectangle',
                {
                    name: 'PH', fill: SubprocessNodeFill, stroke: SubprocessNodeStroke,
                    minSize: new go.Size(ActivityNodeWidth, ActivityNodeHeight),
                    portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer',
                    fromSpot: go.Spot.RightSide, toSpot: go.Spot.LeftSide
                },
                new go.Binding('strokeWidth', 'isCall', function (s) { return s ? ActivityNodeStrokeWidthIsCall : ActivityNodeStrokeWidth; })
            ),
            $(go.Panel, 'Vertical',
                { defaultAlignment: go.Spot.Left },
                $(go.TextBlock,  // label
                    { margin: 3, editable: true },
                    new go.Binding('text', 'text').makeTwoWay(),
                    new go.Binding('alignment', 'isSubGraphExpanded', function (s) { return s ? go.Spot.TopLeft : go.Spot.Center; })),
                // create a placeholder to represent the area where the contents of the group are
                $(go.Panel, "Auto",
                    $(go.Shape, { opacity: 0.0 }),
                    $(go.Placeholder,
                        { padding: new go.Margin(5, 5) })
                ),  // end nested Auto Panel
                makeMarkerPanel(true, 1)  // sub-process,  loop, parallel, sequential, ad doc and compensation markers
            )  // end Vertical Panel
        )  // end border Panel
    );  // end Group

// ----------------------------------------  Group template End -----------------------------------------------

export default {
    activityNodeTemplateForPalette,
    eventNodeTemplate,
    gatewayNodeTemplateForPalette,
    annotationNodeTemplate,
    dataObjectNodeTemplate,
    dataStoreNodeTemplate,
    privateProcessNodeTemplateForPalette,
    // group
    subProcessGroupTemplateForPalette,
    poolTemplateForPalette,
    swimLanesGroupTemplateForPalette,
    // be exclusive for diagrams node
    activityNodeTemplate,
    gatewayNodeTemplate,
    privateProcessNodeTemplate,
    // be exclusive for diagrams group
    subProcessGroupTemplate,
    swimLanesGroupTemplate,
    poolGroupTemplate
}