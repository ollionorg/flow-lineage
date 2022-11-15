import { html } from "lit";
import { getComputedHTML } from "../../../utils";
import { DrawLineageParams, LineageNodeElement } from "../lineage-types";
import highlightPath from "../highlight/highlight-path";

export default function drawNodes({
  lineage,
  svg,
  nodeSize,
  childrenNodeSize,
  maxChildrenHeight,
  element,
}: DrawLineageParams) {
  console.time("Nodes duration");
  const scrollBarWidth = 8;
  const maxChildrens = maxChildrenHeight / childrenNodeSize.height;
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
    .attr("id", (d) => {
      return d.id;
    })
    .attr("class", "lineage-node lineage-element")
    .on("click", (event: MouseEvent, d) => {
      event.stopPropagation();
      highlightPath(d, element);
    })
    .append("foreignObject")
    .attr("width", nodeSize.width)
    .attr("height", nodeSize.height)
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    .html((d) => {
      // @ts-ignore
      const data = d.data;
      // @ts-ignore
      const id = d.id;
      return getComputedHTML(
        html`${eval("`" + element["node-template"] + "`")}`
      );
    });

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
    .attr("data-offset", 0)
    .attr("data-max", maxChildrens)
    .attr("data-parent-id", (d) => {
      return d.id;
    })
    .attr("id", (d) => {
      return "scrollable-" + d.id;
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
        const maxY = minY + maxChildrenHeight - +scrollbar.attr("height");
        /**
         * calculate currentY of scrollbar after addiong delta
         */
        const noOdChildren = d.children?.length ?? 0;
        const childHeight = noOdChildren * childrenNodeSize.height;
        let scrollbarOffset =
          (childrenNodeSize.height * maxChildrenHeight) / childHeight;
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
          if (!d.offset) {
            d.offset = 0;
          }
          if (event.deltaY < 0) {
            d.offset -= 1;
          } else {
            d.offset += 1;
          }
          if (d.offset < 0) {
            d.offset = 0;
          }

          let start = d.offset;
          let end = d.offset + maxChildrens;

          if (d.children && end > d.children?.length) {
            start -= -1;
            end -= -1;
          }

          paginateChildrens(d, start, end);
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
      if (childHeight > maxChildrenHeight) {
        return maxChildrenHeight;
      }
      return childHeight;
    })
    .attr("width", childrenNodeSize.width);

  const paginateChildrens = (
    nData: LineageNodeElement,
    start: number,
    end: number
  ) => {
    const childNodes = lineage.nodes
      .filter((n) => n.parentId === nData.id)
      .slice(start, end);
    svg.select(`.children-container[data-parent-id="${nData.id}"]`).html("");

    const startX = nData.x;
    let startY = nData.y + nodeSize.height;
    svg
      .select(`.children-container[data-parent-id="${nData.id}"]`)
      .selectAll("g.node")
      .data(childNodes)
      .enter()
      .append("g")
      .attr("class", (d) => {
        return `child-node lineage-node lineage-element child-node-${d.parentId}`;
      })
      .attr("transform", () => {
        const translate = `translate(${startX},${startY})`;
        startY += childrenNodeSize.height;
        return translate;
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
          <f-text variant="code" size="medium" ellipsis>${nodeid}</f-text>
        </f-div>`);
      });
  };
  /**
   * Adding child nodes
   */
  svg.selectAll(".scrollable-container").each((d) => {
    const nData = d as LineageNodeElement;
    paginateChildrens(nData, 0, maxChildrens);
  });

  /**
   * adding scrollbar
   */
  svg
    .append("g")
    .attr("class", "scrollbars lineage-element")
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
      return (maxChildrenHeight / childHeight) * maxChildrenHeight;
    })
    .attr("rx", scrollBarWidth / 2)
    .attr("ry", scrollBarWidth / 2)
    .attr("transform", (d) => {
      return `translate(${d.x + nodeSize.width - scrollBarWidth},${
        d.y + nodeSize.height
      })`;
    });

  console.timeEnd("Nodes duration");
}
