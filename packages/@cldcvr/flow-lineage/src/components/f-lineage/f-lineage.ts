import { html, unsafeCSS, LitElement } from "lit";
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
import { FButton } from "@cldcvr/flow-core";
// Renders attribute names of parent element to textContent

@customElement("f-lineage")
export class FLineage extends LitElement {
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
  degree = 1;

  @property({
    reflect: true,
    type: Object,
  })
  ["children-node-size"]?: LineageNodeSize;

  @property({
    reflect: true,
    type: Object,
  })
  ["max-childrens"]?: number;

  @property({
    reflect: false,
    type: Object,
  })
  ["node-template"]?: string;

  @property({
    reflect: false,
    type: Object,
  })
  ["children-node-template"]?: string;

  @query("#page-number")
  pageNumberElement!: FButton;

  centerNodeElement?: LineageNodeElement;

  biDirectionalLinks: string[] = [];

  private data!: LineageData;

  /**
   * holds which levels to display
   */
  levelsToPlot: number[] = [];

  private lineageDrawParams!: DrawLineageParams;

  page = 1;

  /**
   * holds maximum available level count
   */
  maxAvailableLevels = 0;

  getNumbersFromRange(min: number, max: number) {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }

  increaseDegree() {
    const minLevel = Math.min(...this.levelsToPlot);
    const maxLevel = Math.max(...this.levelsToPlot);

    this.levelsToPlot = [
      ...this.getNumbersFromRange(minLevel - this.degree, minLevel - 1),
      ...this.getNumbersFromRange(maxLevel + 1, maxLevel + this.degree),
    ];

    this.page += 1;
    this.pageNumberElement.label = `${this.page}`;
    drawLineage(this.lineageDrawParams);
  }
  decreaseDegree() {
    const minLevel = Math.min(...this.levelsToPlot);
    const maxLevel = Math.max(...this.levelsToPlot);

    this.levelsToPlot = [
      ...this.getNumbersFromRange(
        minLevel - this.degree - this.degree,
        minLevel - this.degree
      ),
      ...this.getNumbersFromRange(
        minLevel - this.degree - this.degree,
        minLevel - this.degree
      ),
    ];
    this.levelsToPlot = [minLevel + 1, maxLevel - 1];
    this.shadowRoot
      ?.querySelectorAll(`[data-page="${this.page}"`)
      .forEach((element) => {
        element.remove();
      });
    this.page -= 1;
    this.pageNumberElement.label = `${this.page}`;
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
        direction="column"
      >
        <f-icon-button
          icon="i-plus"
          type="packed"
          @click=${this.increaseDegree}
        ></f-icon-button>

        <f-button
          id="page-number"
          .label=${`${this.page}`}
          variant="round"
          size="small"
          state="neutral"
        ></f-button>
        <f-icon-button
          icon="i-minus"
          type="packed"
          @click=${this.decreaseDegree}
        ></f-icon-button>
      </f-div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", () => this.requestUpdate());
  }
  disconnectedCallback() {
    window.removeEventListener("resize", () => this.requestUpdate());
    super.disconnectedCallback();
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
    const maxChildrens = this["max-childrens"] ?? 8;
    const maxChildrenHeight = maxChildrens * childrenNodeSize.height;

    this["node-template"] =
      this["node-template"] ?? "<f-text ellipsis>${node.id}</f-text>";
    this["children-node-template"] =
      this["children-node-template"] ?? "<f-text ellipsis>${node.id}</f-text>";
    this.svg.innerHTML = ``;

    if (this.links && this.links.length > 0) {
      const { data, biDirectionalLinks } = createHierarchy(
        this.links,
        this.nodes
      );
      this.data = data;
      this.biDirectionalLinks = biDirectionalLinks;
    }
    if (this.data && this.data.length > 0) {
      const lineage = createLineage({
        data: this.data,
        nodeSize,
        childrenNodeSize,
        padding,
        gap,
        direction,
        maxChildrenHeight,
      });

      this.centerNodeElement = lineage.nodes.find(
        (n) => n.id === this.data[0].id
      );

      if (this["center-node"]) {
        this.centerNodeElement = lineage.nodes.find(
          (n) => n.id === this["center-node"]
        );
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

      if (this.centerNodeElement) {
        this.levelsToPlot = [
          ...this.getNumbersFromRange(
            this.centerNodeElement.level - this.degree,
            this.centerNodeElement.level
          ),
          ...this.getNumbersFromRange(
            this.centerNodeElement.level + 1,
            this.centerNodeElement.level + this.degree
          ),
        ];
        console.log("levels to plot", this.levelsToPlot);
      } else {
        console.warn(`center-node ${this["center-node"]} not found!`);
      }

      /**
       * main svg element: setting height and width
       */
      const svgElement = d3
        .select(this.svg)
        .attr("class", "lineage-svg")
        .attr("width", this.offsetWidth)
        .attr("height", this.offsetHeight);
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
    }

    console.timeEnd("Total duration");
    console.groupEnd();
  }
}
