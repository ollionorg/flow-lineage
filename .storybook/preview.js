import { html } from "lit-html";

import "@cldcvr/flow-lineage/src";
import {
  setCustomElementsManifest,
  setCustomElements,
} from "@storybook/web-components";
import "./storybook.css";
import "@cldcvr/flow-core/dist/style.css";
import "@cldcvr/flow-core";
import "@cldcvr/flow-system-icon";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Introduction", "Components"],
    },
  },
};

export const decorators = [
  (story) => {
    return html`
      <div
        style="background-color:var(--color-surface-default);color:var(--color-text-default);font-family:var(--flow-font);height:inherit;padding: 0px;min-height:inherit;"
      >
        ${story()}
      </div>
    `;
  },
];

async function run() {
  const customElements = await (
    await fetch(
      new URL(
        "../packages/@cldcvr/flow-lineage/custom-elements.json",
        import.meta.url
      )
    )
  ).json();

  setCustomElementsManifest(customElements);
  setCustomElements(customElements);
}

run();
