import {
  DrawLineageParams,
  LevelLinkGap,
  LineageLinkElement,
} from "../lineage-types";

import drawElbow from "./draw-elbow";

export default function drawLinks({
  lineage,
  svg,
  nodeSize,
  childrenNodeSize,
  gap,
  direction,
  element,
  levelsToPlot,
  page,
  filter,
}: DrawLineageParams) {
  console.time("Links duration");

  /**
   * holds levels links gaps and pointers
   */
  const levelLinkGap: LevelLinkGap = {};
  const degreeFilter = (l: LineageLinkElement) => {
    if (levelsToPlot.length > 0) {
      if (l.target.isChildren) {
        return levelsToPlot.includes(l.target.level) && l.target.isVisible;
      }
      return levelsToPlot.includes(l.target.level);
    }
    return true;
  };

  const filteredlinks = lineage.links.filter((l: LineageLinkElement) => {
    return filter ? filter(l) : degreeFilter(l);
  });

  const links = svg
    .append("g")
    .attr("class", "links")
    .attr("data-page", page)
    .selectAll("path.link")
    .data(filteredlinks, (d) => {
      return (d as LineageLinkElement).id;
    })
    .enter();

  links
    .append("path")
    .attr("class", (d) => {
      return `link lineage-element ${
        d.source.isChildren || d.target.isChildren ? "child-link" : ""
      }`;
    })
    .attr("d", (d) => {
      return drawElbow(
        d,
        levelLinkGap,
        nodeSize,
        childrenNodeSize,
        gap,
        direction,
        lineage
      );
    })
    .attr("stroke", "var(--color-border-default)")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 0)
    .attr("id", function (d) {
      return d.id;
    })
    .attr("fill", "none");

  links
    .append("circle")
    .attr("class", "source-dot lineage-element")
    .attr("id", (d) => {
      return `source-dot-${d.id}`;
    })
    .attr("r", 6)
    .attr("cx", (d) => {
      const nodeWidth = d.source.isChildren
        ? childrenNodeSize.width
        : nodeSize.width;
      if (direction === "vertical") {
        return d.source.x + nodeWidth / 2;
      }
      return d.source.x + nodeWidth;
    })
    .attr("cy", (d) => {
      const nodeHeight = d.source.isChildren
        ? childrenNodeSize.height
        : nodeSize.height;
      if (direction === "vertical") {
        return d.source.y + nodeHeight;
      }
      return d.source.y + nodeHeight / 2;
    })
    .attr("fill", "var(--color-border-default)")
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "2px");

  links
    .append("circle")
    .attr("class", "target-dot lineage-element")
    .attr("id", (d) => {
      return `${d.id}~target-dot`;
    })
    .attr("r", 6)
    .attr("cx", (d) => {
      if (direction === "vertical") {
        return (
          d.target.x +
          (d.target.isChildren
            ? childrenNodeSize.width / 2
            : nodeSize.width / 2)
        );
      }
      return d.target.x;
    })
    .attr("cy", (d) => {
      if (direction === "vertical") {
        return d.target.y;
      }
      return (
        d.target.y +
        (d.target.isChildren
          ? childrenNodeSize.height / 2
          : nodeSize.height / 2)
      );
    })
    .attr("fill", "var(--color-border-default)")
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "2px");

  links
    .append("text")
    .attr("class", (d) => {
      return `link-arrow lineage-element ${
        d.source.isChildren || d.target.isChildren ? "child-link" : ""
      }`;
    })
    .attr("id", function (d) {
      return `${d.id}~arrow`;
    })
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "1px")
    .attr("dy", 6.5)
    .attr("dx", -0.8)
    .append("textPath")
    .attr("text-anchor", "end")

    .attr("xlink:href", function (d) {
      return `#${d.id}`;
    })
    .attr("startOffset", "100%")
    .attr("fill", "var(--color-border-default)")
    .text("▶");

  links
    .filter((l) => element.biDirectionalLinks.includes(l.id))
    .append("text")
    .attr("class", "b link-arrow lineage-element")
    .attr("id", function (d) {
      return `${d.id}~arrow-reverse`;
    })
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "1px")
    .attr("dy", 6)
    .attr("dx", 0.3)
    .append("textPath")
    .attr("text-anchor", "start")

    .attr("xlink:href", function (d) {
      return `#${d.id}`;
    })
    .attr("startOffset", "0%")
    .attr("fill", "var(--color-border-default)")
    .text("◀");

  console.timeEnd("Links duration");
}
