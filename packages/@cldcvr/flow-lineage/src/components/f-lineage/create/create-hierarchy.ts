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

  const addedLinks: string[] = [];
  const biDirectionalLinks: string[] = [];

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
    if (addedLinks.findIndex((l) => l === `${link.to}->${link.from}`) === -1) {
      const to = hierarchyMeta[link.to].ref;
      const from = hierarchyMeta[link.from].ref;

      /**
       * Rare backward connection check when any grand child connecting to root
       */
      const inSameHierarchy =
        hierarchyMeta[link.to].level === 1
          ? JSON.stringify(to).includes(JSON.stringify(from))
          : false;

      /**
       * if destination connection is not yet linked
       */
      if (
        !hierarchyMeta[link.to].isLinked &&
        !inSameHierarchy &&
        data.length > 1 &&
        !hierarchyMeta[link.from].isChildren
      ) {
        if (!from.to) {
          from.to = [];
        }

        from.to.push(to);
        const idxToRemove = data.findIndex((n) => n.id === link.to);

        data.splice(idxToRemove, 1);

        hierarchyMeta[link.to].level = hierarchyMeta[link.from].level + 1;

        to.children?.forEach((cNode) => {
          hierarchyMeta[cNode.id].level = hierarchyMeta[link.to].level;
        });
        hierarchyMeta[link.to].isLinked = true;
      } else {
        /**
         * Add as an additional links if it is not in hierarchy
         */
        if (!from.links) {
          from.links = [];
        }

        from.links.push({
          nodeid: to.id,
        });
      }

      addedLinks.push(`${link.from}->${link.to}`);
    } else {
      biDirectionalLinks.push(`${link.to}->${link.from}`);
    }
  });
  return { data, biDirectionalLinks };
}
