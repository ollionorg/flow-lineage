import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";

export default {
  title: "Debug/dashed-hidden-children-link",
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
    data: {
      fullName: "Node 1",
      description: "Movies",
      state: "secondary",
    },
    children: {
      node1child1: {
        data: {
          icon: "i-hashtag",
          title: "Node 1 child 1",
        },
      },
    },
  },
  node2: {
    data: {
      fullName: "Node 2",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
    children: {
      node2child1: {
        data: {
          icon: "i-hashtag",
          title: "node 2 child 1",
        },
      },
      node2child2: {
        data: {
          icon: "i-paragraph",
          title: "node 2 child 2",
        },
      },
    },
    hideChildren: false,
  },
  node3: {
    data: {
      fullName: "Node 3",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
  node4: {
    data: {
      fullName: "Node 4",
      description: "Tony stark",
      state: "secondary",
    },
    children: {
      node4child1: {
        data: {
          icon: "i-hashtag",
          title: "node 4 child 1",
        },
      },
      node4child2: {
        data: {
          icon: "i-paragraph",
          title: "node 4 child 2",
        },
      },
    },
    hideChildren: false,
  },
  node5: {
    data: {
      fullName: "Node 5",
      description: "Actor",
      state: "secondary",
    },
    children: {
      node5child1: {
        data: {
          icon: "i-hashtag",
          title: "Node 5 child 1",
        },
      },
      node5child3: {
        data: {
          icon: "i-hashtag",
          title: "Node 5 child 3",
        },
      },
      node5child2: {
        data: {
          icon: "i-paragraph",
          title: "Node 5 child 2",
        },
      },
      node5child4: {
        data: {
          icon: "i-hashtag",
          title: "Node 5 child 4",
        },
      },
      node5child5: {
        data: {
          icon: "i-hashtag",
          title: "Node 5 child 5",
        },
      },
      node5child6: {
        data: {
          icon: "i-paragraph",
          title: "Node 5 child 6",
        },
      },
    },
    hideChildren: false,
  },
  node6: {
    data: {
      fullName: "Node 6",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
};
const links: LineageNodeLinks = [
  {
    from: "node1",
    to: "node2",
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
    to: "node5child6",
  },
];

const Template: Story<unknown> = (args: any) => {
  return html`
    <f-icon>
      <svg
        width="24"
        height="22"
        viewBox="0 0 24 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M23.589 12.3372C24.137 11.3881 24.137 10.2186 23.589 9.26944L19.123 1.5339C18.575 0.584722 17.5622 0 16.4661 0H7.53392C6.4379 0 5.42514 0.584722 4.87713 1.5339L0.411008 9.26944C-0.137003 10.2186 -0.137003 11.3881 0.411008 12.3372L4.87713 20.0729C5.42514 21.022 6.4379 21.6068 7.53392 21.6068H16.4661C17.5622 21.6068 18.575 21.022 19.123 20.0729L23.589 12.3372ZM5.52307 15.9325L7.15439 18.7581C7.23268 18.8936 7.37735 18.9772 7.53392 18.9772H16.4661C16.6227 18.9772 16.7674 18.8936 16.8457 18.7581L18.477 15.9325C16.7654 14.3794 14.4932 13.4331 12 13.4331C9.50681 13.4331 7.23462 14.3794 5.52307 15.9325ZM12 11.6801C13.9364 11.6801 15.5061 10.1104 15.5061 8.17401C15.5061 6.23766 13.9364 4.66794 12 4.66794C10.0637 4.66794 8.49397 6.23766 8.49397 8.17401C8.49397 10.1104 10.0637 11.6801 12 11.6801Z"
          fill="white"
        />
      </svg>
    </f-icon>
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
		<f-text size="x-small" ellipsis>\${node.x} \${node.y}</f-text>
	</f-div>
	<f-div direction="column">
		<f-text size="small" ellipsis>\${node.data.fullName}</f-text>
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
