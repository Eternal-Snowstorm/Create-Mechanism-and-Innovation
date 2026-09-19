StartupEvents.registry("fluid", (event) => {
	function addColorMaterialFluid(name, color) {
		let builder = event.create(`${Cmi.MODID}:molten_${name}`)

		builder.flowingTexture(Cmi.loadResource("fluid/metal/flow"))
		builder.stillTexture(Cmi.loadResource("fluid/metal/still"))
		builder.thinTexture(color)
		builder.bucketColor(color)
		builder.tag("forge:molten_materials")
		builder.tag(`forge:molten_${name}`)
		builder.renderType("translucent")
		builder.bucketItem.modelJson(setFluidBucketModel(name))

		console.debug(`molten_${name}已注册!`)
		return builder
	}

	// 熔融幻晶
	addColorMaterialFluid("dreamcore_molten", 0xEE8ED7)
})