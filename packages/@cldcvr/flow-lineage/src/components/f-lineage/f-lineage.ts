import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-lineage.scss";
import * as d3 from "d3";
import createLineage from "./create/create-lineage";
import {
  DrawLineageParams,
  LineageData,
  LineageDirection,
  LineageNodeElement,
  LineageNodeLinks,
  LineageNodes,
  LineageNodeSize,
} from "./lineage-types";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import drawLineage from "./draw/draw-lineage";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";
import lowlightPath from "./highlight/lowlight-path";
import createHierarchy from "./create/create-hierarchy";
import { FButton, FDiv } from "@cldcvr/flow-core";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";

// Renders attribute names of parent element to textContent

@customElement("f-lineage")
export class FLineage extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), unsafeCSS(flowCoreCSS)];

  @query("svg")
  svg!: SVGSVGElement;

  @property({ reflect: true, type: String })
  direction?: LineageDirection = "horizontal";

  @property({ type: Object })
  nodes!: LineageNodes;

  @property({ type: Array })
  links!: LineageNodeLinks;

  @property({ reflect: true, type: Number })
  padding?: number = 16;

  @property({ reflect: true, type: Number })
  gap?: number = 100;

  @property({
    reflect: true,
    type: Object,
  })
  ["node-size"]?: LineageNodeSize;

  @property({
    reflect: true,
    type: String,
  })
  ["center-node"]?: string;

  @property({
    reflect: true,
    type: Number,
  })
  ["stager-load"] = 10;

  @property({
    reflect: true,
    type: Object,
  })
  ["children-node-size"]?: LineageNodeSize;

  @property({
    reflect: true,
    type: Number,
  })
  ["max-children"]?: number;

  @property({
    reflect: false,
    type: String,
  })
  ["node-template"]?: string;

  @property({
    reflect: false,
    type: String,
  })
  ["children-node-template"]?: string;

  @query("#page-number")
  pageNumberElement!: FButton;

  @query("#progress")
  progressElement!: FDiv;

  /**
   * holds maximum available level count
   */
  maxAvailableLevels = 0;

  centerNodeElement?: LineageNodeElement;

  biDirectionalLinks: string[] = [];

  private data!: LineageData;

  /**
   * holds which levels to display
   */
  levelsToPlot: number[] = [];

  /**
   * page to levels map
   */
  pageToLevels: Record<number, number[]> = {};

  private lineageDrawParams!: DrawLineageParams;

  page = 1;

  timeout!: ReturnType<typeof setTimeout>;

  getNumbersFromRange(min: number, max: number) {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }

  getDrawParams() {
    return this.lineageDrawParams;
  }

  increaseDegree() {
    const minLevel = Math.min(...this.levelsToPlot);
    const maxLevel = Math.max(...this.levelsToPlot);

    if (this.maxAvailableLevels > maxLevel) {
      this.levelsToPlot = [
        ...this.getNumbersFromRange(
          minLevel - this["stager-load"],
          minLevel - 1
        ),
        ...this.getNumbersFromRange(
          maxLevel + 1,
          maxLevel + this["stager-load"]
        ),
      ];

      this.page += 1;
      this.pageToLevels[this.page] = this.levelsToPlot;
      this.pageNumberElement.innerText = `${(
        (maxLevel * 100) /
        this.maxAvailableLevels
      ).toFixed(0)}%`;
      drawLineage({
        ...this.lineageDrawParams,
        levelsToPlot: this.levelsToPlot,
        page: this.page,
      }).then(() => {
        this.timeout = setTimeout(() => {
          this.increaseDegree();
        }, 500);
      });
    } else {
      this.dispatchReadyEvent();
      this.pageNumberElement.innerText = `100%`;
      this.progressElement.style.display = "none";
    }
  }

  dispatchReadyEvent() {
    const ready = new CustomEvent("ready", {
      detail: { ...this.data },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(ready);
  }
  decreaseDegree() {
    if (this.page > 1) {
      const pageToDelete = this.page;
      this.page -= 1;
      this.levelsToPlot = this.pageToLevels[this.page];
      this.pageNumberElement.label = `${this.page}`;
      this.shadowRoot
        ?.querySelectorAll(`[data-page="${pageToDelete}"`)
        .forEach((element) => {
          element.remove();
        });
    }
  }

  reDrawChunk(page: number, _level: number) {
    this.shadowRoot
      ?.querySelectorAll(`[data-page="${page}"`)
      .forEach((element) => {
        element.remove();
      });

    const levelsToPlot = this.pageToLevels[page];

    drawLineage({
      ...this.lineageDrawParams,
      levelsToPlot,
      page,
      filter: (link) => {
        if (link.source.isChildren && !link.source.isVisible) {
          return false;
        }
        if (link.target.isChildren && !link.target.isVisible) {
          return false;
        }
        return (
          levelsToPlot.includes(link.source.level) ||
          levelsToPlot.includes(link.target.level)
        );
      },
    });
  }

  render() {
    return html`
      ${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`)}
      <f-div
        align="middle-center"
        gap="x-small"
        padding="small"
        state="tertiary"
        variant="curved"
        width="80px"
        class="degree-selector"
        id="progress"
      >
        <f-icon source="i-tick" loading></f-icon>
        <f-text id="page-number">${this.page}%</f-text>
      </f-div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", () => this.requestUpdate());
  }
  disconnectedCallback() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    window.removeEventListener("resize", () => this.requestUpdate());
    super.disconnectedCallback();
  }
  /**
   * get width based on what parent is used
   */
  getWidth() {
    let width = 1000;
    if (this.parentElement && this.parentElement.tagName === "F-DIV") {
      if (this.parentElement.getAttribute("direction") === "row") {
        width = this.offsetWidth;
      } else {
        width = this.parentElement.offsetWidth;
      }
    } else if (this.parentElement) {
      width = this.parentElement.offsetWidth;
    }
    return width;
  }
  /**
   *  get height based on what parent is used
   */
  getHeight() {
    let height = 1000;
    if (this.parentElement && this.parentElement.tagName === "F-DIV") {
      height = this.offsetHeight;
      if (this.parentElement.getAttribute("direction") === "column") {
        height = this.offsetHeight;
      } else {
        height = this.parentElement.offsetHeight;
      }
    } else if (this.parentElement) {
      height = this.parentElement.offsetHeight;
    }
    return height;
  }
  updated() {
    console.group("Lineage");
    console.time("Total duration");

    /**
     * cleaning up svg if it has any exisitng content
     */

    const nodeSize = this["node-size"]
      ? this["node-size"]
      : { width: 200, height: 52 };

    const childrenNodeSize = this["children-node-size"]
      ? this["children-node-size"]
      : { width: 200, height: 32 };

    const padding = this.padding ?? 16;
    const gap = this.gap ?? 100;
    const direction = this.direction ?? "horizontal";
    const maxChildrens = this["max-children"] ?? 8;
    const maxChildrenHeight = maxChildrens * childrenNodeSize.height;

    this["node-template"] =
      this["node-template"] ??
      `<f-div
	  state="secondary"
	  width="100%"
	  height="100%"
	  padding="none medium"
	  align="middle-left"
	  variant="curved"
	  gap="small"
	  \${node.children && !node.hideChildren ? 'border="small solid default bottom"' : ""}
	> <f-text variant="code" size="large" ellipsis>\${node.id}</f-text>
	  \${node.childrenToggle}
	</f-div>`;
    this["children-node-template"] =
      this["children-node-template"] ??
      `<f-div
	  state="secondary"
	  width="100%"
	  height="100%"
	  padding="none medium"
	  align="middle-left"
	  variant="curved"
	  gap="small"
	  border="small solid default bottom"
	> <f-text variant="code" size="large" ellipsis>\${node.id}</f-text>
	</f-div>`;
    this.svg.innerHTML = ``;

    if (this.links && this.links.length > 0) {
      /**
       * Creates hierarchy based on nodes and links provided by user
       */
      const { data, biDirectionalLinks } = createHierarchy(
        this.links,
        this.nodes
      );
      this.data = data;
      // holds birectional links
      this.biDirectionalLinks = biDirectionalLinks;
    }
    if (this.data && this.data.length > 0) {
      /**
       * Lineage with nodes , links and gap parameters
       */
      const lineage = createLineage({
        data: this.data,
        nodeSize,
        childrenNodeSize,
        padding,
        gap,
        direction,
        maxChildrenHeight,
        links: this.links,
        biDirectionalLinks: this.biDirectionalLinks,
      });

      this.centerNodeElement = lineage.nodes.find(
        (n) => n.id === this.data[0].id
      );

      if (this["center-node"]) {
        this.centerNodeElement = lineage.nodes.find(
          (n) => n.id === this["center-node"]
        );
      }

      if (this.centerNodeElement) {
        this.levelsToPlot = [
          ...this.getNumbersFromRange(
            this.centerNodeElement.level - this["stager-load"],
            this.centerNodeElement.level
          ),
          ...this.getNumbersFromRange(
            this.centerNodeElement.level + 1,
            this.centerNodeElement.level + this["stager-load"]
          ),
        ];

        this.pageToLevels[1] = this.levelsToPlot;
      } else {
        console.warn(`center-node ${this["center-node"]} not found!`);
      }

      this.maxAvailableLevels = lineage.nodes.reduce(
        (preValue, currentNode) => {
          if (currentNode.level > preValue) {
            preValue = currentNode.level;
          }
          return preValue;
        },
        0
      );

      /**
       * main svg element: setting height and width
       */
      const svgElement = d3
        .select(this.svg)
        .attr("class", "lineage-svg")
        .attr("width", this.getWidth())
        .attr("height", this.getHeight());
      /**
       * Inner `g` to hold chart to handel zoom in/ zoom out
       */
      const lineageContainer = svgElement.append("g");

      this.lineageDrawParams = {
        lineage,
        svg: lineageContainer,
        nodeSize,
        childrenNodeSize,
        gap,
        direction,
        maxChildrenHeight,
        element: this,
        levelsToPlot: this.levelsToPlot,
        page: this.page,
      };
      drawLineage(this.lineageDrawParams);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleZoom = (e: any) => {
        lineageContainer.attr("transform", e.transform);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const zoom = d3
        .zoom()
        .scaleExtent([0.3, 4])
        .on("zoom", handleZoom) as any;

      svgElement.call(zoom).on("dblclick.zoom", null);

      svgElement.on("click", (event: MouseEvent) => {
        event.stopPropagation();
        lowlightPath(this);
      });
      this.timeout = setTimeout(() => {
        this.increaseDegree();
      }, 1000);
    } else {
      //this.pageNumberElement.innerText = `No data to display`;
      this.progressElement.setAttribute("width", "500px");
      this.progressElement.innerHTML = "No data to display";
    }

    console.timeEnd("Total duration");
    console.groupEnd();
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-lineage": FLineage;
  }
}
