/* eslint-disable @typescript-eslint/no-unused-vars */
import { FLineage } from "../f-lineage";
import {
  LevelLinkGap,
  Lineage,
  LineageDirection,
  LineageLinkElement,
  LineageNodeSize,
  LineageGapElement,
} from "../lineage-types";
import * as d3 from "d3";

export type DrawElbowParams = {
  d: LineageLinkElement;
  levelLinkGap: LevelLinkGap;
  nodeSize: LineageNodeSize;
  childrenNodeSize: LineageNodeSize;
  gap: number;
  direction: LineageDirection;
  lineage: Lineage;
  element: FLineage;
};
import curveStep from "./curve-steps";

type Point = { x: number; y: number };

export default function drawElbow({
  d,
  nodeSize,
  gap,
  childrenNodeSize,
  levelLinkGap,
  lineage,
}: DrawElbowParams) {
  const curveAngle = 12;
  // random delta for node used to pass link in gap
  const getLinkGap = (level: number, nodeid: string) => {
    const levelGaps = levelLinkGap[level];
    if (levelGaps && levelGaps.nodeLinkGap && levelGaps.nodeLinkGap[nodeid]) {
      return levelGaps.nodeLinkGap[nodeid];
    }
    if (!levelGaps) {
      levelLinkGap[level] = {
        linkgap: 0.3,
        nodeLinkGap: {},
      };
    }
    levelLinkGap[level].nodeLinkGap[nodeid] = levelLinkGap[level].linkgap;
    levelLinkGap[level].linkgap += 0.1;
    if (levelLinkGap[level].linkgap >= 0.7) {
      levelLinkGap[level].linkgap = 0.3;
    }
    return levelLinkGap[level].nodeLinkGap[nodeid];
  };

  // line plotting function on given points
  const line = d3
    .line()
    .x((p) => (p as unknown as Point).x)
    .y((p) => (p as unknown as Point).y)
    .curve(curveStep.angle(curveAngle));

  // add point on node for connection
  let startPoint: Point = {
    x:
      d.source.x +
      (d.source.isChildren ? childrenNodeSize.width : nodeSize.width),
    y:
      d.source.y +
      (d.source.isChildren ? childrenNodeSize.height / 2 : nodeSize.height / 2),
  };
  const points: Point[] = [];

  points.push(startPoint);
  // checking if link is forward
  if (d.target.level > d.source.level) {
    for (let l = d.source.level; l < d.target.level; l++) {
      let gapDelta = gap * getLinkGap(d.source.level, d.source.id as string);

      if (d.target.level === l + 1 && d.target.level - d.source.level !== 1) {
        gapDelta = gap * getLinkGap(d.target.level, d.target.id as string);
      }

      let closestGapPoint: LineageGapElement;
      if (d.target.level === l + 1) {
        closestGapPoint = {
          x: d.target.x,
          y:
            d.target.y +
            (d.target.isChildren
              ? childrenNodeSize.height / 2
              : nodeSize.height / 2),
        };
      } else {
        closestGapPoint = lineage.gaps[l + 1].reduce(
          (previous, current) => {
            if (previous.x === -1) {
              return current;
            }
            return Math.abs(current.y - startPoint.y) <
              Math.abs(previous.y - startPoint.y)
              ? current
              : previous;
          },
          { x: -1, y: -1 }
        );

        closestGapPoint = {
          x: closestGapPoint.x + nodeSize.width,
          y: closestGapPoint.y + gap / 2,
        };
      }

      const secondPoint = {
        x: startPoint.x + gapDelta,
        y: startPoint.y,
      };
      points.push(secondPoint);

      // check if curve is feasible
      const isCurveFeasible =
        Math.abs(closestGapPoint.y - startPoint.y) >= curveAngle;

      const thirdPoint = {
        x: startPoint.x + gapDelta,
        y: isCurveFeasible ? closestGapPoint.y : startPoint.y,
      };

      points.push(thirdPoint);

      points.push(closestGapPoint);

      startPoint = { ...closestGapPoint };
    }
  } else if (d.target.level < d.source.level) {
    // for backward connection
    for (let l = d.source.level; l >= d.target.level; l--) {
      let gapDelta = gap * getLinkGap(d.source.level, d.source.id as string);

      if (d.target.level === l && d.target.level - d.source.level !== 1) {
        gapDelta = gap * getLinkGap(d.target.level, d.target.id as string);
      }

      let closestGapPoint: LineageGapElement;
      if (d.target.level === l) {
        closestGapPoint = {
          x: d.target.x,
          y:
            d.target.y +
            (d.target.isChildren
              ? childrenNodeSize.height / 2
              : nodeSize.height / 2),
        };
      } else {
        closestGapPoint = lineage.gaps[l].reduce(
          (previous, current) => {
            if (previous.x === -1) {
              return current;
            }
            return Math.abs(current.y - startPoint.y) <
              Math.abs(previous.y - startPoint.y)
              ? current
              : previous;
          },
          { x: -1, y: -1 }
        );
        let destDelta = 0;
        if (d.target.level === l - 1) {
          destDelta = -nodeSize.width - gap;
        }
        closestGapPoint = {
          x: closestGapPoint.x - gapDelta + destDelta,
          y: closestGapPoint.y + gap / 2,
        };
      }

      const secondPoint = {
        x: startPoint.x - gapDelta * (d.source.level == l ? -1 : 1),
        y: startPoint.y,
      };
      points.push(secondPoint);

      // check if curve is feasible
      const isCurveFeasible =
        Math.abs(closestGapPoint.y - startPoint.y) >= curveAngle;

      const thirdPoint = {
        x: startPoint.x - gapDelta * (d.source.level == l ? -1 : 1),
        y: isCurveFeasible ? closestGapPoint.y : startPoint.y,
      };

      points.push(thirdPoint);

      points.push(closestGapPoint);

      startPoint = { ...closestGapPoint };
    }
  }

  const path = line(points as unknown as [number, number][]);
  return path;
}
