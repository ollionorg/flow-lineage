
## Flow Lineage
A lineage chart is a graphical representation of a node's ancestors, showing the relationships among nodes. It is often used in analytics to show the relations and to trace their ancestry. Lineage charts can be in the form of a hierarchy data, showing the relationships between parents and children, or they can be more complex and show the relationships between more distant nodes. Lineage charts can be useful for investigating the hierarchy of a data.

### Prerequisites

If you have an existing front-end project, you need to install [Flow core](https://github.com/cldcvr/flow-core) into that project before continuing with Flow lineage.
If you do not have an existing front-end project, you can easily create one from a [flow starter kit](https://github.com/cldcvr/flow-core#starter-kits). 

### Getting started
#### Step 1: Install flow lineage
```yarn add @cldcvr/flow-lineage```
*Note:* after installation, re-start your application.

#### Step 2 : Import styles/CSS 
**Vue JS:** Paste the below snippet *after the closing `<template>` tag in your `App.vue` file
```
<style>
@import "@cldcvr/flow-lineage/dist/style.css";
</style> 
```

**React:** Paste the below snippet in `src/index.tsx` or `index.jsx` file
```
import "@cldcvr/flow-lineage/dist/style.css";
```
**Angular:** Add css file path in `angular.json` in `styles` property array.

```
"styles": ["@cldcvr/flow-lineage/dist/style.css"],
```
#### Step 3: Import flow-lineage into your project
Copy and the below snippet into your startup file. In **VueJS:** (src/main.ts or main.js), **Angular:** (src/main.ts), **React:** (src/index.tsx or index.jsx)
```
import '@cldcvr/flow-lineage';
```

#### Step 4 : If your project is typescript enabled then you will need to include import types
**Vue JS 2 or 3:** Copy paste below line in your `main.ts` file.
```
import "@cldcvr/flow-lineage/dist/types/vue2";
```
```
import "@cldcvr/flow-lineage/dist/types/vue3";
```

**React**: Include react type in `tsconfig.json` file like below.
```
"include": ["src", "./node_modules/@cldcvr/flow-lineage/dist/types/react.ts"]
```

**Note:** after adding the snippets, re-start your application.

### Anatomy 
@pragayan we need an image that shows what a node, link, etc is. It should just the right about of detail for a developer to understand the properties below.

### Schema
Below is a sample of the schema architecture. You can jump to the [properties](#Properties) to learn more. 

```
@vikas add example of node schema here, add comments

"node-id": {
  data: {
  	fullName: "Anastasia Day",
    designation: "Team Lead",
    mobile: "+1 123 456 000",
    email: "abc@xyz.com",
  },
  children: [{
	id: "node-child-id-1",
    data: {
      reportee: "Whitney Lambert",
			email: "abc@xyz.com",
    },
	id: "node-child-id-2",
    data: {
      reportee: "Whitney Lambert",
			email: "abc@xyz.com",
    }
  }],
}

```

### Properties
####  Lineage  properties

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
			<code>horizontal</code>: nodes will be plotted from left to right.<br/><code>vertical</code> nodes will be plotted from top to bottom. <br>eg: <code>direction: horizontal</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">padding</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">16</td>
			<td style="vertical-align: top;">Define the padding of the lineage component in pixels (px)  <br>eg: <code> padding: 16</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">gap</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">100</td>
			<td style="vertical-align: top;">Define the gap between nodes in pixels (px) <br>eg: <code>gap: 100</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">node-size</td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">The dimensions of the node template. This is required to render the node correctly. <br>eg: <code>node-size: { width: 200, height: 52 }</code><br>
		</tr>
		<tr>
			<td style="vertical-align: top;">children-node-size</td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">The dimensions of the node children template. <br>eg: <code>node-children-size: { width: 200, height: 32 }</code><br>
		</tr>
		<tr>
			<td style="vertical-align: top;">center-node</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">root node</td>
			<td style="vertical-align: top;">Set which node ID is the main/center node of the entire lineage. <br>eg: <code>center-node: node-id</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">degree</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">10</td>
			<td style="vertical-align: top;">Flow linage has a staggered load aproach for better preformance. A degree defines how many levels of connections will be plotted in a single render.<br>eg: <code>degree: 10</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">max-children</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">8</td>
			<td style="vertical-align: top;">When a node is expanded, you can determine how many children are visible before a scrollbar apprears.<br>eg: <code>max-children: 10</code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">node-template</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;"><a href="#parent-node-template">template</a></td>
			<td style="vertical-align: top;">Nodes are visually represented through templates. You can write custom markup for your templates if required.<br>You can find more Flow lineage templates here (coming soon).
</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">children-node-template</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;"><a href="#child-node-template">template</a></td>
			<td style="vertical-align: top;">Just like node templates, child nodes are represented through templates.</td>
		</tr>
	</tbody>
</table>


### Node properties
Nodes are broken into two parts, a parent node `node` and child nodes `children`.

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
			<td>Data contains the metadata that will be consumed by the node-templates to display information on the lineage.<br/> For Example : To display name and email address on a node, the data would be <br/> <code>data: { name: "Harry Potter", email: "abc@xyz.com"}</code><br><br>You can use data for both node and child nodes. <a href="#schema">View schema example</a></td>
		</tr>
		<tr>
			<td>template</td>
			<td>String</td>
			<td>-</td>
			<td>You can give nodes unique indiviual templates as well, by default all parent nodes inherit the <a href="#parent-node">parent node template</a></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">click</td>
			<td style="vertical-align: top;">function</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">A callback function for when a node is clicked <br/>For Example : <br/><code>   click: function (event, node) {
		console.log("Node Clicked", event, node);
	},              </code></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">children</td>
			<td style="vertical-align: top;">array</td>
			<td style="vertical-align: top;">-</td>
			<td style="vertical-align: top;">children contain the metadata that will be consumed by the node-child-templates to display information on the lineage.<br> <a href="#schema">View schema example</a></td>
		</tr>
		<tr>
			<td style="vertical-align: top;">hideChildren</td>
			<td style="vertical-align: top;">Boolean</td>
			<td style="vertical-align: top;">true</td>
			<td style="vertical-align: top;">On load, all node children are collpased/hidden. Clicking on a node wil reveal its children</td>
		</tr>
	</tbody>
</table>

### Links 
Links are the connections drawn between nodes.

####  Link  properties
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
		<td style="vertical-align: top;">Unique identifier of the node from where connection line will start<br/> For Example : <code>[{ from: "A", to :"B"}]</code> 
		</td>
	</tr>
	<tr>
		<td  style="vertical-align: top;">to</td>
		<td style="vertical-align: top;">String</td>
		<td style="vertical-align: top;">-</td>
		<td style="vertical-align: top;">Unique identifier of node that the above connection will end on <br/> For Example : <code>[{ from: "A", to: "B"}]</code></td>
	</tr>
	</tbody>
</table>

### parent-node-template
The template below is written in flow, visit [flow-core](https://github.com/cldcvr/flow-core) to learn more.

```
<f-div state="secondary" width="100%" height="100%" padding="medium" align="top-left" variant="curved" gap="x-small" direction="column" \${node.children ? 'border="small solid default bottom"' : ""}>
	<f-div height="hug-content"> //tags
	  <f-text variant="heading" size="medium">\${node.data.designation}</f-text>
	</f-div>
	<f-div height="hug-content" gap="small"> //main-node
		<f-pictogram source="i-user" state="success" size="large" variant="circle"></f-pictogram>
		<f-div direction="column" height="hug-content" align="middle-left">
			<f-text  ellipsis>\${node.data.fullName}</f-text>
			<f-div padding="x-small none none none">
				<f-text size="small" ellipsis>Mobile No : \${node.data.mobile}</f-text>
			</f-div>
			<f-div padding="x-small none none none">
				<f-text size="small" ellipsis>Email : \${node.data.email}</f-text>
			</f-div>
		</f-div>
	</f-div>
</f-div>
```

@pragyan add mockup here 


### child-node-template

```
<f-div state="secondary" width="100%" height="100%" padding="none medium" align="middle-left" gap="small" border="small solid default bottom">
  <f-icon source="i-user" size="small"></f-icon>
  <f-text variant="code" size="medium" ellipsis>\${node.data.fullName}</f-text>
</f-div>
```

@pragyan add mockup here 

### Examples
Checkout examples from [here](https://flow.cldcvr.com/lineage/index.html?path=/story/introduction-about--page)