import { FLineage } from "../f-lineage";
import { LineageNodeElement } from "../lineage-types";

export default function highlightPath(
  node: LineageNodeElement,
  lineage: FLineage
) {
  console.time("Lineage : highlight duration");
  /**
   * shadow root of lineage
   */
  const root = lineage.shadowRoot;
  if (root) {
    root.querySelectorAll(".highlight").forEach((el) => {
      el.classList.remove("highlight");
    });
    /**
     * Add lowlight class to all eligible elements
     */
    root.querySelectorAll(".lineage-element").forEach((el) => {
      el.classList.add("lowlight");
    });

    const highlightFrom = (id: string) => {
      const nodeInDom = root.querySelector(`#${id}`);
      if (nodeInDom) {
        nodeInDom.classList.remove("lowlight");

        /**
         * Highlight child nodes
         */
        const childs = root.querySelectorAll(`.child-node-${id}`);
        if (childs) {
          childs.forEach((el) => {
            el.classList.remove("lowlight");
          });
        }

        root.querySelectorAll(`[id^="${id}->"]`).forEach((el) => {
          el.classList.add("highlight");
          el.classList.remove("lowlight");
          const fromid = el.getAttribute("id")?.split("->")[1];
          if (fromid) highlightFrom(fromid);
        });
        root.querySelectorAll(`[id^="source-dot-${id}->"]`).forEach((el) => {
          el.classList.add("highlight");
          el.classList.remove("lowlight");
        });
      }
    };
    const highlightTo = (id: string) => {
      const nodeInDom = root.querySelector(`#${id}`);
      if (nodeInDom) {
        nodeInDom.classList.remove("lowlight");

        /**
         * Highlight child nodes
         */
        const childs = root.querySelectorAll(`.child-node-${id}`);
        if (childs) {
          childs.forEach((el) => {
            el.classList.remove("lowlight");
          });
        }

        root.querySelectorAll(`[id$="->${id}"]`).forEach((el) => {
          el.classList.add("highlight");
          el.classList.remove("lowlight");
          const fromid = el.getAttribute("id")?.split("->")[0];
          if (fromid) highlightTo(fromid);
        });
        root.querySelectorAll(`[id$="->${id}~target-dot"]`).forEach((el) => {
          el.classList.add("highlight");
          el.classList.remove("lowlight");
        });
        root.querySelectorAll(`[id$="->${id}~arrow"]`).forEach((el) => {
          el.classList.add("highlight");
          el.classList.remove("lowlight");
        });
      }
    };
    /**
     * Highlight node based on name
     */

    highlightFrom(node.id);
    highlightTo(node.id);
    console.timeEnd("Lineage : highlight duration");
  }
}
