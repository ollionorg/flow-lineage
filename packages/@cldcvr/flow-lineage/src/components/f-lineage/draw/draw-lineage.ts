import { DrawLineageParams } from "../lineage-types";
import drawLinks from "./draw-links";
import drawNodes from "./draw-nodes";

export default async function drawLineage(params: DrawLineageParams) {
  drawLinks(params);
  drawNodes(params);
}
