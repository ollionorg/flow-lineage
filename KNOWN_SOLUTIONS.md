### Known Solutions
1. typescript error when you consume `@cldcvr/flow-lineage` 
![Screenshot 2023-01-09 at 9 25 04 PM](https://user-images.githubusercontent.com/67629551/211354086-3c10adb4-cd67-4cf5-8c69-cd79ac5fa095.png)

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

	<img width="1170" alt="Screenshot 2023-01-05 at 5 13 48 PM" src="https://user-images.githubusercontent.com/67629551/211354190-54d9b575-a106-44c0-b80d-74f4f9d2a874.png">

	Solution :  there are chances that you using old version of any flow packages. you need to cross check your package.json with [this](https://www.npmjs.com/search?q=%40cldcvr%2Fflow)

3. width and height not applied properly.
	Solution : Always prefer to use `f-div` as wrapper element instead of any native element.
