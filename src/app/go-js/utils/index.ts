import * as go from 'gojs';

const $ = go.GraphObject.make;


// Define a function for creating a "port" that is normally transparent.
// The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
// and where the port is positioned on the node, and the boolean "output" and "input" arguments
// control whether the user can draw links from or to the port.
export function makePort(name, spot, output, input) {
    // the port is basically just a small transparent circle
    return $(go.Shape, 'Circle',
        {
            fill: null,  // not seen, by default; set to a translucent gray by showSmallPorts, defined below
            stroke: null,
            desiredSize: new go.Size(7, 7),
            alignment: spot,  // align the port on the main Shape
            alignmentFocus: spot,  // just inside the Shape
            portId: name,  // declare this object to be a "port"
            fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
            fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
            cursor: 'pointer'  // show a different cursor to indicate potential link point
        });
}

export function showSmallPorts(node, show) {
    node.ports.each(port => {
        if (port.portId !== '') {  // don't change the default port, which is the big shape
            port.fill = show ? 'rgba(0,0,0,.3)' : null;
        }
    });
}
