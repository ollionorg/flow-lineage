import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@cldcvr/flow-lineage/src";
import * as d3 from "d3";

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
    templateData: {
      fullName: "Robert Downey Jr.",
      description: "Movies",
      state: "secondary",
    },
    children: {
      child1: {
        templateData: {
          icon: "i-hashtag",
          title: "Iron man 1",
        },
      },
      child2: {
        templateData: {
          icon: "i-hashtag",
          title: "Iron man 2",
        },
      },
    },
    hideChildren: false,
  },
  judge: {
    templateData: {
      fullName: "The Judge",
      description: "Hank Palmer",
      state: "custom,#006ecc",
    },
  },
  ironman: {
    templateData: {
      fullName: "Iron Man",
      description: "Tony stark",
      state: "secondary",
    },
    children: {
      iman1: {
        templateData: {
          icon: "i-hashtag",
          title: "Iron man 1",
        },
      },
      iman2: {
        templateData: {
          icon: "i-paragraph",
          title: "Iron man 2",
        },
      },
    },
  },
  hank: {
    templateData: {
      fullName: "Hank Palmer",
      description: "Actor",
      state: "secondary",
    },
    children: {
      child1: {
        templateData: {
          icon: "i-hashtag",
          title: "Node child 1",
        },
      },
      child2: {
        templateData: {
          icon: "i-paragraph",
          title: "Node child 2",
        },
      },
    },
    hideChildren: false,
  },
  prop1: {
    templateData: {
      fullName: "Bugs",
      description: "Roota Voota",
      state: "primary",
    },
    children: {
      hchild1: {
        templateData: {
          icon: "i-hashtag",
          title: "H Node child 1",
        },
      },
      hchild2: {
        templateData: {
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
<f-icon source="\${node.templateData.icon}" size="small"></f-icon>
<f-text  size="small" ellipsis>\${node.templateData.title}</f-text>
</f-div>`,
};

// let updateCounter = 0;

// setInterval(() => {
//   updateCounter += 1;

//   if (nodes.rdj?.templateData) {
//     nodes.rdj.templateData.fullName = `Vikas ${updateCounter}`;
//   }
//   if (nodes.ironman?.templateData) {
//     nodes.ironman.templateData.fullName = `Flow ${updateCounter}`;
//   }
//   if (nodes.rdj.children && nodes.rdj.children.child1.templateData) {
//     nodes.rdj.children.child1.templateData.title = `Child Node ${updateCounter}`;
//   }
// }, 5000);
