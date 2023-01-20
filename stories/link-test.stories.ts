import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";

export default {
  title: "Debug/Links",
  argTypes: {
    ["node-template"]: {
      control: false,
    },
    ["children-node-template"]: {
      control: false,
    },
  },
} as Meta;

const nodes: LineageNodes = {
  rdj: {
    data: {
      fullName: "Robert Downey Jr.",
      description: "Movies",
      state: "secondary",
    },
    children: {
      child1: {
        data: {
          icon: "i-hashtag",
          title: "Iron man 1",
        },
      },
      child2: {
        data: {
          icon: "i-hashtag",
          title: "Iron man 2",
        },
      },
    },
  },
  judge: {
    data: {
      fullName: "The Judge",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
  ironman: {
    data: {
      fullName: "Iron Man",
      description: "Tony stark",
      state: "secondary",
    },
    children: {
      iman1: {
        data: {
          icon: "i-hashtag",
          title: "Iron man 1",
        },
      },
      iman2: {
        data: {
          icon: "i-paragraph",
          title: "Iron man 2",
        },
      },
    },
  },
  hank: {
    data: {
      fullName: "Hank Palmer",
      description: "Actor",
      state: "secondary",
    },
    children: {
      child1: {
        data: {
          icon: "i-hashtag",
          title: "Node child 1",
        },
      },
      child2: {
        data: {
          icon: "i-paragraph",
          title: "Node child 2",
        },
      },
    },
    hideChildren: false,
  },
  prop1: {
    data: {
      fullName: "Bugs",
      description: "Roota Voota",
      state: "primary",
    },
    children: {
      hchild1: {
        data: {
          icon: "i-hashtag",
          title: "H Node child 1",
        },
      },
      hchild2: {
        data: {
          icon: "i-paragraph",
          title: "H Node child 2",
        },
      },
    },
  },
};
const links: LineageNodeLinks = [
  {
    from: "prop1",
    to: "judge",
  },
  {
    from: "rdj",
    to: "judge",
  },
  {
    from: "rdj",
    to: "ironman",
  },
  {
    from: "judge",
    to: "hank",
  },
  {
    from: "iman1",
    to: "child1",
  },
  {
    from: "ironman",
    to: "prop1",
  },
  {
    from: "hank",
    to: "rdj",
  },
  //   {
  //     from: "hank",
  //     to: "prop1",
  //   },
];

const Template: Story<unknown> = (args: any) => {
  return html`
    <f-lineage
      direction="horizontal"
      padding="16"
      gap="75"
      .node-size=${{ width: 240, height: 53 }}
      .children-node-size=${{ width: 240, height: 32 }}
      .max-children=${args["max-children"]}
      .node-template=${args["node-template"]}
      .children-node-template=${args["children-node-template"]}
      .links=${links}
      .nodes=${nodes}
      stager-load="1"
    ></f-lineage>
  `;
};

export const basic = Template.bind({});

basic.args = {
  ["node-template"]: `<f-div
  state=\${node.data.state}
  width="100%"
  height="100%"
  padding="small"
  align="top-left"
  variant="curved"
  gap="small"
  \${node.children && !node.hideChildren ? 'border="small solid default bottom"' : ""}
>
	<f-pictogram variant="circle" source="\${node.data.fullName}"></f-pictogram>
	<f-div direction="column">
		<f-text size="small" ellipsis>\${node.data.fullName}</f-text>
		<f-text size="small" ellipsis> x : \${node.x} , y : \${node.y}</f-text>
	</f-div>
	\${node.childrenToggle}
</f-div>`,
  ["children-node-template"]: `<f-div
state="secondary"
width="100%"
height="100%"
padding="none medium"
align="middle-left"
gap="small"
border="small solid default bottom"
>
<f-icon source="\${node.data.icon}" size="small"></f-icon>
<f-text  size="small" ellipsis>\${node.data.title}</f-text>
</f-div>`,
};
