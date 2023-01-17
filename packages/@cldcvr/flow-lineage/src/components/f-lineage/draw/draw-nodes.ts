import { html } from "lit";
import { getChildCount, getComputedHTML, isEmpty } from "../../../utils";
import { DrawLineageParams, LineageNodeElement } from "../lineage-types";
import highlightPath from "../highlight/highlight-path";
import removeLinks from "./remove-links";
import drawLinks from "./draw-links";
// import * as d3 from "d3";

export default function drawNodes(params: DrawLineageParams) {
  console.time("Nodes duration");
  const {
    lineage,
    svg,
    nodeSize,
    childrenNodeSize,
    maxChildrenHeight,
    element,
    levelsToPlot,
    page,
  } = params;
  const scrollBarWidth = 8;
  const maxChildrens = maxChildrenHeight / childrenNodeSize.height;
  const degreeFilter = (n: LineageNodeElement) => {
    if (levelsToPlot.length > 0) {
      return levelsToPlot.includes(n.level);
    }
    return true;
  };

  const parentNodesMeta = lineage.nodes.filter(
    (n) => !n.isChildren && degreeFilter(n)
  );
  const parentNodes = svg
    .append("g")
    .attr("class", "nodes")
    .attr("data-page", page)
    .selectAll("g.node")
    .data(parentNodesMeta)
    .enter();
  parentNodes
    .append("g")
    .attr("transform", (d) => {
      return `translate(${d.x},${d.y})`;
    })
    .attr("id", (d) => {
      return d.id as string;
    })
    .attr("class", "lineage-node lineage-element")
    .on("click", (event: MouseEvent, d) => {
      event.stopPropagation();
      highlightPath(d, element);
      if (d.click) {
        d.click(event, d);
      }
    })
    .on("contextmenu", (event: MouseEvent, d) => {
      if (d.rightClick) {
        event.stopPropagation();
        event.preventDefault();
        d.rightClick(event, d);
      }
    })
    .append("foreignObject")
    .attr("class", (d) => {
      if (element.centerNodeElement && d.id === element.centerNodeElement.id) {
        return "center-node";
      }
      return "";
    })
    .attr("width", nodeSize.width)
    .attr("height", nodeSize.height)
    .on("click", function (event: MouseEvent, d) {
      const toggleElement = event
        .composedPath()
        .find((el) =>
          (el as HTMLElement).classList?.contains("children-toggle")
        );

      if (toggleElement) {
        event.stopPropagation();
        d.hideChildren = !d.hideChildren;

        const allChildNodes = lineage.nodes.filter((n) => n.parentId === d.id);
        const childIds = allChildNodes.map((c) => c.id);
        if (d.childrenYMax) {
          let childHeight = d.childrenYMax - (d.y + nodeSize.height);

          const nodesToUpdate = lineage.nodes.filter(
            (n) => n.level === d.level && n.y > d.y && !childIds.includes(n.id)
          );

          if (childHeight > maxChildrenHeight) {
            childHeight = maxChildrenHeight;
          }
          nodesToUpdate.forEach((n) => {
            if (!d.hideChildren) {
              n.y += childHeight;
            } else {
              n.y -= childHeight;
            }
          });

          removeLinks(nodesToUpdate, element);
        }

        allChildNodes.forEach((cn) => {
          cn.isVisible = false;
        });

        removeLinks(allChildNodes, element);
        const pageNo = this.parentElement?.parentElement?.dataset.page ?? 0;
        element.reDrawChunk(+pageNo, d.level);
      }
    })
    /* eslint-disable @typescript-eslint/no-unused-vars */
    /* eslint-disable @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    .html((node) => {
      if (node.children) {
        const iconDirection = node.hideChildren ? "down" : "up";
        node.childrenToggle = `<f-icon-button type="transparent" state="inherit" icon="i-chevron-${iconDirection}" class="children-toggle" size="x-small"></f-icon>`;
      } else {
        node.childrenToggle = "";
      }
      if (node.nodeTemplate) {
        return getComputedHTML(html`${eval("`" + node.nodeTemplate + "`")}`);
      } else {
        return getComputedHTML(
          html`${eval("`" + element["node-template"] + "`")}`
        );
      }
    });

  /**
   * Adding scrollable containers with rect
   *  */
  svg
    .append("g")
    .attr("class", "scrollable-children")
    .attr("data-page", page)
    .selectAll("g")
    .data(
      lineage.nodes.filter(
        (n) =>
          n.children &&
          !n.hideChildren &&
          !isEmpty(n.children) &&
          degreeFilter(n)
      )
    )
    .enter()
    .append("g")
    .attr("class", "children-container")
    .attr("data-parent-id", (d) => {
      return d.id as string;
    })
    .attr("data-offset", 0)
    .attr("data-max", maxChildrens)
    .attr("data-parent-id", (d) => {
      return d.id as string;
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
        const noOdChildren = getChildCount(d.children);
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

          if (d.children && end > noOdChildren) {
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
      const noOdChildren = getChildCount(d.children);
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
    // console.log("In paginateChildrens");
    const allChildNodes = lineage.nodes.filter((n) => n.parentId === nData.id);
    allChildNodes.forEach((cn) => {
      cn.isVisible = false;
    });
    const childNodes = allChildNodes.slice(start, end);
    childNodes.forEach((cn) => {
      cn.isVisible = true;
    });

    svg.select(`.children-container[data-parent-id="${nData.id}"]`).html("");
    removeLinks(allChildNodes, element);
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
      .attr("data-page", page)
      .attr("id", (d) => {
        return d.id as string;
      })
      .attr("transform", (d) => {
        d.x = startX;
        d.y = startY;
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
      .on("click", (event: MouseEvent, d) => {
        event.stopPropagation();
        highlightPath(d, element);
        if (d.click) {
          d.click(event, d);
        }
      })
      .on("contextmenu", (event: MouseEvent, d) => {
        if (d.rightClick) {
          event.stopPropagation();
          event.preventDefault();
          d.rightClick(event, d);
        }
      })
      //@ts-ignore
      .html((node) => {
        if (node.nodeTemplate) {
          return getComputedHTML(html`${eval("`" + node.nodeTemplate + "`")}`);
        } else {
          return getComputedHTML(
            html`${eval("`" + element["children-node-template"] + "`")}`
          );
        }
      });

    drawLinks({
      ...params,
      filter: (link) => {
        const sourceLink = childNodes.find((c) => {
          const targetElement = element.shadowRoot?.querySelector(
            `#${link.target.id}`
          );

          return c.id === link.source.id && targetElement;
        });

        const targetLink = childNodes.find((c) => {
          const sourceElement = element.shadowRoot?.querySelector(
            `#${link.source.id}`
          );
          return c.id === link.target.id && sourceElement;
        });

        return sourceLink !== undefined || targetLink !== undefined;
      },
      levelsToPlot: [nData.level],
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
    .attr("data-page", page)
    .selectAll("g")
    .data(
      lineage.nodes.filter(
        (n) => n.hasScrollbaleChildren && !n.hideChildren && degreeFilter(n)
      )
    )
    .enter()
    .append("rect")
    .attr("id", (d) => {
      return "scrollbar-" + d.id;
    })
    .attr("width", scrollBarWidth)
    .attr("height", (d) => {
      const noOdChildren = getChildCount(d.children);
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
