import { html } from "lit";
import { getComputedHTML } from "../../../utils";
import { Lineage, LineageNodeSize } from "../lineage-types";

export default function drawNodes(
  lineage: Lineage,
  svg: d3.Selection<SVGGElement, unknown, null, undefined>,
  nodeSize: LineageNodeSize
) {
  svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("g.node")
    .data(lineage.nodes)
    .enter()
    .append("g")
    .attr("transform", (d) => {
      return `translate(${d.x},${d.y})`;
    })
    .append("foreignObject")
    .attr("width", nodeSize.width)
    .attr("height", nodeSize.height)
    .html((d) => {
      const nodeid = d.id;

      return getComputedHTML(html` <f-div
        state="secondary"
        width="100%"
        height="100%"
        padding="medium"
        align="middle-left"
        variant="curved"
        gap="small"
      >
        <f-icon source="i-launch" size="large"></f-icon>
        <f-text variant="code" size="large">${nodeid}</f-text>
      </f-div>`);
    });
}
