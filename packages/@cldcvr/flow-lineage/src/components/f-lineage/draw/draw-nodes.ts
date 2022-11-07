import { html } from "lit";
import { getComputedHTML } from "../../../utils";
import { DrawLineageParams } from "../lineage-types";

export default function drawNodes({
  lineage,
  svg,
  nodeSize,
  childrenNodeSize,
}: DrawLineageParams) {
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
    .attr("width", (d) => {
      return d.isChildren ? childrenNodeSize.width : nodeSize.width;
    })
    .attr("height", (d) => {
      return d.isChildren ? childrenNodeSize.height : nodeSize.height;
    })
    .html((d) => {
      const nodeid = d.id;
      if (!d.isChildren) {
        return getComputedHTML(html` <f-div
          state="secondary"
          width="100%"
          height="100%"
          padding="none medium"
          align="middle-left"
          variant="curved"
          gap="small"
          ${d.children ? 'border="small solid default bottom"' : ""}
        >
          <f-icon source="i-launch" size="large"></f-icon>
          <f-text variant="code" size="large">${nodeid}</f-text>
        </f-div>`);
      }
      return getComputedHTML(html` <f-div
        state="secondary"
        width="100%"
        height="100%"
        padding="none medium"
        align="middle-left"
        gap="small"
        border="small solid default bottom"
      >
        <f-icon source="i-hashtag" size="small"></f-icon>
        <f-text variant="code" size="medium">${nodeid}</f-text>
      </f-div>`);
    });
}
