
# Flow Lineage
A lineage chart is a graphical representation of a node's ancestors, showing the relationships among nodes. It is often used in analytics to show the relations and to trace their ancestry. Lineage charts can be in the form of a hierarchy data, showing the relationships between parents and children, or they can be more complex and show the relationships between more distant nodes. Lineage charts can be useful for investigating the hierarchy of a data.

# Prerequisites

For an existing front-end project, you need to install [Flow core](https://github.com/cldcvr/flow-core) before continuing with Flow lineage. If you run into an issue, head over to our [known issues + solutions document](https://github.com/cldcvr/flow-lineage/blob/main/KNOWN_SOLUTIONS.md) to see if we a solution already exists.


If you do not have an existing front-end project, you can quickly create one from a [flow starter kit](https://github.com/cldcvr/flow-core#starter-kits). 

## Getting started
### Step 1: Install flow lineage dependency
```
yarn add @cldcvr/flow-lineage
```
**Note:** after installation, re-start your application.

<br>

### Step 2 : Import styles/CSS 
**Vue JS:** Paste the below snippet after the closing `<template>` tag in your `App.vue` file
```html
<style>
@import "@cldcvr/flow-lineage/dist/style.css";
</style> 
```
<details>
<summary>React</summary>

**React:** Paste the below snippet in `src/index.tsx` or `index.jsx` file
```Javascript
import "@cldcvr/flow-lineage/dist/style.css";
```
</details>

<details><summary>Angular</summary>

**Angular:** Add css file path in `angular.json` in `styles` property array.

```json
"styles": ["@cldcvr/flow-lineage/dist/style.css"],
```
</details>
<br>


### Step 3: Import flow-lineage into your project
Paste the below snippet in your project, for 
* **VueJS:** (src/main.ts or main.js)
* **Angular:** (src/main.ts)
* **React:** (src/index.tsx or index.jsx)

```javascript
import("@cldcvr/flow-core").then(async () => {
	await import('@cldcvr/flow-lineage');
	//add your application startup/runtime code here **
});
```
** This is required to register Flow elements error-free. We achieve this by importing all flow packages asynchronously and then starting up your application.

<br>

### Step 4 : If you have a typescript enabled project, include the import types
Copy paste below line in your `main.ts` file.

**Vue 2:**
```Javascript
import "@cldcvr/flow-lineage/dist/types/vue2";
```
**Vue 3:**
```Javascript
import "@cldcvr/flow-lineage/dist/types/vue3";
```

<details>
<summary>React</summary>

**React**: Include react type in `tsconfig.json` file like below.
```json
"include": ["src", "./node_modules/@cldcvr/flow-lineage/dist/types/react.ts"]
```
</details>
<br>

**Note:** after adding, re-start your application.


<br>

## Demo

Head over to [Flow Lineage Storybook](https://flow.cldcvr.com/lineage/index.html?path=/story/introduction-about--page) for a demo. 

<br>

## Anatomy 

![Group 21473](https://user-images.githubusercontent.com/67629551/211527311-01bcdbb0-e36e-4afe-a766-6f5c00359da0.png)

<br>

## Get started
We have created a sample lineage component along with it's schema to get you going, simply copy paste the below language specific code block in your FE project.

<details><summary><strong>Vue JS: Click to view the sample lineage component.</strong></summary>
<p>

**How to use:** Create new file `flow-lineage.vue` in your vue.js project and import the lineage component.

```html
<template>
  <f-lineage
    direction="horizontal"
    :padding="28"
    :gap="100"
    :node-size.prop="{ width: 240, height: 53 }"
    :children-node-size.prop="{ width: 240, height: 32 }"
    :max-childrens="8"
    :links.prop="links"
    :nodes.prop="nodes"
    :node-template="nodeTemplate"
    :children-node-template="childNodeTemplate"
  ></f-lineage>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FlowLineage",
  data() {
    return {
      nodes: {
        rdj: {
          data: {
            fullName: "Robert Downey Jr.",
            description: "Movies",
          },
        },
        judge: {
          data: {
            fullName: "The Judge",
            description: "Hank Palmer",
          },
        },
        ironman: {
          data: {
            fullName: "Iron Man",
            description: "Tony stark",
          },
          children: [
            {
              id: "iman1",
              data: {
                icon: "i-hashtag",
                title: "Iron man 1",
              },
            },
            {
              id: "iman2",
              data: {
                icon: "i-paragraph",
                title: "Iron man 2",
              },
            },
            {
              id: "iman3",
              data: {
                icon: "i-letter",
                title: "Iron man 3",
              },
            },
            {
              id: "av1",
              data: {
                icon: "i-paragraph",
                title: "Avengers 1",
              },
            },
            {
              id: "av2",
              data: {
                icon: "i-hashtag",
                title: "Avengers 2",
              },
            },
          ],
          hideChildren: false,
        },
        hank: {
          data: {
            fullName: "Hank Palmer",
            description: "Actor",
          },
          children: [
            {
              id: "child1",
              data: {
                icon: "i-hashtag",
                title: "Node child 1",
              },
            },
            {
              id: "child2",
              data: {
                icon: "i-paragraph",
                title: "Node child 2",
              },
            },
            {
              id: "child3",
              data: {
                icon: "i-letter",
                title: "Node child 3",
              },
            },
            {
              id: "child4",
              data: {
                icon: "i-paragraph",
                title: "Node child 4",
              },
            },
            {
              id: "child5",
              data: {
                icon: "i-hashtag",
                title: "Node child 5",
              },
            },
          ],
          hideChildren: false,
        },
      },
      links: [
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
      ],
      nodeTemplate: `<f-div
		  state=\${node.id==="rdj"?'custom,#006ecc':'secondary'}
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
				<f-text size="x-small" ellipsis>\${node.data.description}</f-text>
			</f-div>
			\${node.childrenToggle}
		</f-div>`,
      childNodeTemplate: `<f-div
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
  },
});
</script>

```

</p>
</details>

<br>

Once it's running, you will see a lineage component like the image below.

![Screenshot 2023-01-10 at 7 09 42 PM](https://user-images.githubusercontent.com/67629551/211567588-bab9ff44-ad72-4fe4-853e-29c7d94a859b.png)

<br>

## Properties
### Lineage properties

<table style="width:100%">
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description/Options</th>
		</tr>
	</thead>
	<tbody>
	<tr>
			<td style="vertical-align: top;">direction</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">"horizontal"</td>
			<td style="vertical-align: top;"> Defines the orientation of the lineage. Options are<br>
			<code>horizontal</code>: nodes will be plotted from left to right.<br/><code>vertical</code> nodes will be plotted from top to bottom. <br>eg: <code>&lt;f-lineage direction=&quot;horizontal&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">padding</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">16</td>
			<td style="vertical-align: top;">Define the padding of the lineage component in pixels (px)  <br>eg: <code> &lt;f-lineage padding=&quot;16&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">gap</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">100</td>
			<td style="vertical-align: top;">Define the gap between nodes in pixels (px) <br>eg: <code>&lt;f-lineage gap=&quot;100&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">node-size</td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">The dimensions of the node template. This is required to render the node correctly. <br>eg: <code>&lt;f-lineage :node-size.prop=&quot;{ width: 200, height: 52 }&quot;&gt;&lt;/f-lineage&gt;</code><br>
		</tr>
		<tr>
			<td style="vertical-align: top;">children-node-size</td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">The dimensions of the node children template. <br>eg: <code>&lt;f-lineage :node-children-size.prop=&quot;{ width: 200, height: 32 }&quot;&gt;&lt;/f-lineage&gt;</code><br>
		</tr>
		<tr>
			<td style="vertical-align: top;">center-node</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">root node</td>
			<td style="vertical-align: top;">Set which node ID is the main/center node of the entire lineage. <br>eg: <code>&lt;f-lineage center-node=&quot;your-node-id&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">stager-load</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">10</td>
			<td style="vertical-align: top;">Flow linage has a staggered load aproach for better preformance. A stager-load defines how many levels of connections will be plotted in a single render.<br>eg: <code>&lt;f-lineage stager-load=&quot;10&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">max-children</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">8</td>
			<td style="vertical-align: top;">When a node is expanded, you can determine how many children are visible before a scrollbar apprears.<br>eg: <code>&lt;f-lineage max-children=&quot;8&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">node-template</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;"><a href="#node-template">template</a></td>
			<td style="vertical-align: top;">Nodes are visually represented through templates. You can write custom markup for your templates if required.<br>You can find more Flow lineage templates here (coming soon).
			</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">children-node-template</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;"><a href="#child-node-template">template</a></td>
			<td style="vertical-align: top;">Each node can have children and just like node templates, child nodes are represented through templates as well.</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">nodes</td>
			<td style="vertical-align: top;">{ }</td>
			<td style="vertical-align: top;"><a href="#node-properties">properties</a></td>
			<td style="vertical-align: top;">Node properties</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">links</td>
			<td style="vertical-align: top;">[ ]</td>
			<td style="vertical-align: top;"><a href="#link-properties">properties</a></td>
			<td style="vertical-align: top;">Link properties</td>
		</tr>
	</tbody>
</table>

Note: Above examples are written in VueJS syntax. Refer for [Angular](https://angular.io/guide/property-binding-best-practices) and [React](https://beta.reactjs.org/learn/passing-props-to-a-component)

<br>

### Node properties
Nodes are broken into two parts, a node `node` and child nodes `children`.

<table style="width:100%">
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>data</td>
			<td>Object</td>
			<td>-</td>
			<td>The data objects contains the metadata that will be consumed by the node-templates to display information on the lineage.<br/> For Example : To display name and email address on a node, the data would be <br/> <code>data: { name: "Harry Potter", email: "abc@xyz.com"}</code><br><br>You can use data for both node and child nodes. <a href="#get-started">View lineage example</a></td>
		</tr>
		<tr>
			<td>nodeTemplate</td>
			<td>String</td>
			<td>-</td>
			<td>Node are represented through templates, by default all nodes inherit the node template set at the lineage level. Refer to <a href="#lineage-properties">Lineage properties</a>.<br><br>
			You can choose to give a node a unique/different templates as well by adding a template and the node level. </td>
		</tr>
		<tr>
			<td style="vertical-align: top;">click</td>
			<td style="vertical-align: top;">function</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">A callback function for when a node is clicked <br/>Eg: <br/><code>   click: function (event, node) {
		console.log("Node Clicked", event, node);
	},              </code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">rightClick</td>
			<td style="vertical-align: top;">function</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">A callback function for when a node is right clicked <br/>Eg: <br/><code>   rightClick: function (event, node) {
		console.log("Node Right Clicked", event, node);
	},              </code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">children</td>
			<td style="vertical-align: top;">array</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">The children array will contain the metadata that will be consumed by the node-child-templates to display information on the lineage.</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">hideChildren</td>
			<td style="vertical-align: top;">Boolean</td>
			<td style="vertical-align: top;">true</td>
			<td style="vertical-align: top;">On load, all node children are collpased/hidden. Clicking on a node wil reveal its children</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">state</td>
			<td style="vertical-align: top;">string</td>
			<td style="vertical-align: top;">default</td>
			<td style="vertical-align: top;">States are used through Flow to communicate purpose and its connotation. For example, a red color connotes danger, whereas a green color connotes success and so on. <br><br> Available options are 
			<br><code>default</code>, <code>subtle</code>, <code>secondary</code>, <code>tertiary</code>, <code>primary</code>, <code>success</code>, <code>warning</code>, <code>danger</code>
			</td>
		</tr>
	</tbody>
</table>

###  Link  properties
<table style="width:100%">
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Default</th>
			<th>Description</th>
		</tr>
	</thead>
	<tbody>
	<tr>
		<td  style="vertical-align: top;">from</td>
		<td style="vertical-align: top;">String</td>
		<td style="vertical-align: top;">-</td>
		<td style="vertical-align: top;">Define the <strong>from</strong> connection of a node through a unique identifier.<br/> For Example : <code>[{ from: "A", to :"B"}]</code> <br><br>Note: All from connections will always begin from the right side of a node or child node.
		</td>
	</tr>
	<tr>
		<td  style="vertical-align: top;">to</td>
		<td style="vertical-align: top;">String</td>
		<td style="vertical-align: top;">-</td>
		<td style="vertical-align: top;">Define the <strong>to</strong> connection of a node through a unique identifier.<br/> For Example : <code>[{ from: "A", to :"B"}]</code> <br><br>Note: All to connections will always begin from the left side of a node or child node.</td>
	</tr>
	</tbody>
</table>

<br>

## node-template
The template below is written in flow, visit [flow-core](https://github.com/cldcvr/flow-core) to learn more. You could also write your own template. 

<img width="240" alt="f-div ( node)" src="https://user-images.githubusercontent.com/2121451/211515800-6f63a758-a528-42f9-b452-e8bf1fd6dfeb.png">

```html
<f-div
	state="secondary"
	width="100%"
	height="100%"
	padding="small"
	align="top-left"
	variant="curved"
	gap="small"
	\${node.children && !node.hideChildren ? 'border="small solid default bottom"' : ""}
	>
		<f-pictogram variant="circle" source="A1"></f-pictogram>
		<f-div direction="column">
			<f-text size="small" ellipsis>Node name</f-text>
			<f-text size="x-small" ellipsis>Description</f-text>
		</f-div>
		\${node.childrenToggle}
</f-div>
```




## child-node-template

<img width="240" alt="f-div (child node)" src="https://user-images.githubusercontent.com/2121451/211515842-43ae327e-6b78-42bd-9031-8087f664c10e.png">

```html
<f-div
	state="secondary"
	width="100%"
	height="100%"
	padding="none medium"
	align="middle-left"
	gap="small"
	border="small solid default bottom"
	>
		<f-icon source="i-user" size="small"></f-icon>
		<f-text  size="small" ellipsis>Child node name</f-text>
 </f-div>
```



