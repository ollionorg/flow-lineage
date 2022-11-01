import { html, unsafeCSS, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-lineage.scss";

@customElement("f-lineage")
export class FLineage extends LitElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute comments baout title
   */
  @property({ type: String })
  title!: string;

  render() {
    return html` Hello from Lineage`;
  }
}
