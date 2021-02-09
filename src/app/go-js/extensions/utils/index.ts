import * as go from 'gojs';
// swimlanes
export const MINLENGTH = 400;  // this controls the minimum length of any swimlane
export const MINBREADTH = 20;  // this controls the minimum breadth of any non-collapsed swimlane

// determine the minimum size of a Lane Group, even if collapsed
export function computeMinLaneSize(lane: go.Group) {
    if (!lane.isSubGraphExpanded) return new go.Size(MINLENGTH, 1);
    return new go.Size(MINLENGTH, MINBREADTH);
}

// compute the minimum size for a particular Lane Group
export function computeLaneSize(lane: go.Group) {
    // assert(lane instanceof go.Group && lane.category !== "Pool");
    const sz = computeMinLaneSize(lane);
    if (lane.isSubGraphExpanded) {
        const holder = lane.placeholder;
        if (holder !== null) {
            const hsz = holder.actualBounds;
            sz.height = Math.max(sz.height, hsz.height);
        }
    }
    // minimum breadth needs to be big enough to hold the header
    const hdr = lane.findObject('HEADER');
    if (hdr !== null) sz.height = Math.max(sz.height, hdr.actualBounds.height);
    return sz;
}

// compute the minimum size of a Pool Group needed to hold all of the Lane Groups
export function computeMinPoolSize(pool: go.Group) {
    // assert(pool instanceof go.Group && pool.category === "Pool");
    let len = MINLENGTH;
    pool.memberParts.each(function (lane) {
        // pools ought to only contain lanes, not plain Nodes
        if (!(lane instanceof go.Group)) return;
        const holder = lane.placeholder;
        if (holder !== null) {
            const sz = holder.actualBounds;
            len = Math.max(len, sz.width);
        }
    });
    return new go.Size(len, NaN);
}