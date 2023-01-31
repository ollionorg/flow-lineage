## Properties
###  Lineage  properties

<table>
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
			<td >direction</td>
			<td >String</td>
			<td >"horizontal"</td>
			<td > Defines the orientation of the lineage. Options are
			<code>horizontal</code>: nodes will be plotted from left to right.<code>vertical</code> nodes will be plotted from top to bottom. eg: <code>&lt;f-lineage direction=&quot;horizontal&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td >padding</td>
			<td >Number</td>
			<td >16</td>
			<td >Define the padding of the lineage component in pixels (px)  eg: <code> &lt;f-lineage padding=&quot;16&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td >gap</td>
			<td >Number</td>
			<td >100</td>
			<td >Define the gap between nodes in pixels (px) eg: <code>&lt;f-lineage gap=&quot;100&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td >node-size</td>
			<td >Object</td>
			<td >-</td>
			<td >The dimensions of the node template. This is required to render the node correctly. eg: <code>&lt;f-lineage :node-size.prop=&quot;{"{ width: 200, height: 52 }"}&quot;&gt;&lt;/f-lineage&gt;</code>
			</td>
		</tr>
		<tr>
			<td >children-node-size</td>
			<td >Object</td>
			<td >-</td>
			<td >The dimensions of the node children template. eg: <code>&lt;f-lineage :node-children-size.prop=&quot;{"{ width: 200, height: 32 }"}&quot;&gt;&lt;/f-lineage&gt;</code>
			</td>
		</tr>
		<tr>
			<td >center-node</td>
			<td >String</td>
			<td >root node</td>
			<td >Set which node ID is the main/center node of the entire lineage. eg: <code>&lt;f-lineage center-node=&quot;your-node-id&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td >stagger-load</td>
			<td >Number</td>
			<td >10</td>
			<td >Flow linage has a staggered load aproach for better preformance. A stagger-load defines how many levels of connections will be plotted in a single render.eg: <code>&lt;f-lineage stagger-load=&quot;10&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td >max-children</td>
			<td >Number</td>
			<td >8</td>
			<td >When a node is expanded, you can determine how many children are visible before a scrollbar apprears.eg: <code>&lt;f-lineage max-children=&quot;8&quot;&gt;&lt;/f-lineage&gt;</code></td>
		</tr>
		<tr>
			<td >node-template</td>
			<td >String</td>
			<td ><a href="#parent-node-template">template</a></td>
			<td >Nodes are visually represented through templates. You can write custom markup for your templates if required.You can find more Flow lineage templates here (coming soon).
			</td>
		</tr>
		<tr>
			<td >children-node-template</td>
			<td >String</td>
			<td ><a href="#child-node-template">template</a></td>
			<td >Just like node templates, child nodes are represented through templates.</td>
		</tr>
	</tbody>
</table>

Note: Above examples are written in VUEJS syntax when passing object to components.Refer for [Angular](https://angular.io/guide/property-binding-best-practices) and [React](https://beta.reactjs.org/learn/passing-props-to-a-component)

### Node properties
Nodes are broken into two parts, a parent node `node` and child nodes `children`.

<table>
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
			<td>templateData</td>
			<td>Object</td>
			<td>-</td>
			<td>Data contains the metadata that will be consumed by the node-templates to display information on the lineage. For Example : To display name and email address on a node, the templateData would be  <code>templateData: {"{ name: 'Harry Potter', email: 'abc@xyz.com'}"}</code>You can use templateData for both node and child nodes. <a href="#schema">View schema example</a></td>
		</tr>
		<tr>
			<td>nodeTemplate</td>
			<td>String</td>
			<td>-</td>
			<td>You can give nodes unique indiviual templates as well, by default all parent nodes inherit the <a href="#parent-node">parent node template</a></td>
		</tr>
		<tr>
			<td >click</td>
			<td >function</td>
			<td >-</td>
			<td >A callback function for when a node is clicked For Example : <code>   {"click: function (event, node) {console.log('Node Clicked', event, node);},"}             </code></td>
		</tr>
		<tr>
			<td >rightClick</td>
			<td >function</td>
			<td >-</td>
			<td >A callback function for when a node is right clicked For Example : <code>   {"rightClick: function (event, node) {console.log('Node Right Clicked', event, node);},   "}           </code></td>
		</tr>
		<tr>
			<td >children</td>
			<td >array</td>
			<td >-</td>
			<td >children contain the metadata that will be consumed by the node-child-templates to display information on the lineage. <a href="#schema">View schema example</a></td>
		</tr>
		<tr>
			<td >hideChildren</td>
			<td >Boolean</td>
			<td >true</td>
			<td >On load, all node children are collpased/hidden. Clicking on a node wil reveal its children</td>
		</tr>
	</tbody>
</table>
 <br/>

## Links 

Links are the connections drawn between nodes.

###  Link  properties
<table>
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
		<td  >from</td>
		<td >String</td>
		<td >-</td>
		<td >Unique identifier of the node from where connection line will start For Example : <code>{"[{ from: 'A', to :'B'}]"}</code> 
		</td>
	</tr>
	<tr>
		<td  >to</td>
		<td >String</td>
		<td >-</td>
		<td >Unique identifier of node that the above connection will end on  For Example : <code>{"[{ from: 'A', to: 'B'}]"}</code></td>
	</tr>
	</tbody>
</table>
