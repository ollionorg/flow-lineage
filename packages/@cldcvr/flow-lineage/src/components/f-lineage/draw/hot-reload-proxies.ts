import * as d3 from "d3";
import { FLineage } from "../f-lineage";

export default function getProxies(element: FLineage) {
  const templateDataProxy = {
    get(target: Record<string, any>, key: string): any {
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], templateDataProxy);
      } else {
        return target[key];
      }
    },
    set(target: Record<string, any>, key: string, value: any) {
      const foundIt = Object.entries(element.nodes).find(([_id, n]) => {
        return JSON.stringify(n.templateData) === JSON.stringify(target);
      });
      target[key] = value;

      if (foundIt) {
        const nodeElement = element
          .getDrawParams()
          .lineage.nodes.find((n) => n.id === foundIt[0]);
        if (nodeElement) {
          d3.select(element.svg)
            .select(`#${foundIt[0]}-foreign-object`)
            .html(() => {
              return element.doTemplateHotUpdate(
                nodeElement,
                nodeElement.isChildren
              );
            });
        }
      }
      return true;
    },
  };

  const childTemplateDataProxy = {
    get(target: Record<string, any>, key: string): any {
      if (typeof target[key] === "object" && target[key] !== null) {
        return new Proxy(target[key], templateDataProxy);
      } else {
        return target[key];
      }
    },
    set(target: Record<string, any>, key: string, value: any) {
      let childId = "";
      const foundIt = Object.entries(element.nodes).find(([_id, n]) => {
        if (n.children) {
          return Boolean(
            Object.entries(n.children).find(([cid, cn]) => {
              childId = cid;
              return JSON.stringify(cn.templateData) === JSON.stringify(target);
            })
          );
        }
        return false;
      });
      target[key] = value;

      if (foundIt) {
        const nodeElement = element
          .getDrawParams()
          .lineage.nodes.find((n) => n.id === childId);

        if (nodeElement) {
          d3.select(element.svg)
            .select(`#${childId}-foreign-object`)
            .html(() => {
              return element.doTemplateHotUpdate(
                nodeElement,
                nodeElement.isChildren
              );
            });
        }
      }
      return true;
    },
  };

  return {
    templateDataProxy,
    childTemplateDataProxy,
  };
}
