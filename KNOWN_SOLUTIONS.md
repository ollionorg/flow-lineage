### Known Solutions
1. typescript error when you consume `@cldcvr/flow-lineage` 

	Solution : copy following snippet in any shims.d.ts file, if you don't have then create new one.
	```javascript
	declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
	}

	declare module "*.css" {
	const content: Record<string, string>;
	export default content;
	}
	```
2. weird icon or component rendered.
	Solution :  there are chances that you using old version of any flow packages. you need to cross check your package.json with [this](https://www.npmjs.com/search?q=%40cldcvr%2Fflow)

3. width and height not applied properly.
	Solution : Always prefer to use `f-div` instead of any native element.