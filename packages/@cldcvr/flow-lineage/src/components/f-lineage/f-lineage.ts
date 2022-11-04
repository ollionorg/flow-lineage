import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-lineage.scss";
import * as d3 from "d3";
import createLineage from "./create/create-lineage";
import {
  LineageData,
  LineageDirection,
  LineageNodeSize,
} from "./lineage-types";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import drawLineage from "./draw/draw-lineage";
import flowCoreCSS from "@cldcvr/flow-core/dist/style.css";

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

  @property({ type: Array })
  data!: LineageData;

  @property({ reflect: true, type: Number })
  padding?: number = 16;

  @property({ reflect: true, type: Number })
  gap?: number = 100;

  @property({
    reflect: true,
    type: Object,
  })
  ["node-size"]!: LineageNodeSize;

  render() {
    return html`${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`)}`;
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
    /**
     * cleaning up svg if it has any exisitng content
     */
    this.svg.innerHTML = ``;

    const nodeSize = this["node-size"]
      ? this["node-size"]
      : { width: 200, height: 60 };

    const padding = this.padding ?? 16;
    const gap = this.gap ?? 100;

    if (this.data && this.data.length > 0) {
      const lineage = createLineage(
        this.data,
        nodeSize,
        padding,
        gap,
        this.direction ?? "horizontal"
      );

      const svgElement = d3
        .select(this.svg)
        .attr("class", "lineage-svg")
        .attr("width", this.offsetWidth)
        .attr("height", this.offsetHeight);
      const lineageContainer = svgElement.append("g");
      drawLineage(
        lineage,
        lineageContainer,
        nodeSize,
        gap,
        this.direction ?? "horizontal"
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handleZoom = (e: any) => {
        lineageContainer.attr("transform", e.transform);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const zoom = d3
        .zoom()
        .scaleExtent([0.3, 4])
        .on("zoom", handleZoom) as any;

      svgElement.call(zoom);
    }
  }
}
