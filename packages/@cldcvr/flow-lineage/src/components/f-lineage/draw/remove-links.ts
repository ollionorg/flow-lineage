import { FLineage } from "../f-lineage";
import { LineageNodeElement } from "../lineage-types";
export default function removeLinks(
  nodes: LineageNodeElement[],
  lineage: FLineage
) {
  const root = lineage.shadowRoot;
  if (root) {
    nodes.forEach((n) => {
      root.querySelectorAll(`[id^="${n.id}->"]`).forEach((el) => {
        el.remove();
      });
      root.querySelectorAll(`[id$="->${n.id}"]`).forEach((el) => {
        el.remove();
      });
      root.querySelectorAll(`[id$="${`${n.id}~target-dot`}"]`).forEach((el) => {
        el.remove();
      });
      root
        .querySelectorAll(`[id^="${`source-dot-${n.id}`}->"]`)
        .forEach((el) => {
          el.remove();
        });
    });
  }
}
