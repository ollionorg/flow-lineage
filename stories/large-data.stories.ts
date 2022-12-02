import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";

export default {
  title: "Examples/Large Data",
} as Meta;

const makeid = (length: number) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

function randomNumber(min: number, max: number) {
  return +(Math.random() * (max - min) + min).toFixed(0);
}

const nodes: LineageNodes = {};
const links: LineageNodeLinks = [];

const levels: Record<number, string[]> = {};

for (let l = 0; l < 60; l++) {
  for (let n = 0; n < 20; n++) {
    const nodeid = makeid(5);
    nodes[nodeid] = {};
    if (!levels[l]) {
      levels[l] = [];
    }

    levels[l].push(nodeid);
    if (l > 0) {
      links.push({
        from: levels[l - 1][randomNumber(0, 9)],
        to: nodeid,
      });
    }
  }
}

console.log(Object.keys(nodes).length);
const Template: Story<unknown> = (args: any) => {
  return html`
    <f-lineage
      .direction=${args.direction}
      .padding=${args.padding}
      .gap=${args.gap}
      .node-size=${args["node-size"]}
      .children-node-size=${args["children-node-size"]}
      .max-childrens=${args["max-childrens"]}
      .node-template=${args["node-template"]}
      .children-node-template=${args["children-node-template"]}
      .links=${args.links}
      .nodes=${args.nodes}
      degree="1"
    ></f-lineage>
  `;
};

export const basic = Template.bind({});

basic.args = {
  direction: "horizontal",
  padding: 16,
  gap: 75,
  ["node-size"]: { width: 44, height: 44 },
  ["node-template"]: `<f-pictogram source="\${node.id}" variant="circle"></f-text>`,
  links,
  nodes,
};
