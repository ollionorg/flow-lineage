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

export function getVerticalForwardLinkPath({
  sx,
  sy,
  dx,
  dy,
  endArcRadius,
  startArcRadius,
  getLinkGap,
  nodeSize,
  gap,
  midY,
  d,
}: VerticalLinkPathParams) {
  if (dx > sx) {
    const antiClockEndCurve = `a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${endArcRadius}`;
    const clockWiseEndCurve = `a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${endArcRadius}`;
    const antiClockStartCurve = `a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${startArcRadius}`;
    const clockWiseStartCurve = `a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius}`;

    const dMidY = dy - endArcRadius - gap * getLinkGap(d.level, d.target.id);
    return `M ${sx} ${sy}
		  L ${sx} ${midY - startArcRadius} ${antiClockStartCurve} L ${
      sx + nodeSize.width / 2 + gap / 2
    } ${midY} ${clockWiseStartCurve} L ${
      sx + nodeSize.width / 2 + gap / 2 + startArcRadius
    } ${dMidY} ${antiClockEndCurve} L ${dx - endArcRadius} ${
      dMidY + endArcRadius
    } ${clockWiseEndCurve} L ${dx} ${dy}`;
  } else {
    const antiClockEndCurve = `a${endArcRadius},${endArcRadius} 0 0 0 ${-endArcRadius},${endArcRadius}`;

    const clockWiseEndCurve = `a${endArcRadius},${endArcRadius} 0 0 1 ${-endArcRadius},${endArcRadius}`;
    const antiClockStartCurve = `a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${startArcRadius}`;
    const clockWiseStartCurve = `a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius}`;

    const dMidY = dy - endArcRadius - gap * getLinkGap(d.level, d.target.id);
    return `M ${sx} ${sy}
		  L ${sx} ${midY - startArcRadius} ${antiClockStartCurve} L ${
      sx + nodeSize.width / 2 + gap / 2
    } ${midY} ${clockWiseStartCurve} L ${
      sx + nodeSize.width / 2 + gap / 2 + startArcRadius
    } ${dMidY} ${clockWiseEndCurve} L ${dx + endArcRadius} ${
      dMidY + endArcRadius
    } ${antiClockEndCurve} L ${dx} ${dy}`;
  }
}
