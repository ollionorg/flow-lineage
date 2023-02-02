##  Lineage  properties
###### Note: Click on the property name to learn about each property.
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Type</th>
			<th>Options</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><a href="#direction">direction</a></td>
			<td>string</td>
			<td><b>horizontal | vertical</b></td>
			<td>horizontal</td>
		</tr>
		<tr>
			<td><a href="#padding">padding</a></td>
			<td>number</td>
			<td><b>"any-num-value"</b></td>
			<td>16</td>
		</tr>
		<tr>
			<td><a href="#gap">gap</a></td>
			<td>number</td>
			<td><b>"any-num-value"</b></td>
			<td>100</td>
		</tr>
		<tr>
			<td><a href="#node-size">node-size</a></td>
			<td>object</td>
			<td><b>width: num, height: num</b></td>
			<td>-</td>
		</tr>
		<tr>
			<td><a href="#node-size">children-node-size</a></td>
			<td>object</td>
			<td><b>width: num height: num</b></td>
			<td>-</td>
		</tr>
		<tr>
			<td><a href="#node-size">center-node</a></td>
			<td>string</td>
			<td><b>“your-node-id”</b></td>
			<td>root node</td>
		</tr>
		<tr>
			<td><a href="#stagger-load">stagger-load</a></td>
			<td>number</td>
			<td><b>“any-num-value”</b></td>
			<td>10</td>
		</tr>
		<tr>
			<td><a href="#stagger-load">max-children</a></td>
			<td>number</td>
			<td><b>“any-num-value”</b></td>
			<td>8</td>
		</tr>
		<tr>
			<td><a href="#stagger-load">node-template</a></td>
			<td>string</td>
			<td><b>“template-id/object-name”</b></td>
			<td>default template</td>
		</tr>
		<tr>
			<td><a href="#children-node-template">children-node-template</a></td>
			<td>string</td>
			<td><b>“template-id/object-name”</b></td>
			<td>default template</td>
		</tr>
	</thead>
</table>

###### Note: Above properties are written in VueJS syntax. Refer  Angular and React for respective syntax.

<br />

## Lineage sample

Add sample code here

<br />

<h2 id="direction">direction</h2>

Defines the orientation of the lineage.

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
		</tr>
		<tr>
			<td><strong>horizontal</strong></td>
			<td>Nodes will be plotted from left to right.</td>
			<td>default</td>
		</tr>
		<tr>
			<td><strong>vertical</strong></td>
			<td>Nodes will be plotted from top to bottom.</td>
			<td></td>
		</tr>
	</thead>
</table>

<br />

<h2 id="padding">padding</h2>

Define the padding of the lineage component in pixels (px)

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>any-num-value</strong></td>
			<td>Padding around the content of lineage component</td>
			<td>16</td>
		</tr>
	</thead>
</table>

<br />

<h2 id="gap">gap</h2>

Define the gap between nodes in pixels (px). 

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>any-num-value</strong></td>
			<td>Padding around the content of lineage component</td>
			<td>100</td>
		</tr>
	</thead>
</table>

<br />

<h2 id="node-size">node-size</h2>

Defines the dimensions of the node template.  

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
		</tr>
		<tr>
			<td width="200"><strong>width: num, height: num</strong></td>
			<td>width and height of the node template to render the node correctly</td>
			<td></td>
		</tr>
	</thead>
</table>

<br />

<h2 id="children-node-size">children-node-size</h2>

Defines the dimensions of the children node template. 

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
		</tr>
		<tr>
			<td><strong>width: num, height: num</strong></td>
			<td>width and height of the children node template to render the node correctly</td>
			<td></td>
		</tr>
	</thead>
</table>

<br />

<h2 id="center-node">center-node</h2>

Sets which node ID is the main/center node for the entire lineage

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>your-node-id</strong></td>
			<td>Sets this node id as center node. By default root node is center node.</td>
			<td>‘root node id’</td>
		</tr>
	</thead>
</table>

<br />

<h2 id="stagger-load">stagger-load</h2>

Choose how many levels or degrees of nodes you would like to draw at the same time, this helps in reducing the load on the browser or larger datasets. 

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>any-num-value</strong></td>
			<td>degree of connections to plot in single render</td>
			<td>10</td>
		</tr>
	</thead>
</table>

<br />

<h2 id="max-children">max-children</h2>

Defines the number of child nodes visible at a time when a node is expanded. If a node has child nodes beyond this number, a scroll bar appears.

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>any-num-value</strong></td>
			<td>maximum number of child nodes before a scrollbar appears</td>
			<td>8</td>
		</tr>
	</thead>
</table>

<br />

<h2 id="node-template">node-template</h2>

As nodes are represented through templates in lineage, node-template property maps to the template of a node.

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>template-id/object-name</strong></td>
			<td>Maps to the template for a node</td>
			<td><a href="#node-template-default">defaultTemplate</a></td>
		</tr>
	</thead>
</table>

<br />

<h2 id="children-node-template">children-node-template</h2>

Same as nodes, child nodes are  also represented through templates in lineage. children-node-template property maps to the template of a child node.

<table>
	<thead>
		<tr>
			<th class="row-width">Value</th>
			<th width="400">Description</th>
			<th>Default</th>
		</tr>
		<tr>
			<td><strong>template-id/object-name</strong></td>
			<td>Maps to the template for child nodes</td>
			<td><a href="#node-template-children">defaultTemplate</a></td>
		</tr>
	</thead>
</table>

<br /><br />

# Node properties

## API
###### Note: Click on the name to learn more about each oject.

<table>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Default</th>
	</tr>
	<tr>
		<td><a href="#node-id">node-id</a></td>
		<td>string</td>
		<td>-</td>
	</tr>
	<tr>
		<td><a href="#nodeTemplate">nodeTemplate</a></td>
		<td>string</td>
		<td>-</td>
	</tr>
	<tr>
		<td><a href="#templateData">templateData</a></td>
		<td>object</td>
		<td>-</td>
	</tr>
	<tr>
		<td><a href="#children">children</a></td>
		<td>array</td>
		<td>-</td>
	</tr>
	<tr>
		<td><a href="#hideChildren">hideChildren</a></td>
		<td>boolean</td>
		<td>true</td>
	</tr>
	<tr>
		<td><a href="#click">click</a></td>
		<td>function</td>
		<td>-</td>
	</tr>
	<tr>
		<td><a href="#rightClick">rightClick</a></td>
		<td>function</td>
		<td>-</td>
	</tr>
</table>

<br />

## Sample

<img src="/images/node-example.png"/>

```

node-id-1: { //Unique node id for each node
  templateData: { 
		fullName: "Robert Downey Jr.",
		description: "Movies",
		state: "secondary",
	},
	children: [                  
	{
		child-id-1: {   //Unique node id for each child node
			templateData: {
				icon: "i-hashtag",
				title: "Node child 1",
			},
    }, 
  ] 
}
```

<br />

<h2 id="node-id">Node ID</h2>

The data required by each node is identified by a unique node ID in the node schema. For example, ‘tony’ in this example is an unique node id. This node ID is also used for setting up link properties. 
	
<div class="split">
	<div>
		<div class="title">Node example</div>
	</div>
	<div>
		<div class="title">Node data example</div>
		<pre>add code here</pre>
	</div>
</div>

<br />

<h2 id="nodeTemplate">nodeTemplate</h2>

Nodes are represented through templates, you can pass custom markup to create a custom nodes. A node template is defined at the lineage level but can also be overwritten at an individual node level.
	
<div class="split">
	<div>
		<div class="title">Node example</div>
	</div>
	<div>
		<div class="title">Node data example</div>
		<pre>add code here</pre>
	</div>
</div>

<br />

<h2 id="templateData">templateData</h2>

Each node is represented visually by a node Template. The data required by each node, needs to be present in the node schema . For example, if you a have node that has to display basic user information like name, email, and phone number, and a success state then the templateData would be like below.
	
###### Note: Use “\${node.data.key}” to access templateData in your node template. 

<div class="split">
	<div>
		<div class="title">Node example</div>
	</div>
	<div>
		<div class="title">Node data example</div>
		<pre>add code here</pre>
	</div>
</div>

<br />

<h2 id="children">children</h2>

Each node can have related data represented as children. For example if tony stark were to have friends, then the friends would be represented as node children. 

<div class="split">
	<div>
		<div class="title">Node example</div>
	</div>
	<div>
		<div class="title">Node data example</div>
		<pre>add code here</pre>
	</div>
</div>


<br />

<h2 id="hideChildren">hideChildren</h2>

Boolean that defines whether node children will be visible on load or not.
	
###### Note: On load, all node children are collpased/hidden. Clicking on a node will reveal its children

<div class="split">
	<div>
		<div class="title">Node example</div>
	</div>
	<div>
		<div class="title">Node data example</div>
		<pre>add code here</pre>
	</div>
</div>

<br />

<h2 id="click">click</h2>

A callback function for when a node is clicked. Eg:	

```
click: function (event, node) {
	console.log("Node Clicked", event, node);
},
```

<br />

<h2 id="rightClick">rightClick</h2>

A callback function for when a node is right clicked. Eg:

```
rightClick: function (event, node) {
	console.log("Node is right clicked", event, node);
},
```

# Link properties

## API
###### Note: Click on the name to learn more about each oject.

<table>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Default</th>
	</tr>
	<tr>
		<td><a href="#to">to</a></td>
		<td>string</td>
		<td>-</td>
	</tr>
	<tr>
		<td><a href="#from">from</a></td>
		<td>string</td>
		<td>-</td>
	</tr>
</table>

<br />

## Sample

Links are connections between the nodes. Example:

```
links: [ 
	{
		from: "node1",	// node to node link
		to: "node2", 
	}, 
	{
		from: "node2",  // use a reverse link of already defined link to make bidirectional connection
		to: "node1", 
	},
	{
		from: "node1",  // node to child link
		to: "child2",
	}, 
	{
		from: "child1", // child to child link
		to: "child3",
	},
],
```

<br />

<h2 id="to">to</h2>

Unique identifier of the node  where connection line will end. For example:

```
[{ from: 'A', to :'B'}]
```

<br />

<h2 id="from">from</h2>

Unique identifier of the node from where connection line will start. For example:

```
[{ from: 'A', to :'B'}]
```

