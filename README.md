## Flow Lineage
A lineage chart is a graphical representation of a node's ancestors, showing the relationships among nodes. It is often used in analytics to show the relations and to trace their ancestry. Lineage charts can be in the form of a hierarchy data, showing the relationships between parents and children, or they can be more complex and show the relationships between more distant nodes. Lineage charts can be useful for investigating the hierarchy of a data.

### Prerequisites

To use the Lineage, you need to install [`@cldcvr/flow-core`](https://github.com/cldcvr/flow-core) in your front-end project.
If you are starting from scratch then you can use starter-kits from [here](https://github.com/cldcvr/flow-core#starter-kits). 

<hr/>

### Getting started

#### Step 1: Install flow lineage
```yarn add @cldcvr/flow-lineage```

*Note:* after installation, re-start your application.


#### Step 2 : Import CSS 
**Vue:**
Paste the below snippet *after the closing `<template>`* in your `App.vue` 

```
<style>
@import "@cldcvr/flow-lineage/dist/style.css";
</style> 
```
**React:** Paste the below snippet in `src/index.tsx` or `index.jsx`

```
import "@cldcvr/flow-lineage/dist/style.css";
```
**Angular:** Add css file path in `angular.json` in `styles` property array.

```
"styles": ["@cldcvr/flow-lineage/dist/style.css"],

```
#### Step 3: Import flow-lineage into your project

Copy and import the below snippet into your startup file. In **VueJS:** (src/main.ts or main.js), **Angular:** (src/main.ts), **React:** (src/index.tsx or index.jsx)
```
import '@cldcvr/flow-lineage';
```
#### Step 4 : If your project is typescript enabled please include import types to

**Vue:** 
Copy paste below line in your `main.ts` file.
```
import "@cldcvr/flow-lineage/dist/types/vue2";
```
or 
```
import "@cldcvr/flow-lineage/dist/types/vue3";
```

**React**
Include react type in `tsconfig.json` like below
```
"include": ["src", "./node_modules/@cldcvr/flow-lineage/dist/types/react.ts"]
```

**Note:** after adding the snippets, re-start your application.

<hr/>

### Usage
<br/>

#### Properties

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
			<td style="vertical-align: top;">nodes<span style="color:red;">*</span></td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;">{}</td>
			<td style="vertical-align: top;">`nodes` is an unordered collection of key-value pairs object. where key is unique node identifier and value is an object which has following properties.
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
							<td style="vertical-align: top;">data</td>
							<td style="vertical-align: top;">Object</td>
							<td style="vertical-align: top;">undefined</td>
							<td style="vertical-align: top;">`data` is key-value pairs object, it is designed to hold custom data as per User's use case and that custom data is used in `node-template`.<br/> For Example : I am displaying user's firstname and lastname then my data will look like below <br/> <code>data : { firstname : "Harry", lastname : "Potter"}</code></td>
						</tr>
						<tr>
							<td style="vertical-align: top;">template</td>
							<td style="vertical-align: top;">String</td>
							<td style="vertical-align: top;">undefined</td>
							<td style="vertical-align: top;">template is same as `node-template`,The only differrence is that if template is specified then this node will ignore global `node-template` property.</td>
						</tr>
						<tr>
							<td style="vertical-align: top;">click</td>
							<td style="vertical-align: top;">Function</td>
							<td style="vertical-align: top;">undefined</td>
							<td style="vertical-align: top;">callback function when node is clicked <br/>For Example : <br/><code>   click: function (event, node) {
            console.log("Node Clicked", event, node);
          },              </code></td>
						</tr>
						<tr>
							<td style="vertical-align: top;">children</td>
							<td style="vertical-align: top;">Array</td>
							<td style="vertical-align: top;">undefined</td>
							<td style="vertical-align: top;">array of objects, where object is same as value from key-value of `nodes` property. The difference is :  <br/> 1. we can't specify `children` and `hideChildren`. <br/> 2. String based `id` mandatory property required here.  </td>
						</tr>
						<tr>
							<td style="vertical-align: top;">hideChildren</td>
							<td style="vertical-align: top;">Boolean</td>
							<td style="vertical-align: top;">true</td>
							<td style="vertical-align: top;">used to display children when rendered on UI</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td  style="vertical-align: top;">links<span style="color:red;">*</span></td>
			<td  style="vertical-align: top;">Array</td>
			<td  style="vertical-align: top;">[]</td>
			<td  style="vertical-align: top;">links between nodes which is array of objects, where object has following properties :  <table style="width:100%">
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
						 	<td  style="vertical-align: top;">from<span style="color:red;">*</span></td>
							<td style="vertical-align: top;">String</td>
							<td style="vertical-align: top;">NA</td>
							<td style="vertical-align: top;">Unique identifier of node, from where connection line will start</td>
						</tr>
						<tr>
						 	<td  style="vertical-align: top;">to<span style="color:red;">*</span></td>
							<td style="vertical-align: top;">String</td>
							<td style="vertical-align: top;">NA</td>
							<td style="vertical-align: top;">Unique identifier of node, from where connection line will connect or end with ▶</td>
						</tr>
					</tbody>
					</table><br/> For Example : <br/><code>[ { from : "A", to : "B"}]</code> where `A` and `B` are node's Unique identifier
			</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">direction</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">"horizontal"</td>
			<td style="vertical-align: top;">If `horizontal` then nodes will be plotted from left to right.<br/>If vertical then nodes will be plotted from top to bottom.</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">padding</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">16</td>
			<td style="vertical-align: top;">padding in px inside chart </td>
		</tr>
		<tr>
			<td style="vertical-align: top;">gap</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">100</td>
			<td style="vertical-align: top;">gap in px between nodes </td>
		</tr>
		<tr>
			<td style="vertical-align: top;">node-size</td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;"><code>{ width: 200, height: 52 }</code></td>
			<td style="vertical-align: top;">size of node specified by following 2 properties : 
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
						 	<td  style="vertical-align: top;">width<span style="color:red;">*</span></td>
							<td style="vertical-align: top;">Number</td>
							<td style="vertical-align: top;">NA</td>
							<td style="vertical-align: top;">width of node in px</td>
						</tr>
						<tr>
						 	<td  style="vertical-align: top;">height<span style="color:red;">*</span></td>
							<td style="vertical-align: top;">Number</td>
							<td style="vertical-align: top;">NA</td>
							<td style="vertical-align: top;">height of node in px</td>
						</tr>
					</tbody>
				</table>
			</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">children-node-size</td>
			<td style="vertical-align: top;">Object</td>
			<td style="vertical-align: top;"><code>{ width: 200, height: 32 }</code></td>
			<td style="vertical-align: top;">This is same as `node-size` property,Only differrence is `children-node-size` will apply to only children.</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">center-node</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">undefined</td>
			<td style="vertical-align: top;">Unique identifier of node, from where plotting will start.If not specified then root node is considered and `center-node`.</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">degree</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">10</td>
			<td style="vertical-align: top;">degree defines how many levels of connections will be plotted in single chunk. (chunks are used to plot lineage in staggering way)</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">max-childrens</td>
			<td style="vertical-align: top;">Number</td>
			<td style="vertical-align: top;">8</td>
			<td style="vertical-align: top;">max number of children to display, after this scrollbar will display</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">node-template</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">''</td>
			<td style="vertical-align: top;">This is plain native html or [`@cldcvr/flow-core`](https://flow.cldcvr.com/v2/index.html?path=/story/foundation-introduction-about--page) elements. If not specified then Unique identifier of node is displayed.<br/>This template supports lit-elements template syntax as well, we can learn more ['here'](https://lit.dev/docs/v1/lit-html/template-reference/)</td>
		</tr>
		<tr>
			<td style="vertical-align: top;">children-node-template</td>
			<td style="vertical-align: top;">String</td>
			<td style="vertical-align: top;">''</td>
			<td style="vertical-align: top;">This is same as `node-template` property,Only differrence is `children-node-template` will apply to only children.</td>
		</tr>
	</tbody>
</table>
<br/>

### Examples
Checkout examples from [here](https://flow.cldcvr.com/lineage/index.html?path=/story/introduction-about--page)