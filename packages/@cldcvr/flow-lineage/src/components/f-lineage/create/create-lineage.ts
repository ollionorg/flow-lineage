import createNodeElements from "./create-node-elements";
import {
  Lineage,
  LineageDirection,
  LineageNode,
  LineageNodeSize,
} from "./../lineage-types";
import createLinks from "./create-links";

export default function createLineage(
  data: LineageNode[],
  nodeSize: LineageNodeSize,
  padding: number,
  gap: number,
  direction: LineageDirection
): Lineage {
  /**
   * create node elements with their cordinates
   */
  const nodeElements = createNodeElements(
    data,
    nodeSize,
    padding,
    gap,
    direction
  );
  const nodeLinks = createLinks(data, nodeElements);
  return {
    nodes: nodeElements,
    links: nodeLinks,
  };
}
