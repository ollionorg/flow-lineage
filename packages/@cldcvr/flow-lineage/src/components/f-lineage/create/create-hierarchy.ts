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
    childTemplateDataProxy: ProxyHandler<Record<string, any>>;
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

  Object.entries(nodes).forEach(([id, n]) => {
    if (n.templateData) {
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
      Object.entries(node.children).forEach(([id, cNode]) => {
        if (cNode.templateData) {
          cNode.templateData = new Proxy(
            cNode.templateData,
            templateHandler.childTemplateDataProxy
          );
        }
        hierarchyMeta[id] = {
          level: 1,
          ref: { id, ...cNode },
          isChildren: true,
          isLinked: true,
        };
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
