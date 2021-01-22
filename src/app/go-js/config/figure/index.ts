import * as go from 'gojs';

var KAPPA = 4 * ((Math.sqrt(2) - 1) / 3);

/** @ignore */
var _CachedPoints = [];

/**
* @ignore
* @return {Point}
*/
function tempPoint() {
    var temp = _CachedPoints.pop();
    if (temp === undefined) return new go.Point();
    return temp;
};

/**
  * @ignore
  * @param {Point} temp
  */
 function freePoint(temp) {
    _CachedPoints.push(temp);
};

function breakUpBezier(startx, starty, c1x, c1y, c2x, c2y, endx, endy, fraction,
    curve1cp1, curve1cp2, midpoint, curve2cp1, curve2cp2) {
    var fo = 1 - fraction;
    var so = fraction;
    var m1x = (startx * fo + c1x * so);
    var m1y = (starty * fo + c1y * so);
    var m2x = (c1x * fo + c2x * so);
    var m2y = (c1y * fo + c2y * so);
    var m3x = (c2x * fo + endx * so);
    var m3y = (c2y * fo + endy * so);
    var m12x = (m1x * fo + m2x * so);
    var m12y = (m1y * fo + m2y * so);
    var m23x = (m2x * fo + m3x * so);
    var m23y = (m2y * fo + m3y * so);
    var m123x = (m12x * fo + m23x * so);
    var m123y = (m12y * fo + m23y * so);
    curve1cp1.x = m1x;
    curve1cp1.y = m1y;
    curve1cp2.x = m12x;
    curve1cp2.y = m12y;
    midpoint.x = m123x;
    midpoint.y = m123y;
    curve2cp1.x = m23x;
    curve2cp1.y = m23y;
    curve2cp2.x = m3x;
    curve2cp2.y = m3y;
};

go.Shape.defineFigureGenerator("NotAllowed", function (shape, w, h) {
    var geo = new go.Geometry();
    var cpOffset = KAPPA * .5;
    var radius = .5;
    var centerx = .5;
    var centery = .5;
    var fig = new go.PathFigure(centerx * w, (centery - radius) * h);
    geo.add(fig);
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radius) * w, centery * h, (centerx - cpOffset) * w, (centery - radius) * h,
        (centerx - radius) * w, (centery - cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery + radius) * h, (centerx - radius) * w, (centery + cpOffset) * h,
        (centerx - cpOffset) * w, (centery + radius) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radius) * w, centery * h, (centerx + cpOffset) * w, (centery + radius) * h,
        (centerx + radius) * w, (centery + cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radius) * h, (centerx + radius) * w, (centery - cpOffset) * h,
        (centerx + cpOffset) * w, (centery - radius) * h));
    // Inner circle, composed of two parts, separated by
    // a beam across going from top-right to bottom-left.
    radius = .40;
    cpOffset = KAPPA * .40;
    // First we cut up the top right 90 degree curve into two smaller
    // curves.
    // Since its clockwise, StartOfArrow is the first of the two points
    // on the circle. EndOfArrow is the other one.
    var startOfArrowc1 = tempPoint();
    var startOfArrowc2 = tempPoint();
    var startOfArrow = tempPoint();
    var unused = tempPoint();
    breakUpBezier(centerx, centery - radius,
        centerx + cpOffset, centery - radius,
        centerx + radius, centery - cpOffset,
        centerx + radius, centery, .42, startOfArrowc1,
        startOfArrowc2, startOfArrow, unused, unused);
    var endOfArrowc1 = tempPoint();
    var endOfArrowc2 = tempPoint();
    var endOfArrow = tempPoint();
    breakUpBezier(centerx, centery - radius,
        centerx + cpOffset, centery - radius,
        centerx + radius, centery - cpOffset,
        centerx + radius, centery, .58, unused,
        unused, endOfArrow, endOfArrowc1, endOfArrowc2);
    // Cut up the bottom left 90 degree curve into two smaller curves.
    var startOfArrow2c1 = tempPoint();
    var startOfArrow2c2 = tempPoint();
    var startOfArrow2 = tempPoint();
    breakUpBezier(centerx, centery + radius,
        centerx - cpOffset, centery + radius,
        centerx - radius, centery + cpOffset,
        centerx - radius, centery, .42, startOfArrow2c1,
        startOfArrow2c2, startOfArrow2, unused, unused);
    var endOfArrow2c1 = tempPoint();
    var endOfArrow2c2 = tempPoint();
    var endOfArrow2 = tempPoint();
    breakUpBezier(centerx, centery + radius,
        centerx - cpOffset, centery + radius,
        centerx - radius, centery + cpOffset,
        centerx - radius, centery, .58, unused,
        unused, endOfArrow2, endOfArrow2c1, endOfArrow2c2);
    fig.add(new go.PathSegment(go.PathSegment.Move, endOfArrow2.x * w, endOfArrow2.y * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radius) * w, centery * h, endOfArrow2c1.x * w, endOfArrow2c1.y * h,
        endOfArrow2c2.x * w, endOfArrow2c2.y * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radius) * h, (centerx - radius) * w, (centery - cpOffset) * h,
        (centerx - cpOffset) * w, (centery - radius) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, startOfArrow.x * w, startOfArrow.y * h, startOfArrowc1.x * w, startOfArrowc1.y * h,
        startOfArrowc2.x * w, startOfArrowc2.y * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, endOfArrow2.x * w, endOfArrow2.y * h).close());
    fig.add(new go.PathSegment(go.PathSegment.Move, startOfArrow2.x * w, startOfArrow2.y * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, endOfArrow.x * w, endOfArrow.y * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radius) * w, centery * h, endOfArrowc1.x * w, endOfArrowc1.y * h,
        endOfArrowc2.x * w, endOfArrowc2.y * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery + radius) * h, (centerx + radius) * w, (centery + cpOffset) * h,
        (centerx + cpOffset) * w, (centery + radius) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, startOfArrow2.x * w, startOfArrow2.y * h, startOfArrow2c1.x * w, startOfArrow2c1.y * h,
        startOfArrow2c2.x * w, startOfArrow2c2.y * h).close());
    freePoint(startOfArrowc1);
    freePoint(startOfArrowc2);
    freePoint(startOfArrow);
    freePoint(unused);
    freePoint(endOfArrowc1);
    freePoint(endOfArrowc2);
    freePoint(endOfArrow);
    freePoint(startOfArrow2c1);
    freePoint(startOfArrow2c2);
    freePoint(startOfArrow2);
    freePoint(endOfArrow2c1);
    freePoint(endOfArrow2c2);
    freePoint(endOfArrow2);
    geo.defaultStretch = go.GraphObject.Uniform;
    return geo;
});

go.Shape.defineFigureGenerator("BpmnTaskMessage", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, .2 * h, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, w, .2 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, .8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, .8 * h).close());
    var fig = new go.PathFigure(0, .2 * h, false);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .2 * h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnTaskUser", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, false);
    geo.add(fig);

    var fig2 = new go.PathFigure(.335 * w, (1 - .555) * h, true);
    geo.add(fig2);
    // Shirt
    fig2.add(new go.PathSegment(go.PathSegment.Line, .335 * w, (1 - .405) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .405) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .555) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, w, .68 * h, (1 - .12) * w, .46 * h,
        (1 - .02) * w, .54 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, 0, h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, 0, .68 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .335 * w, (1 - .555) * h, .02 * w, .54 * h,
        .12 * w, .46 * h));
    // Start of neck
    fig2.add(new go.PathSegment(go.PathSegment.Line, .365 * w, (1 - .595) * h));
    var radiushead = .5 - .285;
    var centerx = .5;
    var centery = radiushead;
    var alpha2 = Math.PI / 4;
    var KAPPA = ((4 * (1 - Math.cos(alpha2))) / (3 * Math.sin(alpha2)));
    var cpOffset = KAPPA * .5;
    var radiusw = radiushead;
    var radiush = radiushead;
    var offsetw = KAPPA * radiusw;
    var offseth = KAPPA * radiush;
    // Circle (head)
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx - radiusw) * w, centery * h, (centerx - ((offsetw + radiusw) / 2)) * w, (centery + ((radiush + offseth) / 2)) * h,
        (centerx - radiusw) * w, (centery + offseth) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, centerx * w, (centery - radiush) * h, (centerx - radiusw) * w, (centery - offseth) * h,
        (centerx - offsetw) * w, (centery - radiush) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (centerx + radiusw) * w, centery * h, (centerx + offsetw) * w, (centery - radiush) * h,
        (centerx + radiusw) * w, (centery - offseth) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, (1 - .365) * w, (1 - .595) * h, (centerx + radiusw) * w, (centery + offseth) * h,
        (centerx + ((offsetw + radiusw) / 2)) * w, (centery + ((radiush + offseth) / 2)) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .365) * w, (1 - .595) * h));
    // Neckline
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .555) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, (1 - .335) * w, (1 - .405) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .335 * w, (1 - .405) * h));
    var fig3 = new go.PathFigure(.2 * w, h, false);
    geo.add(fig3);
    // Arm lines
    fig3.add(new go.PathSegment(go.PathSegment.Line, .2 * w, .8 * h));
    var fig4 = new go.PathFigure(.8 * w, h, false);
    geo.add(fig4);
    fig4.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .8 * h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnTaskScript", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(.7 * w, h, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, .3 * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0.3 * w, 0, .6 * w, .5 * h,
        0, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, .7 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .7 * w, h, .4 * w, .5 * h,
        w, .5 * h).close());
    var fig2 = new go.PathFigure(.45 * w, .73 * h, false);
    geo.add(fig2);
    // Lines on script
    fig2.add(new go.PathSegment(go.PathSegment.Line, .7 * w, .73 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, .38 * w, .5 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .63 * w, .5 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, .31 * w, .27 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .56 * w, .27 * h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnTaskMessage", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, .2 * h, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, w, .2 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, .8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, .8 * h).close());
    var fig = new go.PathFigure(0, .2 * h, false);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .2 * h));
    return geo;
});

go.Shape.defineFigureGenerator("InternalStorage", function (shape, w, h) {
    var geo = new go.Geometry();
    var param1 = shape ? shape.parameter1 : NaN;
    var param2 = shape ? shape.parameter2 : NaN;
    if (isNaN(param1)) param1 = .1; // Distance from left
    if (isNaN(param2)) param2 = .1; // Distance from top
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);

    // The main body
    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var fig2 = new go.PathFigure(param1 * w, 0, false);
    geo.add(fig2);
    // Two lines
    fig2.add(new go.PathSegment(go.PathSegment.Line, param1 * w, h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, 0, param2 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, param2 * h));
    //??? geo.spot1 = new go.Spot(param1, param2);
    //??? geo.spot2 = go.Spot.BottomRight;
    return geo;
});


go.Shape.defineFigureGenerator("BpmnEventTimer", function (shape, w, h) {
    var geo = new go.Geometry();
    var radius = .5;
    var cpOffset = KAPPA * .5;
    var fig = new go.PathFigure(w, radius * h, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Bezier, radius * w, h, w, (radius + cpOffset) * h,
        (radius + cpOffset) * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, radius * h, (radius - cpOffset) * w, h,
        0, (radius + cpOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, radius * w, 0, 0, (radius - cpOffset) * h,
        (radius - cpOffset) * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, w, radius * h, (radius + cpOffset) * w, 0,
        w, (radius - cpOffset) * h));
    var fig2 = new go.PathFigure(radius * w, 0, false);
    geo.add(fig2);
    // Hour lines
    fig2.add(new go.PathSegment(go.PathSegment.Line, radius * w, .15 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, radius * w, h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, radius * w, .85 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, 0, radius * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .15 * w, radius * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, w, radius * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .85 * w, radius * h));
    // Clock hands
    fig2.add(new go.PathSegment(go.PathSegment.Move, radius * w, radius * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .58 * w, 0.1 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, radius * w, radius * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .78 * w, .54 * h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnEventEscalation", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, false);
    geo.add(fig);
    // Set dimensions
    var fig2 = new go.PathFigure(w, h, false);
    geo.add(fig2);
    var fig3 = new go.PathFigure(.1 * w, h, true);
    geo.add(fig3);
    fig3.add(new go.PathSegment(go.PathSegment.Line, .5 * w, 0));
    fig3.add(new go.PathSegment(go.PathSegment.Line, .9 * w, h));
    fig3.add(new go.PathSegment(go.PathSegment.Line, .5 * w, .5 * h).close());
    return geo;
});

go.Shape.defineFigureGenerator("BpmnEventConditional", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(.1 * w, 0, true);
    geo.add(fig);

    // Body
    fig.add(new go.PathSegment(go.PathSegment.Line, .9 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .9 * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, .1 * w, h).close());
    var fig2 = new go.PathFigure(.2 * w, .2 * h, false);
    geo.add(fig2);
    // Inside lines
    fig2.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .2 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, .2 * w, .4 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .4 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, .2 * w, .6 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .6 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, .2 * w, .8 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, .8 * w, .8 * h));
    return geo;
});

// Arrows

// ThinX

// ThickCross

go.Shape.defineFigureGenerator("BpmnEventError", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, h, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, .33 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .66 * w, .50 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .66 * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, .33 * w, .50 * h).close());
    return geo;
});

go.Shape.defineFigureGenerator("BpmnActivityCompensation", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, .5 * h, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, h).close());
    return geo;
});

go.Shape.defineFigureGenerator("Triangle", "TriangleUp");  // predefined in 2.0

var _CachedArrays = [];

function tempArray() {
    var temp = _CachedArrays.pop();
    if (temp === undefined) return [];
    return temp;
};

/**
* @ignore
* This allocates a temporary Array that should be freeArray()'ed by the caller.
* @param {number} sides
* @return {Array}
*/
function createPolygon(sides) {
    // Point[] points = new Point[sides + 1];
    var points = tempArray();
    var radius = .5;
    var center = .5;
    var offsetAngle = Math.PI * 1.5;
    var angle = 0;

    // Loop through each side of the polygon
    for (var i = 0; i < sides; i++) {
        angle = 2 * Math.PI / sides * i + offsetAngle;
        points[i] = new go.Point((center + radius * Math.cos(angle)), (center + radius * Math.sin(angle)));
    }

    // Add the last line
    // points[points.length - 1] = points[0];
    points.push(points[0]);
    return points;
};

function freeArray(a) {
    a.length = 0;  // clear any references to objects
    _CachedArrays.push(a);
};

go.Shape.defineFigureGenerator("Pentagon", function (shape, w, h) {
    var points = createPolygon(5);
    var geo = new go.Geometry();
    var fig = new go.PathFigure(points[0].x * w, points[0].y * h, true);
    geo.add(fig);

    for (var i = 1; i < 5; i++) {
        fig.add(new go.PathSegment(go.PathSegment.Line, points[i].x * w, points[i].y * h));
    }
    fig.add(new go.PathSegment(go.PathSegment.Line, points[0].x * w, points[0].y * h).close());
    freeArray(points);
    geo.spot1 = new go.Spot(.2, .22);
    geo.spot2 = new go.Spot(.8, .9);
    return geo;
});

// ThinCross

go.Shape.defineFigureGenerator("AsteriskLine", function (shape, w, h) {
    var offset = .2 / Math.SQRT2;
    return new go.Geometry()
        .add(new go.PathFigure(offset * w, (1 - offset) * h, false)
            .add(new go.PathSegment(go.PathSegment.Line, (1 - offset) * w, offset * h))
            .add(new go.PathSegment(go.PathSegment.Move, offset * w, offset * h))
            .add(new go.PathSegment(go.PathSegment.Line, (1 - offset) * w, (1 - offset) * h))
            .add(new go.PathSegment(go.PathSegment.Move, 0, h / 2))
            .add(new go.PathSegment(go.PathSegment.Line, w, h / 2))
            .add(new go.PathSegment(go.PathSegment.Move, w / 2, 0))
            .add(new go.PathSegment(go.PathSegment.Line, w / 2, h)));
});

go.Shape.defineFigureGenerator("BpmnActivityLoop", function (shape, w, h) {
    var geo = new go.Geometry();
    var r = .5;
    var cx = 0; // offset from Center x
    var cy = 0; // offset from Center y
    var d = r * KAPPA;
    var mx1 = (.4 * Math.SQRT2 / 2 + .5);
    var my1 = (.5 - .5 * Math.SQRT2 / 2);
    var x1 = 1;
    var y1 = .5;
    var x2 = .5;
    var y2 = 0;
    var fig = new go.PathFigure(mx1 * w, (1 - my1) * h, false);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Bezier, x1 * w, y1 * h, x1 * w, .7 * h,
        x1 * w, y1 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (x2 + cx) * w, (y2 + cx) * h, (.5 + r + cx) * w, (.5 - d + cx) * h,
        (.5 + d + cx) * w, (.5 - r + cx) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (.5 - r + cx) * w, (.5 + cy) * h, (.5 - d + cx) * w, (.5 - r + cy) * h,
        (.5 - r + cx) * w, (.5 - d + cy) * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, (.35 + cx) * w, .9 * h, (.5 - r + cx) * w, (.5 + d + cy) * h,
        (.5 - d + cx) * w, .9 * h));
    // Arrowhead
    fig.add(new go.PathSegment(go.PathSegment.Move, (.25 + cx) * w, 0.8 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, (.35 + cx) * w, 0.9 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, (.20 + cx) * w, 0.95 * h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnActivityParallel", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, false);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h));
    fig.add(new go.PathSegment(go.PathSegment.Move, .5 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, .5 * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Move, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnActivityAdHoc", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, false);
    geo.add(fig);

    var fig2 = new go.PathFigure(w, h, false);
    geo.add(fig2);
    var fig3 = new go.PathFigure(0, .5 * h, false);
    geo.add(fig3);
    fig3.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .5 * h, .2 * w, .35 * h,
        .3 * w, .35 * h));
    fig3.add(new go.PathSegment(go.PathSegment.Bezier, w, .5 * h, .7 * w, .65 * h,
        .8 * w, .65 * h));
    return geo;
});

go.Shape.defineFigureGenerator("BpmnActivitySequential", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, false);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Move, 0, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .5 * h));
    fig.add(new go.PathSegment(go.PathSegment.Move, 0, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    return geo;
});

const handGeo = go.Geometry.parse('F1M18.13,10.06 C18.18,10.07 18.22,10.07 18.26,10.08 18.91,' +
    '10.20 21.20,10.12 21.28,12.93 21.36,15.75 21.42,32.40 21.42,32.40 21.42,' +
    '32.40 21.12,34.10 23.08,33.06 23.08,33.06 22.89,24.76 23.80,24.17 24.72,' +
    '23.59 26.69,23.81 27.19,24.40 27.69,24.98 28.03,24.97 28.03,33.34 28.03,' +
    '33.34 29.32,34.54 29.93,33.12 30.47,31.84 29.71,27.11 30.86,26.56 31.80,' +
    '26.12 34.53,26.12 34.72,28.29 34.94,30.82 34.22,36.12 35.64,35.79 35.64,' +
    '35.79 36.64,36.08 36.72,34.54 36.80,33.00 37.17,30.15 38.42,29.90 39.67,' +
    '29.65 41.22,30.20 41.30,32.29 41.39,34.37 42.30,46.69 38.86,55.40 35.75,' +
    '63.29 36.42,62.62 33.47,63.12 30.76,63.58 26.69,63.12 26.69,63.12 26.69,' +
    '63.12 17.72,64.45 15.64,57.62 13.55,50.79 10.80,40.95 7.30,38.95 3.80,' +
    '36.95 4.24,36.37 4.28,35.35 4.32,34.33 7.60,31.25 12.97,35.75 12.97,' +
    '35.75 16.10,39.79 16.10,42.00 16.10,42.00 15.69,14.30 15.80,12.79 15.96,' +
    '10.75 17.42,10.04 18.13,10.06z ');
handGeo.rotate(90, 0, 0);
handGeo.normalize();

go.Shape.defineFigureGenerator('BpmnTaskManual', function (shape, w, h) {
    const geo = handGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    const bounds = geo.bounds;
    const scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    // guess where text should go (in the hand)
    geo.spot1 = new go.Spot(0, 0.6, 10, 0);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
});

// custom figures for Shapes
go.Shape.defineFigureGenerator('Empty', function (shape, w, h) {
    return new go.Geometry();
});

go.Shape.defineFigureGenerator('Annotation', function (shape, w, h) {
    var len = Math.min(w, 10);
    return new go.Geometry()
        .add(new go.PathFigure(len, 0)
            .add(new go.PathSegment(go.PathSegment.Line, 0, 0))
            .add(new go.PathSegment(go.PathSegment.Line, 0, h))
            .add(new go.PathSegment(go.PathSegment.Line, len, h)));
});

const gearStr = 'F M 391,5L 419,14L 444.5,30.5L 451,120.5L 485.5,126L 522,141L 595,83L 618.5,92L 644,106.5' +
    'L 660.5,132L 670,158L 616,220L 640.5,265.5L 658.122,317.809L 753.122,322.809L 770.122,348.309L 774.622,374.309' +
    'L 769.5,402L 756.622,420.309L 659.122,428.809L 640.5,475L 616.5,519.5L 670,573.5L 663,600L 646,626.5' +
    'L 622,639L 595,645.5L 531.5,597.5L 493.192,613.462L 450,627.5L 444.5,718.5L 421.5,733L 393,740.5L 361.5,733.5' +
    'L 336.5,719L 330,627.5L 277.5,611.5L 227.5,584.167L 156.5,646L 124.5,641L 102,626.5L 82,602.5L 78.5,572.5' +
    'L 148.167,500.833L 133.5,466.833L 122,432.5L 26.5,421L 11,400.5L 5,373.5L 12,347.5L 26.5,324L 123.5,317.5' +
    'L 136.833,274.167L 154,241L 75.5,152.5L 85.5,128.5L 103,105.5L 128.5,88.5001L 154.872,82.4758L 237,155' +
    'L 280.5,132L 330,121L 336,30L 361,15L 391,5 Z M 398.201,232L 510.201,275L 556.201,385L 505.201,491L 399.201,537' +
    'L 284.201,489L 242.201,385L 282.201,273L 398.201,232 Z';
  const gearGeo = go.Geometry.parse(gearStr);
  gearGeo.normalize();

go.Shape.defineFigureGenerator('BpmnTaskService', function (shape, w, h) {
    const geo = gearGeo.copy();
    // calculate how much to scale the Geometry so that it fits in w x h
    const bounds = geo.bounds;
    const scale = Math.min(w / bounds.width, h / bounds.height);
    geo.scale(scale, scale);
    // text should go in the hand
    geo.spot1 = new go.Spot(0, 0.6, 10, 0);
    geo.spot2 = new go.Spot(1, 1);
    return geo;
});

go.Shape.defineFigureGenerator("File", function (shape, w, h) {
    var geo = new go.Geometry();
    var fig = new go.PathFigure(0, 0, true); // starting point
    geo.add(fig);
    fig.add(new go.PathSegment(go.PathSegment.Line, .75 * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var fig2 = new go.PathFigure(.75 * w, 0, false);
    geo.add(fig2);
    // The Fold
    fig2.add(new go.PathSegment(go.PathSegment.Line, .75 * w, .25 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Line, w, .25 * h));
    geo.spot1 = new go.Spot(0, .25);
    geo.spot2 = go.Spot.BottomRight;
    return geo;
});

go.Shape.defineFigureGenerator("Database", function (shape, w, h) {
    var geo = new go.Geometry();
    var cpxOffset = KAPPA * .5;
    var cpyOffset = KAPPA * .1;
    var fig = new go.PathFigure(w, .1 * h, true);
    geo.add(fig);

    // Body
    fig.add(new go.PathSegment(go.PathSegment.Line, w, .9 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, h, w, (.9 + cpyOffset) * h,
        (.5 + cpxOffset) * w, h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, 0, .9 * h, (.5 - cpxOffset) * w, h,
        0, (.9 + cpyOffset) * h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, .1 * h));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, 0, 0, (.1 - cpyOffset) * h,
        (.5 - cpxOffset) * w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Bezier, w, .1 * h, (.5 + cpxOffset) * w, 0,
        w, (.1 - cpyOffset) * h));
    var fig2 = new go.PathFigure(w, .1 * h, false);
    geo.add(fig2);
    // Rings
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .2 * h, w, (.1 + cpyOffset) * h,
        (.5 + cpxOffset) * w, .2 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .1 * h, (.5 - cpxOffset) * w, .2 * h,
        0, (.1 + cpyOffset) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, w, .2 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .3 * h, w, (.2 + cpyOffset) * h,
        (.5 + cpxOffset) * w, .3 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .2 * h, (.5 - cpxOffset) * w, .3 * h,
        0, (.2 + cpyOffset) * h));
    fig2.add(new go.PathSegment(go.PathSegment.Move, w, .3 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, .5 * w, .4 * h, w, (.3 + cpyOffset) * h,
        (.5 + cpxOffset) * w, .4 * h));
    fig2.add(new go.PathSegment(go.PathSegment.Bezier, 0, .3 * h, (.5 - cpxOffset) * w, .4 * h,
        0, (.3 + cpyOffset) * h));
    geo.spot1 = new go.Spot(0, .4);
    geo.spot2 = new go.Spot(1, .9);
    return geo;
});

go.Shape.defineFigureGenerator("Process", function (shape, w, h) {
    var geo = new go.Geometry();
    var param1 = shape ? shape.parameter1 : NaN;
    if (isNaN(param1)) param1 = .1; // Distance of left  line from left edge
    var fig = new go.PathFigure(0, 0, true);
    geo.add(fig);

    fig.add(new go.PathSegment(go.PathSegment.Line, w, 0));
    fig.add(new go.PathSegment(go.PathSegment.Line, w, h));
    fig.add(new go.PathSegment(go.PathSegment.Line, 0, h).close());
    var fig2 = new go.PathFigure(param1 * w, 0, false);
    geo.add(fig2);
    fig2.add(new go.PathSegment(go.PathSegment.Line, param1 * w, h));
    //??? geo.spot1 = new go.Spot(param1, 0);
    geo.spot2 = go.Spot.BottomRight;
    return geo;
});