import createNodeElements from "./create-node-elements";
import { Lineage, LineageNode, LineageNodeSize } from "./../lineage-types";
import createLinks from "./create-links";

export default function createLineage(
  data: LineageNode[],
  nodeSize: LineageNodeSize,
  margin: number,
  gap: number
): Lineage {
  /**
   * create node elements with their cordinates
   */
  const nodeElements = createNodeElements(data, nodeSize, margin, gap);
  const nodeLinks = createLinks(data, nodeElements);
  return {
    nodes: nodeElements,
    links: nodeLinks,
  };
}
