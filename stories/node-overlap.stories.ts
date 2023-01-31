import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";

export default {
  title: "Debug/node-overlap",
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
  node1: {
    templateData: {
      fullName: "Node 1",
      description: "Movies",
      state: "secondary",
    },
    children: {
      node1child1: {
        templateData: {
          icon: "i-hashtag",
          title: "Node 1 child 1",
        },
      },
    },
  },
  node2: {
    templateData: {
      fullName: "Node 2",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
    children: {
      node2child1: {
        templateData: {
          icon: "i-hashtag",
          title: "node 2 child 1",
        },
      },
      node2child2: {
        templateData: {
          icon: "i-paragraph",
          title: "node 2 child 2",
        },
      },
    },
    hideChildren: false,
  },
  node3: {
    templateData: {
      fullName: "Node 3",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
  node4: {
    templateData: {
      fullName: "Node 4",
      description: "Tony stark",
      state: "secondary",
    },
    children: {
      node4child1: {
        templateData: {
          icon: "i-hashtag",
          title: "node 4 child 1",
        },
      },
      node4child2: {
        templateData: {
          icon: "i-paragraph",
          title: "node 4 child 2",
        },
      },
    },
    hideChildren: false,
  },
  node5: {
    templateData: {
      fullName: "Node 5",
      description: "Actor",
      state: "secondary",
    },
    children: {
      node5child1: {
        templateData: {
          icon: "i-hashtag",
          title: "Node 5 child 1",
        },
      },
      node5child3: {
        templateData: {
          icon: "i-hashtag",
          title: "Node 5 child 3",
        },
      },
      node5child2: {
        templateData: {
          icon: "i-paragraph",
          title: "Node 5 child 2",
        },
      },
      node5child4: {
        templateData: {
          icon: "i-hashtag",
          title: "Node 5 child 4",
        },
      },
      node5child5: {
        templateData: {
          icon: "i-hashtag",
          title: "Node 5 child 5",
        },
      },
      node5child6: {
        templateData: {
          icon: "i-paragraph",
          title: "Node 5 child 6",
        },
      },
    },
    hideChildren: false,
  },
  node6: {
    templateData: {
      fullName: "Node 6",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
};
const links: LineageNodeLinks = [
  {
    from: "node1",
    to: "node5",
  },
  {
    from: "node1",
    to: "node2",
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
    from: "node6",
    to: "node5",
  },

  {
    from: "node5",
    to: "node4",
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
];

const Template: Story<unknown> = (args: any) => {
  return html`
    <f-lineage
      direction="horizontal"
      padding="16"
      gap="75"
      .node-size=${{ width: 240, height: 53 }}
      .children-node-size=${{ width: 240, height: 32 }}
      .max-children=${4}
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
  state=\${node.templateData.state}
  width="100%"
  height="100%"
  padding="small"
  align="top-left"
  variant="curved"
  gap="small"
  \${node.children && !node.hideChildren ? 'border="small solid default bottom"' : ""}
>
	<f-pictogram variant="circle" source="\${node.templateData.fullName}"></f-pictogram>
	<f-div direction="column">
		<f-text size="small" ellipsis>\${node.templateData.fullName}</f-text>
		<f-text size="x-small" ellipsis>\${node.x} \${node.y}</f-text>
	</f-div>
	<f-div direction="column">
		<f-text size="small" ellipsis>\${node.templateData.fullName}</f-text>
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
  <f-icon source="\${node.templateData.icon}" size="small"></f-icon>
  <f-text  size="small" ellipsis>\${node.templateData.title}</f-text>
</f-div>`,
};
