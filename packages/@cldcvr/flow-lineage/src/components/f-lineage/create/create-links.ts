import {
  LineageLinkElement,
  LineageNode,
  LineageNodeElement,
} from "../lineage-types";

export default function createLinks(
  nodes: LineageNode[],
  nodeElements: LineageNodeElement[]
) {
  /**
   * array to hold all links
   */
  const linkElements: LineageLinkElement[] = [];

  /**
   * Converting array to object for better access of node elements
   */
  const nodeElementsObj = nodeElements.reduce(
    (a, v) => ({ ...a, [v.id]: v }),
    {}
  ) as Record<string, LineageNodeElement>;

  /**
   * calculate source and target of link for nodes
   * @param nodeList : node list to traverse
   */
  const computeLinks = (nodeList: LineageNode[], level: number) => {
    nodeList.forEach((node) => {
      if (node.to && node.to.length > 0) {
        const sourceNode = nodeElementsObj[node.id];

        if (sourceNode) {
          node.to.forEach((targetNode) => {
            linkElements.push({
              id: sourceNode.id + "->" + targetNode.id,
              level: level,
              source: sourceNode,
              target: nodeElementsObj[targetNode.id],
            });
            if (node.to && node.to.length > 0) {
              computeLinks(node.to, level + 1);
            }
            if (node.links && node.links.length > 0) {
              node.links.forEach((link) => {
                linkElements.push({
                  id: sourceNode.id + "->" + link.nodeid,
                  level: level,
                  source: sourceNode,
                  target: nodeElementsObj[link.nodeid],
                });
              });
            }
          });
        }
      }
    });
  };

  computeLinks(nodes, 1);
  return linkElements;
}
