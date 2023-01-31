import { getChildrenArray, isEmpty } from "./../../../utils";
import {
  LineageData,
  LineageNode,
  LineageNodeLinks,
  LineageNodes,
} from "../lineage-types";

export default function createHierarchy(
  links: LineageNodeLinks,
  nodes: LineageNodes,
  templateHandler: {
    templateDataProxy: ProxyHandler<Record<string, any>>;
    nodeDataProxy: ProxyHandler<Record<string, any>>;
  }
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

  Object.keys(nodes).forEach((id) => {
    nodes[id] = new Proxy(nodes[id], templateHandler.nodeDataProxy);
    const n = nodes[id];
    n.__id__ = id;
    if (n.templateData) {
      n.templateData.__id__ = id;
      n.templateData = new Proxy(
        n.templateData,
        templateHandler.templateDataProxy
      );
    }
    const node = {
      id,
      ...n,
    };
    hierarchyMeta[id] = {
      level: 1,
      ref: node,
    };
    data.push(node);
    if (node.children && !isEmpty(node.children)) {
      Object.keys(node.children).forEach((id) => {
        if (node.children) {
          node.children[id] = new Proxy(
            node.children[id],
            templateHandler.nodeDataProxy
          );
          const cNode = node.children[id];
          cNode.__id__ = id;
          if (cNode.templateData) {
            cNode.templateData.__id__ = id;
            cNode.templateData = new Proxy(
              cNode.templateData,
              templateHandler.templateDataProxy
            );
          }
          hierarchyMeta[id] = {
            level: 1,
            ref: { id, ...cNode },
            isChildren: true,
            isLinked: true,
          };
        }
      });
    }
  });

  /**
   * iterate through link and create hierarchy
   */
  links.forEach((link) => {
    if (addedLinks.findIndex((l) => l === `${link.to}->${link.from}`) === -1) {
      const to = hierarchyMeta[link.to]?.ref;
      const from = hierarchyMeta[link.from]?.ref;
      /**
       * check if node reference present
       */
      if (from && to) {
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

          getChildrenArray(to.children)?.forEach((cNode) => {
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
            nodeid: to.id as string,
          });
        }

        addedLinks.push(`${link.from}->${link.to}`);
      }
    } else {
      biDirectionalLinks.push(`${link.to}->${link.from}`);
    }
  });
  return { data, biDirectionalLinks };
}
