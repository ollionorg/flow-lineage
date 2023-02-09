import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";

export const meta = {
  title: "Debug/Glitch",
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
  noede1: {
    fData: {
      fullName: "Node 1",
      description: "Movies",
      state: "secondary",
    },
    fChildren: {
      node1child1: {
        fData: {
          icon: "i-hashtag",
          title: "Node 1 child 1",
        },
      },
    },
  },
  node2: {
    fData: {
      fullName: "Node 2",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
    fChildren: {
      node2child1: {
        fData: {
          icon: "i-hashtag",
          title: "node 2 child 1",
        },
      },
      node2child2: {
        fData: {
          icon: "i-paragraph",
          title: "node 2 child 2",
        },
      },
    },
    fHideChildren: false,
  },
  node3: {
    fData: {
      fullName: "Node 3",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
  node4: {
    fData: {
      fullName: "Node 4",
      description: "Tony stark",
      state: "secondary",
    },
    fChildren: {
      node4child1: {
        fData: {
          icon: "i-hashtag",
          title: "node 4 child 1",
        },
      },
      node4child2: {
        fData: {
          icon: "i-paragraph",
          title: "node 4 child 2",
        },
      },
    },
    fHideChildren: false,
  },
  node5: {
    fData: {
      fullName: "Node 5",
      description: "Actor",
      state: "secondary",
    },
    fChildren: {
      node5child1: {
        fData: {
          icon: "i-hashtag",
          title: "Node 5 child 1",
        },
      },
      node5child3: {
        fData: {
          icon: "i-hashtag",
          title: "Node 5 child 3",
        },
      },
      node5child2: {
        fData: {
          icon: "i-paragraph",
          title: "Node 5 child 2",
        },
      },
    },
    fHideChildren: false,
  },
  node6: {
    fData: {
      fullName: "Node 6",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
};
const links: LineageNodeLinks = [
  {
    from: "noede1",
    to: "node2",
  },
  {
    from: "node1",
    to: "node5",
  },
  {
    from: "node1",
    to: "node4",
  },
  {
    from: "node2",
    to: "node5",
  },
  {
    to: "node3",
    from: "node5",
  },
  {
    from: "node5",
    to: "node4",
  },
  {
    from: "node6",
    to: "node5",
  },
  {
    from: "node4child1",
    to: "node5child2",
  },
  {
    from: "node4child1",
    to: "node5child1",
  },
  {
    from: "node1child1",
    to: "node5child2",
  },
  {
    from: "node1child1",
    to: "node4child2",
  },
  {
    from: "node6",
    to: "node6",
  },
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
      stagger-load="1"
    ></f-lineage>
  `;
};

export const basic = Template.bind({});

basic.args = {
  ["node-template"]: `<f-div
  state=\${node.fData.state}
  width="100%"
  height="100%"
  padding="small"
  align="top-left"
  variant="curved"
  gap="small"
  \${node.fChildren && !node.fHideChildren ? 'border="small solid default bottom"' : ""}
>
	<f-pictogram variant="circle" source="\${node.fData.fullName}"></f-pictogram>
	<f-div direction="column">
		<f-text size="small" ellipsis>\${node.fData.fullName}</f-text>
		<f-text size="x-small" ellipsis>\${node.x} \${node.y}</f-text>
	</f-div>
	<f-div direction="column">
		<f-text size="small" ellipsis>\${node.fData.fullName}</f-text>
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
  <f-icon source="\${node.fData.icon}" size="small"></f-icon>
  <f-text  size="small" ellipsis>\${node.fData.title}</f-text>
</f-div>`,
};

export default null;
