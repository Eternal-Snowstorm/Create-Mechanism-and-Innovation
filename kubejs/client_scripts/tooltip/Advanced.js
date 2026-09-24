let $FontHelper$Palette =
	Java.loadClass("net.createmod.catnip.lang.FontHelper$Palette")

ItemEvents.tooltip((event) => {
	// 制作组fumo
	addAdvancedTooltip("cmi:re_construction")
	addAdvancedTooltip("cmi:dkrkoo_weihe")
	addAdvancedTooltip("cmi:dropper_qwq")
	addAdvancedTooltip("cmi:117458866249")
	addAdvancedTooltip("cmi:random_mechanism")
	addAdvancedTooltip("cmi:eternalsnowstorm")
	addAdvancedTooltip("cmi:qi_month")
	addAdvancedTooltip("cmi:ein_nameuwu")
	addAdvancedTooltip("cmi:huanchenxiaohuli")
	addAdvancedTooltip("cmi:belalus")
	addAdvancedTooltip("cmi:fiber_optics")
	addAdvancedTooltip("cmi:ye_anqing")
	addAdvancedTooltip("cmi:sakura_star_cn")
	addAdvancedTooltip("cmi:qicaijie")
	addAdvancedTooltip("cmi:flash_yi")
	addAdvancedTooltip("cmi:keyxeldesu")
	addAdvancedTooltip("cmi:sergei")
	addAdvancedTooltip("cmi:lirx_owo")

	// 繁星核心
	addAdvancedTooltip("cmi:astral_core")
	addAdvancedTooltip("cmi:impact_pile")

	/**
	 * 
	 * @param {Internal.Ingredient_} ingredient 
	 */
	function addAdvancedTooltip(ingredient) {
		event.addAdvanced(ingredient, (item, advanced, tooltip) => {
			let itemTooltipTranslateKey = `tooltip.${ingredient}`.replace(":", ".")
			tooltip.add(Component.translatable(itemTooltipTranslateKey))
		})
	}

	// 末影构件
	event.addAdvanced("cmi:ender_mechanism", (item, advanced, tooltip) => {
		if (item.hasNBT()) {
			let nbt = item.getNbt()

			let x = nbt.x
			let y = nbt.y
			let z = nbt.z

			let dimId = nbt.dim

			if (dimId) {
				// 转成翻译键
				let dimKey = "dimension." + dimId.replace(":", ".")
				let dim = Component.translatable(dimKey)
				let tranKey = Component.translatable(
					"tooltip.cmi.stored_location",
					dim,
					x,
					y,
					z
				).red()

				tooltip.add(tranKey)
			}
		}
	})

	event.addAdvanced("moreburners:electric_burner", (item, advanced, tooltip) => {
		tooltip.add(Component.translatable("tooltip.moreburners.electric_burner.1"))
		tooltip.add(Component.translatable("tooltip.moreburners.electric_burner.2"))
	})

	event.addAdvanced("cmi:electronic_blast_furnace", (item, advanced, tooltip) => {
		CmiLang.isShiftDown(tooltip)

		if (event.isShift()) {
			tooltip.add(Component.empty())

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.-1").getString(),
				$FontHelper$Palette.STANDARD_CREATE
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.0").getString(),
				$FontHelper$Palette.STANDARD_CREATE
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.type.0").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.type.1").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.type.2").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.type.3").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.type.4").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.type.5").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.add(Component.empty())

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.1").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				0
			))

			tooltip.add(Component.empty())

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.2").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				0
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.3").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.4").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.addAll(TooltipHelper.cutStringTextComponent(
				Component.translatable("tooltip.electronic_blast_furnace.5").getString(),
				$FontHelper$Palette.STANDARD_CREATE.primary(),
				$FontHelper$Palette.STANDARD_CREATE.highlight(),
				1
			))

			tooltip.add(Component.empty())
		}
	})
})