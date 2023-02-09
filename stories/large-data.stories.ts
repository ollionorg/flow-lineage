import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";

export const meta = {
  title: "Examples/Large Data",
  argTypes: {
    ["node-template"]: {
      control: false,
    },
  },
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

for (let l = 0; l < 50; l++) {
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

const Template: Story<unknown> = (args: any) => {
  return html`
    <f-lineage
      direction="horizontal"
      padding="16"
      gap="75"
      .node-size=${{ width: 44, height: 44 }}
      .children-node-size=${args["children-node-size"]}
      .max-children=${args["max-children"]}
      .node-template=${args["node-template"]}
      .children-node-template=${args["children-node-template"]}
      .links=${links}
      .nodes=${nodes}
      stagger-load="5"
    ></f-lineage>
  `;
};

export const basic = Template.bind({});

basic.args = {
  ["node-template"]: `<f-pictogram source="\${node.id}" variant="circle" clickable></f-text>`,
};

export default null;
