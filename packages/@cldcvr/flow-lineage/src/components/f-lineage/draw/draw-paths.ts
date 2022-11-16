import {
  HorizontalLinkPathParams,
  VerticalLinkPathParams,
} from "../lineage-types";

export function getForwardLinkPath({
  sx,
  sy,
  dx,
  dy,
  endArcRadius,
  startArcRadius,
  getLinkGap,
  nodeSize,
  gap,
  midX,
  d,
  levelGaps,
}: HorizontalLinkPathParams) {
  if (dy > sy) {
    const antiClockEndCurve = `a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${endArcRadius}`;
    const clockWiseEndCurve = `a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${endArcRadius}`;

    const clockWiseStartCurve = `a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius}`;
    let midY = sy + nodeSize.height / 2 + gap / 2 - endArcRadius;
    const gapCoOrdinates = levelGaps[d.source.level + 1].find((g) => g.y > sy);

    if (gapCoOrdinates) {
      midY = gapCoOrdinates.y + gap / 2 - endArcRadius;
    }
    const dMidX = dx - endArcRadius - gap * getLinkGap(d.level, d.target.id);
    return `M ${sx} ${sy}
	  L ${
      midX - startArcRadius
    } ${sy} ${clockWiseStartCurve} L ${midX} ${midY} ${antiClockEndCurve} L${dMidX} ${
      midY + endArcRadius
    } ${clockWiseEndCurve} L ${dMidX + endArcRadius} ${
      dy - endArcRadius
    } ${antiClockEndCurve} L ${dx} ${dy}`;
  } else {
    const antiClockEndCurve = `a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${endArcRadius}`;
    const antiClockEndCurveInvert = `a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${-endArcRadius}`;
    const clockWiseEndCurve = `a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${-endArcRadius}`;

    const clockWiseStartCurve = `a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius}`;
    let midY = sy + nodeSize.height / 2 + gap / 2 - endArcRadius;

    const gapCoOrdinates = levelGaps[d.source.level + 1].find((g) => g.y > sy);

    if (gapCoOrdinates) {
      midY = gapCoOrdinates.y + gap / 2 - endArcRadius;
    }

    const dMidX = dx - endArcRadius - gap * getLinkGap(d.level, d.target.id);
    return `M ${sx} ${sy}
		L ${
      midX - startArcRadius
    } ${sy} ${clockWiseStartCurve} L ${midX} ${midY} ${antiClockEndCurve} L${dMidX} ${
      midY + endArcRadius
    } ${antiClockEndCurveInvert} L ${dMidX + endArcRadius} ${
      dy + endArcRadius
    } ${clockWiseEndCurve} L ${dx} ${dy}`;
  }
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
