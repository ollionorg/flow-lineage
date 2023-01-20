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
    const gapDelta = gap * getLinkGap(l, d.target.id as string);

    // calculating arc radius
    let endArcRadius = 30;
    // check if endArc radius crosses destinaiton point
    if (startPoint.x + gapDelta + endArcRadius > dx) {
      endArcRadius = dx - startPoint.x - gapDelta;
    }

    // get gap co-ordinates from where line will pass
    const gapCoOrdinates = levelGaps[l + 1].find((g) => {
      let yToCompare = startPoint.y;

      if (l === d.source.level) {
        yToCompare += nodeSize.height / 2;
      }
      return g.y > yToCompare;
    });

    // last y co-ordinate where line end at given level
    let nextY = lineage.levelPointers[l + 1].y;
    if (lineage.levelPointers[l].y === lineage.levelPointers[l + 1].y) {
      nextY = startPoint.y;
      if (l === d.source.level) {
        nextY = lineage.levelPointers[l].y;
      }
      // console.log("Assigning same y");
    }
    // use gap co-ordinates to calclulate y co-ordinate where line end at given level
    if (gapCoOrdinates) {
      nextY = gapCoOrdinates.y + gapDelta - endArcRadius;
    }

    // at destination Y
    if (l === d.target.level - 1) {
      nextY = d.target.y + nodeSize.height / 2 - endArcRadius;
    }

    const diff = nextY - startPoint.y;
    if (diff < -30) {
      nextY = startPoint.y - 30;
    } else if (diff > 0 && diff < 30) {
      nextY = startPoint.y + 30;
    }

    // if (d.source.id === "rdj" && d.target.id === "judge") {
    //   console.log(
    //     gapCoOrdinates,
    //     startPoint.y,
    //     nextY,
    //     lineage.levelPointers[l + 1].y
    //   );
    // }
    if (nextY > startPoint.y) {
      line += `h ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius} V ${
        nextY - endArcRadius
      } `;
      line += `a${endArcRadius},${endArcRadius} 0 0 0 ${endArcRadius},${endArcRadius} `;
    } else if (nextY === startPoint.y) {
      line += `H ${startPoint.x + gap}`;
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
    startPoint.y = nextY + endArcRadius;
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
  element,
}: HorizontalLinkPathParams) {
  const levelGaps = lineage.gaps;

  const startPoint: Point = {
    x: sx,
    y: sy,
  };

  let line = `M ${startPoint.x} ${startPoint.y} `;
  for (let l = d.source.level; l >= d.target.level; l--) {
    // calclulating gapDelta (i.e. coordinate between gap)
    const gapDelta = gap * getLinkGap(l, d.source.id as string);

    // get gap co-ordinates from where line will pass
    const gapCoOrdinates = levelGaps[l].find((g) => g.y + gap > startPoint.y);

    // last y co-ordinate where line end at given level
    let nextY = lineage.levelPointers[l].y;

    // use gap co-ordinates to calclulate y co-ordinate where line end at given level
    if (gapCoOrdinates) {
      nextY = gapCoOrdinates.y + gapDelta;
    }

    let yDiff = nextY - startPoint.y;
    if (yDiff < 0) {
      yDiff *= -1;
    }

    const nextX = startPoint.x - nodeSize.width - gapDelta;
    if (l === d.source.level) {
      line += `h ${
        gapDelta - startArcRadius
      } a${startArcRadius},${startArcRadius} 0 0 1 ${startArcRadius},${startArcRadius} V ${nextY} `;
      line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${startArcRadius} `;

      line += `H ${nextX}`;
    } else if (nextY === startPoint.y || yDiff < 2 * startArcRadius) {
      line += `H ${nextX}`;
    } else if (nextY > startPoint.y) {
      line += `a${startArcRadius},${startArcRadius} 0 0 0 ${-startArcRadius},${startArcRadius} V ${nextY} `;
      line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${startArcRadius} `;
      line += `H ${nextX}`;
    } else if (nextY < startPoint.y) {
      line += `a${startArcRadius},${startArcRadius} 0 0 1 ${-startArcRadius},${-startArcRadius} V ${nextY} `;
      line += `a${startArcRadius},${startArcRadius} 0 0 0 ${-startArcRadius},${-startArcRadius} `;
      line += `H ${nextX}`;
    }

    const leftX = element?.padding ?? 0;
    if (nextX < leftX && element) {
      console.log("got negative x");
      if (element.getDrawParams().svg.attr("transform") == null) {
        element
          .getDrawParams()
          .svg.attr("transform", `translate(${nextX + gap},0) scale(1)`);
      }
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
    const gapDelta = gap * getLinkGap(l, d.source.id as string);

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
