import {
  HorizontalLinkPathParams,
  VerticalLinkPathParams,
} from "../lineage-types";
type Point = {
  x: number;
  y: number;
};
export function getForwardLinkPath({
  sx,
  sy,
  dx,
  dy,
  startArcRadius,
  getLinkGap,
  nodeSize,
  gap,
  d,
  lineage,
}: HorizontalLinkPathParams) {
  // console.log(d.source.level, d.target.level);
  const levelGaps = lineage.gaps;

  const startPoint: Point = {
    x: sx,
    y: sy,
  };

  let line = `M ${startPoint.x} ${startPoint.y} `;
  for (let l = d.source.level; l < d.target.level; l++) {
    // calclulating gapDelta (i.e. coordinate between gap)
    const gapDelta = gap * getLinkGap(l, d.source.id);

    // calculating arc radius
    let endArcRadius = 30;
    // check if endArc radius crosses destinaiton point
    if (startPoint.x + gapDelta + endArcRadius > dx) {
      endArcRadius = dx - startPoint.x - gapDelta;
    }

    // get gap co-ordinates from where line will pass
    const gapCoOrdinates = levelGaps[l + 1].find((g) => g.y > startPoint.y);

    // last y co-ordinate where line end at given level
    let nextY = lineage.levelPointers[l + 1].y;

    // use gap co-ordinates to calclulate y co-ordinate where line end at given level
    if (gapCoOrdinates) {
      nextY = gapCoOrdinates.y + gapDelta - endArcRadius;
    }

    // at destination Y
    if (l === d.target.level - 1) {
      nextY = d.target.y + nodeSize.height / 2 - endArcRadius;
    }

    if (nextY > startPoint.y) {
      line += `h ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius} V ${nextY} `;
      line += `a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${endArcRadius} `;
    } else {
      if (l === d.target.level - 1) {
        nextY = d.target.y + nodeSize.height / 2 + endArcRadius;
      }
      line += `h ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${-startArcRadius} V ${nextY} `;

      line += `a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${-endArcRadius} `;
    }

    if (l === d.target.level - 1) {
      line += `L ${dx} ${dy}`;
    } else {
      line += `H ${startPoint.x + gap + nodeSize.width}`;
    }

    startPoint.x += gap + nodeSize.width;
    startPoint.y = nextY += endArcRadius;
  }
  return line;
}

export function getBackwardLinkPath({
  sx,
  sy,
  dx,
  dy,
  startArcRadius,
  getLinkGap,
  nodeSize,
  gap,
  d,
  lineage,
}: HorizontalLinkPathParams) {
  const levelGaps = lineage.gaps;

  const startPoint: Point = {
    x: sx,
    y: sy,
  };

  let line = `M ${startPoint.x} ${startPoint.y} `;
  for (let l = d.source.level; l >= d.target.level; l--) {
    // calclulating gapDelta (i.e. coordinate between gap)
    const gapDelta = gap * getLinkGap(l, d.source.id);

    // get gap co-ordinates from where line will pass
    const gapCoOrdinates = levelGaps[l].find((g) => g.y + gap > startPoint.y);

    // last y co-ordinate where line end at given level
    let nextY = lineage.levelPointers[l].y;

    // use gap co-ordinates to calclulate y co-ordinate where line end at given level
    if (gapCoOrdinates) {
      nextY = gapCoOrdinates.y + gapDelta;
    }
    if (l === d.source.level) {
      line += `h ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius} V ${nextY} `;
      line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${startArcRadius} `;

      line += `H ${startPoint.x - nodeSize.width - gapDelta}`;
    } else if (nextY === startPoint.y) {
      line += `H ${startPoint.x - nodeSize.width - gapDelta}`;
    } else if (nextY > startPoint.y) {
      line += `a${startArcRadius},${startArcRadius} 0 0 0 ${-startArcRadius},${startArcRadius} V ${nextY} `;
      line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${startArcRadius} `;
      line += `H ${startPoint.x - nodeSize.width - gapDelta}`;
    } else if (nextY < startPoint.y) {
      line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${-startArcRadius} V ${nextY} `;
      line += `a${startArcRadius},${startArcRadius} 0 0 0 ${-startArcRadius},${-startArcRadius} `;
      line += `H ${startPoint.x - nodeSize.width - gapDelta}`;
    }

    if (d.source.id === "Tim" && d.target.id === "Tamara") {
      console.log(startPoint, l);
    }
    // destination and source is at same level
    if (l === d.target.level) {
      if (dy < startPoint.y) {
        line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${-startArcRadius} `;
        line += `V ${dy + startArcRadius} `;
        line += `a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${-startArcRadius} `;
        line += `H ${dx} `;
      } else {
        line += `a${startArcRadius},${startArcRadius} 0 0 0 ${-startArcRadius},${startArcRadius} `;
        line += `V ${dy - startArcRadius} `;
        line += `a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${startArcRadius} `;
        line += `H ${dx} `;
      }
    } else {
      startPoint.x -= gap + nodeSize.width;
      startPoint.y = nextY += startArcRadius;
    }
  }
  return line;
}

export function getVerticalForwardLinkPath({
  sx,
  sy,
  dx,
  dy,
  startArcRadius,
  getLinkGap,
  nodeSize,
  gap,
  lineage,
  d,
}: VerticalLinkPathParams) {
  const levelGaps = lineage.gaps;

  const startPoint: Point = {
    x: sx,
    y: sy,
  };

  let line = `M ${startPoint.x} ${startPoint.y} `;
  for (let l = d.source.level; l < d.target.level; l++) {
    if (d.source.id === "level1_2" && d.target.id === "level1_4_1") {
      console.log(startPoint, lineage.levelPointers[l + 1]);
    }

    // calclulating gapDelta (i.e. coordinate between gap)
    const gapDelta = gap * getLinkGap(l, d.source.id);

    // calculating arc radius
    let endArcRadius = 30;
    // check if endArc radius crosses destinaiton point
    if (startPoint.y + gapDelta + endArcRadius > dy) {
      endArcRadius = dy - startPoint.y - gapDelta;
    }

    // get gap co-ordinates from where line will pass
    const gapCoOrdinates = levelGaps[l + 1].find((g) => g.x > startPoint.x);

    // last y co-ordinate where line end at given level
    let nextX = lineage.levelPointers[l + 1].x;

    // use gap co-ordinates to calclulate y co-ordinate where line end at given level

    if (gapCoOrdinates) {
      nextX = gapCoOrdinates.x + gapDelta - endArcRadius;
    }

    // at destination Y
    if (l === d.target.level - 1) {
      nextX = d.target.x + nodeSize.width / 2 - endArcRadius;
    }

    if (nextX > startPoint.x) {
      line += `v ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${startArcRadius} H ${nextX} `;
      line += `a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${endArcRadius} `;
    } else {
      if (l === d.target.level - 1) {
        nextX = d.target.x + nodeSize.width / 2 + endArcRadius;
      }
      line += `v ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${startArcRadius} H ${nextX} `;

      line += `a${endArcRadius},${endArcRadius} 0 0 0 ${-endArcRadius},${endArcRadius} `;
    }

    if (l === d.target.level - 1) {
      line += `L ${dx} ${dy}`;
    } else {
      const endY = lineage.levelPointers[l + 1].y + gap;

      line += `V ${endY}`;
    }

    startPoint.x = nextX + endArcRadius;
    startPoint.y = lineage.levelPointers[l + 1].y + gap;
  }
  return line;
}
