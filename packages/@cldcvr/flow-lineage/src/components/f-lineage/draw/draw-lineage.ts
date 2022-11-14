import { DrawLineageParams } from "../lineage-types";
import drawLinks from "./draw-links";
import drawNodes from "./draw-nodes";

export default function drawLineage(params: DrawLineageParams) {
  drawNodes(params);
  drawLinks(params);
}
