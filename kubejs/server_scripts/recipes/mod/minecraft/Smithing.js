ServerEvents.recipes((event) => {
	let { minecraft } = event.getRecipes()

	// 红石中继器
	minecraft.smithing_transform("minecraft:repeater",
		Mechanisms.REDSTONE.COM,
		"cmi:redstone_diode_base",
		"#forge:dusts/redstone"
	).id("minecraft:repeater")

	// 红石比较器
	minecraft.smithing_transform("minecraft:comparator",
		Mechanisms.REDSTONE.COM,
		"cmi:redstone_diode_base",
		"#forge:gems/quartz"
	).id("minecraft:comparator")

	// 锁存器
	minecraft.smithing_transform("create:powered_latch",
		Mechanisms.REDSTONE.COM,
		"cmi:redstone_diode_base",
		"create:analog_lever"
	).id("create:crafting/logistics/powered_latch")

	// 转换锁存器
	minecraft.smithing_transform("create:powered_toggle_latch",
		Mechanisms.REDSTONE.COM,
		"cmi:redstone_diode_base",
		"minecraft:lever"
	).id("create:crafting/logistics/powered_toggle_latch")

	// 红石继电器
	minecraft.smithing_transform("createaddition:redstone_relay",
		Mechanisms.REDSTONE.COM,
		"cmi:redstone_diode_base",
		"createaddition:connector"
	).id("createaddition:crafting/redstone_relay")

	// 脉冲中继器
	minecraft.smithing_transform("create:pulse_repeater",
		Mechanisms.REDSTONE.COM,
		"cmi:brass_diode_base",
		"minecraft:redstone"
	).id("create:crafting/logistics/pulse_repeater")

	// 脉冲延长器
	minecraft.smithing_transform("create:pulse_extender",
		Mechanisms.REDSTONE.COM,
		"cmi:brass_diode_base",
		"minecraft:redstone_torch"
	).id("create:crafting/logistics/pulse_extender")

	// 脉冲计时器
	minecraft.smithing_transform("create:pulse_timer",
		Mechanisms.REDSTONE.COM,
		"cmi:brass_diode_base",
		"#forge:gems/amethyst"
	).id("create:crafting/logistics/pulse_timer")

	// 编程脉冲生成器
	minecraft.smithing_transform("create_connected:sequenced_pulse_generator",
		Mechanisms.REDSTONE.COM,
		"cmi:brass_diode_base",
		"create_connected:control_chip"
	).id("create_connected:crafting/kinetics/sequenced_pulse_generator")
})