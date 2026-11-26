ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	// 红石中继器
	minecraft.smithing_transform("minecraft:repeater",
		"cmi:redstone_component",
		"cmi:redstone_diode_base",
		"#forge:dusts/redstone"
	).id("minecraft:repeater")

	// 红石比较器
	minecraft.smithing_transform("minecraft:comparator",
		"cmi:redstone_component",
		"cmi:redstone_diode_base",
		"#forge:gems/quartz"
	).id("minecraft:comparator")

	// 锁存器
	minecraft.smithing_transform("create:powered_latch",
		"cmi:redstone_component",
		"cmi:redstone_diode_base",
		"create:analog_lever"
	).id("create:crafting/logistics/powered_latch")

	// 转换锁存器
	minecraft.smithing_transform("create:powered_toggle_latch",
		"cmi:redstone_component",
		"cmi:redstone_diode_base",
		"minecraft:lever"
	).id("create:crafting/logistics/powered_toggle_latch")

	// 红石继电器
	minecraft.smithing_transform("createaddition:redstone_relay",
		"cmi:redstone_component",
		"cmi:redstone_diode_base",
		"createaddition:connector"
	).id("createaddition:crafting/redstone_relay")

	// 脉冲中继器
	minecraft.smithing_transform("create:pulse_repeater",
		"cmi:redstone_component",
		"cmi:brass_diode_base",
		"minecraft:redstone"
	).id("create:crafting/logistics/pulse_repeater")

	// 脉冲延长器
	minecraft.smithing_transform("create:pulse_extender",
		"cmi:redstone_component",
		"cmi:brass_diode_base",
		"minecraft:redstone_torch"
	).id("create:crafting/logistics/pulse_extender")

	// 脉冲计时器
	minecraft.smithing_transform("create:pulse_timer",
		"cmi:redstone_component",
		"cmi:brass_diode_base",
		"#forge:gems/amethyst"
	).id("create:crafting/logistics/pulse_timer")

	// 编程脉冲生成器
	minecraft.smithing_transform("create_connected:sequenced_pulse_generator",
		"cmi:redstone_component",
		"cmi:brass_diode_base",
		"create_connected:control_chip"
	).id("create_connected:crafting/kinetics/sequenced_pulse_generator")

	// 发射器
	minecraft.smithing_transform("minecraft:dispenser",
		"cmi:redstone_component",
		"minecraft:furnace",
		"#vintageimprovements:springs"
	).id("minecraft:dispenser")

	// 投掷器
	minecraft.smithing_transform("minecraft:dropper",
		"cmi:redstone_component",
		"minecraft:furnace",
		"#vintageimprovements:small_springs"
	).id("minecraft:dropper")

	// 活塞
	minecraft.smithing_transform("minecraft:piston",
		"cmi:redstone_component",
		"minecraft:furnace",
		"#minecraft:wooden_slabs"
	).id("minecraft:piston")

	// 侦测器
	minecraft.smithing_transform("minecraft:observer",
		"cmi:redstone_component",
		"minecraft:furnace",
		"#forge:gems/quartz"
	).id("minecraft:observer")

	// 红石触点
	minecraft.smithing_transform("2x create:redstone_contact",
		"cmi:redstone_component",
		"minecraft:furnace",
		"#forge:plates/iron"
	).id("create:crafting/logistics/redstone_contact")
})