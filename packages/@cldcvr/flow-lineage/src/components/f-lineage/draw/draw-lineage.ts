import { Lineage, LineageNodeSize } from "../lineage-types";
import drawLinks from "./draw-links";
import drawNodes from "./draw-nodes";

export default function drawLineage(
  lineage: Lineage,
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  nodeSize: LineageNodeSize,
  gap: number
) {
  drawNodes(lineage, svg, nodeSize);
  drawLinks(lineage, svg, nodeSize, gap);
}
