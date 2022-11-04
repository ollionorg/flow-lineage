import { Lineage, LineageLinkElement, LineageNodeSize } from "../lineage-types";

export default function drawLinks(
  lineage: Lineage,
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  nodeSize: LineageNodeSize,
  gap: number
) {
  /**
   * holds levels links gaps and pointers
   */
  const levelLinkGap: Record<
    number,
    { linkgap: number; nodeLinkGap: Record<string, number> }
  > = {};

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
  const elbow = (d: LineageLinkElement) => {
    const xoffset = nodeSize.width + 4;
    const yoffset = nodeSize.height / 2;
    const sx = d.source.x + xoffset;
    const sy = d.source.y + yoffset;

    const dy = d.target.y + yoffset;
    const dx = d.target.x - 4;

    const midX = sx + gap * getLinkGap(d.level, d.source.id);

    if (dy > sy) {
      /**
       * if connection moves in downward direction
       */
      const endArcRadius = dx - midX;
      const startArcRadius = midX - sx;
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
    } else {
      /**
       * if connection moves in upward direction
       */
      const startArcRadius = midX - sx;
      const endArcRadius = dx - midX;
      return `M ${sx} ${sy}
	L ${
    midX - startArcRadius
  } ${sy} a${startArcRadius},${startArcRadius} 0 0 0 ${startArcRadius},${-startArcRadius} L ${midX} ${
        dy + endArcRadius
      } a${endArcRadius},${endArcRadius} 0 0 1 ${endArcRadius},${-endArcRadius} L ${dx} ${dy}`;
    }
  };

  const links = svg
    .append("g")
    .attr("class", "links")
    .selectAll("path.link")
    .data(lineage.links, (d) => {
      return (d as LineageLinkElement).id;
    })
    .enter();

  links
    .append("path")
    .attr("class", "link")
    .attr("d", (d) => {
      return elbow(d);
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
    .attr("class", "source-dot")
    .attr("r", 6)
    .attr("cx", (d) => {
      return d.source.x + nodeSize.width;
    })
    .attr("cy", (d) => {
      return d.source.y + nodeSize.height / 2;
    })
    .attr("fill", "var(--color-border-default)")
    .attr("stroke", "var(--color-surface-default)")
    .attr("stroke-width", "2px");

  links
    .append("circle")
    .attr("class", "source-dot")
    .attr("r", 6)
    .attr("cx", (d) => {
      return d.target.x;
    })
    .attr("cy", (d) => {
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
