import {
  LevelLinkGap,
  Lineage,
  LineageDirection,
  LineageLinkElement,
  LineageNodeSize,
} from "../lineage-types";

import drawElbow from "./draw-elbow";

export default function drawLinks(
  lineage: Lineage,
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodeSize: LineageNodeSize,
  gap: number,
  direction: LineageDirection
) {
  /**
   * holds levels links gaps and pointers
   */
  const levelLinkGap: LevelLinkGap = {};

  const links = svg
    .append("g")
    .attr("class", "links")
    .selectAll("path.link")
    .data(lineage.links, (d) => {
      return (d as LineageLinkElement).id;
    })
    .enter();

  const dots = svg
    .append("g")
    .attr("class", "dots")
    .selectAll("path.dot")
    .data(lineage.links, (d) => {
      return (d as LineageLinkElement).id;
    })
    .enter();
  links
    .append("path")
    .attr("class", "link")
    .attr("d", (d) => {
      return drawElbow(d, levelLinkGap, nodeSize, gap, direction);
    })
    .attr("stroke", "var(--color-border-default)")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", 0)
    .attr("id", function (d) {
      return d.id;
    })
    .attr("fill", "none");

  dots
    .append("circle")
    .attr("class", "source-dot")
    .attr("r", 6)
    .attr("cx", (d) => {
      if (direction === "vertical") {
        return d.source.x + nodeSize.width / 2;
      }
      return d.source.x + nodeSize.width;
    })
    .attr("cy", (d) => {
      if (direction === "vertical") {
        return d.source.y + nodeSize.height;
      }
      return d.source.y + nodeSize.height / 2;
    })
    .attr("fill", "var(--color-border-default)")
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "2px");

  dots
    .append("circle")
    .attr("class", "target-dot")
    .attr("r", 6)
    .attr("cx", (d) => {
      if (direction === "vertical") {
        return d.target.x + nodeSize.width / 2;
      }
      return d.target.x;
    })
    .attr("cy", (d) => {
      if (direction === "vertical") {
        return d.target.y;
      }
      return d.target.y + nodeSize.height / 2;
    })
    .attr("fill", "var(--color-border-default)")
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "2px");

  links
    .append("text")
    .attr("class", "link-arrow")
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
}
