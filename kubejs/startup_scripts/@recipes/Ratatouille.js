new Schema("ratatouille:demolding")
	.simpleKey("results", "outputItemArray")
	.simpleKey("ingredients", "inputItemArray")

new Schema("ratatouille:squeezing")
	.simpleKey("results", "outputFluidOrItemArray")
	.simpleKey("ingredients", "inputFluidOrItemArray")

new Schema("ratatouille:freezing")
	.simpleKey("results", "outputItemArray")
	.simpleKey("ingredients", "inputItemArray")
	.simpleKey("processingTime", "intNumber", 100)

let $RecipeSchema =
	Java.loadClass("dev.latvian.mods.kubejs.recipe.schema.RecipeSchema")

StartupEvents.recipeSchemaRegistry((event) => {
	let { components } = event

	/**
	 * 创建一个单字段的Schema组件(如input, output, heat_requirement等)
	 *
	 * @template {keyof Special.RecipeComponents} T
	 * @param {T} type 组件类型(由KubeJS自身提供,如 "ItemInput")
	 * @param {string} key 字段名(如"input"和"output"等)
	 * @param {boolean|string|number} [optionalOrDefault]
	 * 如果为 true => 字段可选
	 * 如果为其它值 => 设置为默认值
	 */
	function field(type, key, optionalOrDefault) {
		let builder = components.get(type)().key(key)

		if (optionalOrDefault !== undefined) {
			if (optionalOrDefault === true) {
				builder = builder.defaultOptional()
			} else {
				builder = builder.optional(optionalOrDefault)
			}
		}

		return builder
	}

	/**
	 * 从字段数组构建一个完整的 RecipeSchema
	 *
	 * @param {Internal.RecipeComponentBuilder[]} fields 字段列表
	 * @returns {$RecipeSchema} 构建完成的配方 Schema
	 *
	 * @example
	 * createSchema([
	 *     field("ItemInput", "input"),
	 *     field("ItemOutput", "output"),
	 *     field("nonBlankString", "heat_requirement", true)
	 * ])
	 */
	function createSchema(fields) {
		return new $RecipeSchema.apply(null, fields)
	}

	let RecipeTypeSchema = {
		namespace: {
			recipeType: function () {
				// 这里创建多个字段
				let fields = [
					field("ItemInput", "input"),
					field("ItemOutput", "output"),
					field("nonBlankString", "heat_requirement", true)
				]
				return createSchema(fields)
			}
		}
	}

	// Example
	// event.register("create:mixing", RecipeTypeSchema.namespace.recipeType())
})