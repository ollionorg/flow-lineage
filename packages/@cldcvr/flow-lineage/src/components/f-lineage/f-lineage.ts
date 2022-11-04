import { html, unsafeCSS, LitElement } from "lit";
import { customElement, query } from "lit/decorators.js";
import eleStyle from "./f-lineage.scss";
import * as d3 from "d3";
import createLineage from "./create/create-lineage";
import { LineageNode, LineageNodeSize } from "./lineage-types";
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
    this.svg.innerHTML = ``;
    const lineageData: LineageNode[] = [
      {
        id: "level1_1",
        to: [
          {
            id: "level1_2_1",
          },
          {
            id: "level1_2_2",
            to: [
              {
                id: "level1_3_1",
                to: [
                  {
                    id: "level1_4_1",
                  },
                  {
                    id: "level1_4_2",
                  },
                ],
              },
            ],
          },
          {
            id: "level1_2_3",
          },
          {
            id: "level1_2_4",
          },
          {
            id: "level1_2_5",
          },
          {
            id: "level1_2_6",
          },
        ],
      },
      {
        id: "level1_2",
        to: [
          {
            id: "level2_2_1",
          },
          {
            id: "level2_2_2",
            to: [
              {
                id: "level2_3_1",
                to: [
                  {
                    id: "level2_4_1",
                  },
                ],
              },
            ],
          },
          {
            id: "level2_2_3",
            to: [
              {
                id: "node1",
              },
            ],
          },
        ],
      },
      {
        id: "level1_3",
        to: [
          {
            id: "level3_2_1",
          },
          {
            id: "level3_2_2",
          },
        ],
      },
    ];
    const nodeSize: LineageNodeSize = { width: 200, height: 60 };
    const margin = 16;
    const gap = 100;
    const lineage = createLineage(lineageData, nodeSize, margin, gap);

    console.log(lineage);

    const svgElement = d3
      .select(this.svg)
      .attr("class", "lineage-svg")
      .attr("width", this.offsetWidth)
      .attr("height", this.offsetHeight);

    drawLineage(lineage, svgElement, nodeSize, gap);
  }
}
