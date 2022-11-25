import {
  LineageData,
  LineageNode,
  LineageNodeLinks,
  LineageNodes,
} from "../lineage-types";

export default function createHierarchy(
  links: LineageNodeLinks,
  nodes: LineageNodes
) {
  const hierarchyMeta: Record<
    string,
    {
      level: number;
      ref: LineageNode;
      isChildren?: boolean;
      isLinked?: boolean;
    }
  > = {};

  const data: LineageData = [];

  Object.entries(nodes).forEach(([id, n]) => {
    const node = {
      id,
      ...n,
    };
    hierarchyMeta[id] = {
      level: 1,
      ref: node,
    };
    data.push(node);
    if (node.children && node.children.length > 0) {
      node.children.forEach((cNode) => {
        hierarchyMeta[cNode.id] = {
          level: 1,
          ref: cNode,
          isChildren: true,
          isLinked: true,
        };
      });
    }
  });

  links.forEach((link) => {
    const to = hierarchyMeta[link.to].ref;
    const from = hierarchyMeta[link.from].ref;

    if (!hierarchyMeta[link.to].isLinked && data.length > 1) {
      if (!from.to) {
        from.to = [];
      }

      from.to.push(to);
      const idxToRemove = data.findIndex((n) => n.id === link.to);

      data.splice(idxToRemove, 1);

      hierarchyMeta[link.to].level = hierarchyMeta[link.from].level + 1;
      hierarchyMeta[link.to].isLinked = true;
    } else {
      if (!from.links) {
        from.links = [];
      }

      from.links.push({
        nodeid: to.id,
      });
    }
  });
  return data;
}
