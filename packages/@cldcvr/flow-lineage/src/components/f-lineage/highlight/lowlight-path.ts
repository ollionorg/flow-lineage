import { FLineage } from "../f-lineage";

export default function lowlightPath(lineage: FLineage) {
  /**
   * Remove highlighted node path
   */

  const root = lineage.shadowRoot;
  if (root) {
    root.querySelectorAll(".highlight").forEach((el) => {
      el.classList.remove("highlight");
    });
    root.querySelectorAll(".lowlight").forEach((el) => {
      el.classList.remove("lowlight");
    });
  }
}
