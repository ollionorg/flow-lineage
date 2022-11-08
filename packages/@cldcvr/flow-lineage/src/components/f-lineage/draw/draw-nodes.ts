import * as d3 from "d3";
import { html } from "lit";
import { getComputedHTML } from "../../../utils";
import { DrawLineageParams, LineageNodeElement } from "../lineage-types";

export default function drawNodes({
  lineage,
  svg,
  nodeSize,
  childrenNodeSize,
}: DrawLineageParams) {
  const scrollBarWidth = 8;
  const parentNodes = svg
    .append("g")
    .attr("class", "nodes")
    .selectAll("g.node")
    .data(lineage.nodes.filter((n) => !n.isChildren))
    .enter();
  parentNodes
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
        padding="none medium"
        align="middle-left"
        variant="curved"
        gap="small"
        ${d.children ? 'border="small solid default bottom"' : ""}
      >
        <f-icon source="i-launch" size="large"></f-icon>
        <f-div direction="column" height="hug-content" align="middle-left">
          <f-text variant="code" size="large">${nodeid}</f-text>
          <f-text variant="code" size="small">x: ${d.x}, y: ${d.y}</f-text>
        </f-div>
      </f-div>`);
    });

  /**
   *
   * Adding clipPath for scrolling
   */
  svg
    .append("g")
    .attr("class", "scrollable-clip-paths")
    .selectAll("g")
    .data(lineage.nodes.filter((n) => n.hasScrollbaleChildren))
    .enter()
    .append("clipPath")
    .attr("id", (d) => {
      return "clip-path-" + d.id;
    })
    .append("rect")
    .attr("transform", (d) => {
      return `translate(${d.x},${d.y + nodeSize.height})`;
    })
    .attr("height", 256)
    .attr("width", childrenNodeSize.width);

  /**
   * Adding scrollable containers with rect
   *  */
  svg
    .append("g")
    .attr("class", "scrollable-children")
    .selectAll("g")
    .data(lineage.nodes.filter((n) => n.children && n.children.length > 0))
    .enter()
    .append("g")
    .attr("class", "children-container")
    .attr("data-parent-id", (d) => {
      return d.id;
    })
    .attr("clip-path", (d) => {
      return `url(#clip-path-${d.id})`;
    })
    .on("wheel", (e, d) => {
      if (d.hasScrollbaleChildren) {
        const event = e as WheelEvent;
        /**
         * stop progation to avoid zoom
         */
        event.stopPropagation();
        /**
         * get scrollbar associated with this block
         */
        const scrollbar = svg.select("#scrollbar-" + d.id);
        /**
         * get current position
         */
        const tranform = scrollbar.attr("transform");
        /**
         * split values
         */
        const translate = tranform
          .substring(tranform.indexOf("(") + 1, tranform.indexOf(")"))
          .split(",");
        /**
         * calculate minY of scrollbar
         */
        const minY = d.y + nodeSize.height;
        /**
         * calculate maxY of scrollbar
         */
        const maxY = minY + 256 - +scrollbar.attr("height");
        /**
         * calculate currentY of scrollbar after addiong delta
         */
        const noOdChildren = d.children?.length ?? 0;
        const childHeight = noOdChildren * childrenNodeSize.height;
        let scrollbarOffset = (childrenNodeSize.height * 256) / childHeight;
        if (event.deltaY < 0) {
          scrollbarOffset *= -1;
        }
        /**
         * to know if delta has to apply on nodes
         */
        let applyDelta = true;
        let currentY = +translate[1] + scrollbarOffset;
        if (currentY < minY) {
          currentY = minY;
          applyDelta = false;
        }
        if (currentY > maxY) {
          currentY = maxY;
          applyDelta = false;
        }
        scrollbar.attr("transform", () => {
          return `translate(${translate[0]},${currentY})`;
        });

        if (applyDelta) {
          svg
            .selectAll(`.child-node[data-parent-id="${d.id}"]`)
            .each((_d, idx, nodeList) => {
              const node = d3.select(nodeList[idx] as unknown as string);
              if (node) {
                const nodeTransform = node.attr("transform");
                const [x, y] = nodeTransform
                  .substring(
                    nodeTransform.indexOf("(") + 1,
                    nodeTransform.indexOf(")")
                  )
                  .split(",");
                let scrollOffset = childrenNodeSize.height;
                if (event.deltaY < 0) {
                  scrollOffset *= -1;
                }
                node.attr("transform", () => {
                  return `translate(${x},${+y - scrollOffset})`;
                });
              }
            });
        }
      }
    })
    .append("rect")
    .attr("class", "scrollable-container")
    .attr("opacity", 0)
    .attr("transform", (d) => {
      return `translate(${d.x},${d.y + nodeSize.height})`;
    })
    .attr("height", (d) => {
      const noOdChildren = d.children?.length ?? 0;
      const childHeight = noOdChildren * childrenNodeSize.height;
      if (childHeight > 256) {
        return 256;
      }
      return childHeight;
    })
    .attr("width", childrenNodeSize.width);

  /**
   * Adding child nodes
   */
  svg.selectAll(".scrollable-container").each((d) => {
    const nData = d as LineageNodeElement;
    const childNodes = lineage.nodes.filter((n) => n.parentId === nData.id);
    svg
      .select(`.children-container[data-parent-id="${nData.id}"]`)
      .selectAll("g.node")
      .data(childNodes)
      .enter()
      .append("g")
      .attr("class", "child-node")
      .attr("transform", (d) => {
        return `translate(${d.x},${d.y})`;
      })
      .attr("data-parent-id", (d) => {
        return d.parentId ?? "";
      })
      .append("foreignObject")
      .attr("width", childrenNodeSize.width)
      .attr("height", childrenNodeSize.height)
      .html((d) => {
        const nodeid = d.id;

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
  });

  /**
   * adding scrollbar
   */
  svg
    .append("g")
    .attr("class", "scrollbars")
    .selectAll("g")
    .data(lineage.nodes.filter((n) => n.hasScrollbaleChildren))
    .enter()
    .append("rect")
    .attr("id", (d) => {
      return "scrollbar-" + d.id;
    })
    .attr("width", scrollBarWidth)
    .attr("height", (d) => {
      const noOdChildren = d.children?.length ?? 0;
      const childHeight = noOdChildren * childrenNodeSize.height;
      return (256 / childHeight) * 256;
    })
    .attr("rx", scrollBarWidth / 2)
    .attr("ry", scrollBarWidth / 2)
    .attr("transform", (d) => {
      return `translate(${d.x + nodeSize.width - scrollBarWidth},${
        d.y + nodeSize.height
      })`;
    });
}
