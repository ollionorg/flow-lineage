import createNodeElements from "./create-node-elements";
import { CreateLineageParams, Lineage } from "./../lineage-types";
import createLinks from "./create-links";

export default function createLineage({
  data,
  nodeSize,
  childrenNodeSize,
  padding,
  gap,
  direction,
  maxChildrenHeight,
}: CreateLineageParams): Lineage {
  /**
   * create node elements with their cordinates
   */
  const nodeElements = createNodeElements(
    data,
    nodeSize,
    childrenNodeSize,
    padding,
    gap,
    direction,
    maxChildrenHeight
  );
  /**
   * create links with their repsepctive co-ordinates
   */
  const nodeLinks = createLinks(data, nodeElements);
  return {
    nodes: nodeElements,
    links: nodeLinks,
  };
}
