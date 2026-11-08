ServerEvents.recipes((event) => {
	let { kubejs } = event.getRecipes()

	// 配置工具
	kubejs.shapeless("functionalstorage:configuration_tool", [
		"#forge:plates/stone",
		Mechanisms.WOODEN.COM,
		"#forge:gears/wooden"
	]).id("functionalstorage:configuration_tool")

	kubejs.shapeless("functionalstorage:linking_tool", [
		"#forge:plates/iron",
		Mechanisms.WOODEN.COM,
		"#forge:gears/wooden"
	]).id("functionalstorage:linking_tool")
})