import {
  LevelLinkGap,
  LineageDirection,
  LineageLinkElement,
  LineageNodeSize,
} from "../lineage-types";

export default function drawElbow(
  d: LineageLinkElement,
  levelLinkGap: LevelLinkGap,
  nodeSize: LineageNodeSize,
  gap: number,
  direction: LineageDirection
) {
  if (direction === "horizontal") {
    return horizontalDirectionLink(d, levelLinkGap, nodeSize, gap);
  } else {
    return verticalDirectionLink(d, levelLinkGap, nodeSize, gap);
  }
}
function verticalDirectionLink(
  d: LineageLinkElement,
  levelLinkGap: LevelLinkGap,
  nodeSize: LineageNodeSize,
  gap: number
) {
  const getLinkGap = (level: number, nodeid: string) => {
    const levelGaps = levelLinkGap[level];
    if (levelGaps && levelGaps.nodeLinkGap && levelGaps.nodeLinkGap[nodeid]) {
      return levelGaps.nodeLinkGap[nodeid];
    }
    if (!levelGaps) {
      levelLinkGap[level] = {
        linkgap: 0.2,
        nodeLinkGap: {},
      };
    }
    levelLinkGap[level].nodeLinkGap[nodeid] = levelLinkGap[level].linkgap;
    levelLinkGap[level].linkgap += 0.2;
    if (levelLinkGap[level].linkgap === 1) {
      levelLinkGap[level].linkgap = 0.2;
    }
    return levelLinkGap[level].nodeLinkGap[nodeid];
  };

  const xoffset = nodeSize.width / 2;
  const yoffset = nodeSize.height + 4;

  const dy = d.target.y - 4;
  const dx = d.target.x + xoffset;

  let sourceX = d.source.x + xoffset;
  let sourceY = d.source.y + yoffset;
  if (d.source.childrenXMax && d.source.childrenYMax) {
    sourceX = d.source.childrenXMax;
    sourceY = d.source.childrenYMax;
  }

  const sx = sourceX;
  const sy = sourceY;

  const midY = sy + gap * getLinkGap(d.level, d.source.id);
  const endArcRadius = dy - midY;
  const startArcRadius = midY - sy;
  const dist = startArcRadius + endArcRadius;

  if (dx > sx && dx - sx > dist) {
    /**
     * if connection moves in downward direction
     */

    return `M ${sx} ${sy}
       L ${sx} ${
      midY - startArcRadius
    } a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${startArcRadius} L ${
      dx - endArcRadius
    } ${midY} a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${endArcRadius} L ${dx} ${dy}`;
  }
  if (dx === sx) {
    /**
     * if connection goes straight
     */
    return `M ${sx} ${sy} L ${dx} ${dy}`;
  } else if (sx > dx && sx - dx > dist) {
    /**
     * if connection moves in upward direction
     */

    return `M ${sx} ${sy}
   L ${sx} ${
      midY - startArcRadius
    } a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${startArcRadius} L ${
      dx + endArcRadius
    } ${midY} a${endArcRadius},${endArcRadius} 0 0 0 ${-endArcRadius},${endArcRadius} L ${dx} ${dy}`;
  } else {
    /**
     * distance is too small to create elbow
     */
    const xoffset = nodeSize.width / 2;
    const yoffset = nodeSize.height + 4;

    const sx = d.source.x + xoffset;
    const sy = d.source.y + yoffset;

    const dy = d.target.y - 4;
    const dx = d.target.x + xoffset;

    const path = `M ${sx} ${sy}
				      C ${(sx + dx) / 2} ${sy},
				        ${(sx + dx) / 2} ${dy},
				        ${dx} ${dy}`;

    return path;
  }
}

function horizontalDirectionLink(
  d: LineageLinkElement,
  levelLinkGap: LevelLinkGap,
  nodeSize: LineageNodeSize,
  gap: number
) {
  const getLinkGap = (level: number, nodeid: string) => {
    const levelGaps = levelLinkGap[level];
    if (levelGaps && levelGaps.nodeLinkGap && levelGaps.nodeLinkGap[nodeid]) {
      return levelGaps.nodeLinkGap[nodeid];
    }
    if (!levelGaps) {
      levelLinkGap[level] = {
        linkgap: 0.2,
        nodeLinkGap: {},
      };
    }
    levelLinkGap[level].nodeLinkGap[nodeid] = levelLinkGap[level].linkgap;
    levelLinkGap[level].linkgap += 0.2;
    if (levelLinkGap[level].linkgap === 1) {
      levelLinkGap[level].linkgap = 0.2;
    }
    return levelLinkGap[level].nodeLinkGap[nodeid];
  };

  const xoffset = nodeSize.width + 4;
  const yoffset = nodeSize.height / 2;

  const dy = d.target.y + yoffset;
  const dx = d.target.x - 4;

  const sx = d.source.x + xoffset;
  const sy = d.source.y + yoffset;

  const midX = sx + gap * getLinkGap(d.level, d.source.id);
  const endArcRadius = dx - midX;
  const startArcRadius = midX - sx;

  const dist = startArcRadius + endArcRadius;

  if (dy > sy && dy - sy > dist) {
    /**
     * if connection moves in downward direction
     */

    return `M ${sx} ${sy}
   L ${
     midX - startArcRadius
   } ${sy} a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius} L ${midX} ${
      dy - endArcRadius
    } a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${endArcRadius} L ${dx} ${dy}`;
  }
  if (dy === sy) {
    /**
     * if connection goes straight
     */
    return `M ${sx} ${sy} L ${dx} ${dy}`;
  } else if (sy > dy && sy - dy > dist) {
    /**
     * if connection moves in upward direction
     */

    return `M ${sx} ${sy}
   L ${
     midX - startArcRadius
   } ${sy} a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${-startArcRadius} L ${midX} ${
      dy + endArcRadius
    } a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${-endArcRadius} L ${dx} ${dy}`;
  } else {
    /**
     * distance is too small to create elbow
     */
    const xoffset = nodeSize.width + 4;
    const yoffset = nodeSize.height / 2;

    const sx = d.source.x + xoffset;
    const sy = d.source.y + yoffset;

    const dy = d.target.y + yoffset;
    const dx = d.target.x - 4;

    const path = `M ${sx} ${sy}
				      C ${(sx + dx) / 2} ${sy},
				        ${(sx + dx) / 2} ${dy},
				        ${dx} ${dy}`;

    return path;
  }
}
