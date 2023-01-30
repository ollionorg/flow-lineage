import * as d3 from "d3";
import { FLineage } from "../f-lineage";

export default function getProxies(element: FLineage) {
  /**
   * whenever property of templateData updated then it will be trapped here for update
   */
  const templateDataProxy = {
    set(target: Record<string, any>, key: string, value: any) {
      target[key] = value;

      const nodeElement = element
        .getDrawParams()
        .lineage.nodes.find((n) => n.id === target.__id__);
      if (nodeElement) {
        d3.select(element.svg)
          .select(`#${target.__id__}-foreign-object`)
          .html(() => {
            return element.doTemplateHotUpdate(
              nodeElement,
              nodeElement.isChildren
            );
          });
      }

      return true;
    },
  };

  /**
   * whenever new templateData assigned then it will be trapped here for update
   */
  const nodeDataProxy = {
    set(target: Record<string, any>, key: string, value: any) {
      target[key] = value;

      if (key === "templateData") {
        const lineageDrawParams = element.getDrawParams();

        if (lineageDrawParams) {
          const nodeElement = lineageDrawParams.lineage.nodes.find(
            (n) => n.id === target.__id__
          );

          if (nodeElement) {
            target[key].__id__ = target.__id__;
            target[key] = new Proxy(target[key], templateDataProxy);
            nodeElement.templateData = target[key];
            d3.select(element.svg)
              .select(`#${target.__id__}-foreign-object`)
              .html(() => {
                return element.doTemplateHotUpdate(
                  nodeElement,
                  nodeElement.isChildren
                );
              });
          }
        }
      }
      return true;
    },
  };

  return {
    templateDataProxy,
    nodeDataProxy,
  };
}
