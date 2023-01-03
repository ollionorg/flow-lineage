## Flow Lineage
A lineage chart is a graphical representation of a node's ancestors, showing the relationships among nodes. It is often used in analytics to show the relations and to trace their ancestry. Lineage charts can be in the form of a hierarchy data, showing the relationships between parents and children, or they can be more complex and show the relationships between more distant nodes. Lineage charts can be useful for investigating the hierarchy of a data.

### Prerequisites

To use the Lineage, you need to install [`@cldcvr/flow-core`](https://github.com/cldcvr/flow-core) in your front-end project.
If you are starting from scratch then you can use starter-kits from [here](https://github.com/cldcvr/flow-core#starter-kits). 
### Getting started

#### Step 1: Install flow lineage
```yarn add @cldcvr/flow-lineage```

*Note:* after adding the snippets, re-start your application.


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

### Usage

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
			<td>`nodes`</td>
			<td>Object</td>
			<td>{}</td>
			<td>Description about nodes</td>
		</tr>
		<tr>
			<td>`direction`</td>
			<td>String</td>
			<td>{}</td>
			<td>Description about direction</td>
		</tr>
		<tr>
			<td>`links`</td>
			<td>Array</td>
			<td>[]</td>
			<td>Description about links</td>
		</tr>
		<tr>
			<td>`padding`</td>
			<td>Number</td>
			<td>16</td>
			<td>Description about padding</td>
		</tr>
		<tr>
			<td>`gap`</td>
			<td>Number</td>
			<td>100</td>
			<td>Description about gap</td>
		</tr>
		<tr>
			<td>`node-size`</td>
			<td>Object</td>
			<td>{}</td>
			<td>Description about node-size</td>
		</tr>
		<tr>
			<td>`center-node`</td>
			<td>String</td>
			<td>undefined</td>
			<td>Description about center-node</td>
		</tr>
		<tr>
			<td>`degree`</td>
			<td>Number</td>
			<td>10</td>
			<td>Description about degree</td>
		</tr>
		<tr>
			<td>`children-node-size`</td>
			<td>Object</td>
			<td>{}</td>
			<td>Description about children-node-size</td>
		</tr>
		<tr>
			<td>`max-childrens`</td>
			<td>Number</td>
			<td>8</td>
			<td>Description about max-childrens</td>
		</tr>
		<tr>
			<td>`node-template`</td>
			<td>String</td>
			<td>''</td>
			<td>Description about node-template</td>
		</tr>
		<tr>
			<td>`children-node-template`</td>
			<td>String</td>
			<td>''</td>
			<td>Description about children-node-template</td>
		</tr>
	</tbody>
</table>