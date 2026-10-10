ServerEvents.highPriorityData((event) => {
	addAdvancement("start", {
		criteria: {
			0: {
				conditions: {},
				trigger: "minecraft:inventory_changed"
			}
		},
		display: {
			announce_to_chat: false,
			background: "cmi:textures/gui/advancements/main.png",
			description: {
				color: "#DBA213",
				translate: "advancements.cmi.start.desc"
			},
			frame: "task",
			hidden: false,
			icon: {
				item: "create:precision_mechanism"
			},
			show_toast: true,
			title: {
				translate: "advancements.cmi.start"
			}
		},
		requirements: [
			[
				"0"
			]
		],
		sends_telemetry_event: true
	})

	addAdvancement("echoes_north_star", {
		parent: "cmi:start",
		criteria: {
			get_water_well: {
				conditions: {
					items: [
						{
							items: [
								"cmi:water_well"
							]
						}
					]
				},
				trigger: "minecraft:inventory_changed"
			}
		},
		rewards: {
			loot: [
				"cmi:gameplay/torn_parchment_a"
			]
		},
		display: {
			announce_to_chat: false,
			description: {
				color: "#00b7ffff",
				translate: "advancements.cmi.north_star.desc"
			},
			frame: "goal",
			hidden: true,
			icon: {
				item: "cmi:torn_parchment_a"
			},
			show_toast: true,
			title: {
				translate: "advancements.cmi.north_star"
			},
			requirements: [
				[
					"get_water_well"
				]
			]
		}
	})

	addAdvancement("echoes_south_cross", {
		parent: "cmi:echoes_north_star",
		criteria: {
			get_accelerator: {
				conditions: {
					items: [
						{
							items: [
								"cmi:accelerator"
							]
						}
					]
				},
				trigger: "minecraft:inventory_changed"
			}
		},
		rewards: {
			loot: [
				"cmi:gameplay/torn_parchment_b"
			]
		},
		display: {
			announce_to_chat: false,
			description: {
				color: "#fdba00ff",
				translate: "advancements.cmi.south_cross.desc"
			},
			frame: "goal",
			hidden: true,
			icon: {
				item: "cmi:torn_parchment_b"
			},
			show_toast: true,
			title: {
				translate: "advancements.cmi.south_cross"
			},
			requirements: [
				[
					"get_accelerator"
				]
			]
		}
	})

	addAdvancement("meet", {
		parent: "cmi:echoes_south_cross",
		criteria: {
			0: {
				conditions: {
					items: [
						{
							items: [
								"cmi:parchment"
							]
						}
					]
				},
				trigger: "minecraft:inventory_changed"
			}
		},
		display: {
			announce_to_chat: false,
			description: {
				color: "#DBA213",
				translate: "advancements.cmi.meet.desc"
			},
			frame: "challenge",
			hidden: true,
			icon: {
				item: "ae2:quantum_entangled_singularity"
			},
			show_toast: true,
			title: {
				translate: "advancements.cmi.meet"
			}
		},
		requirements: [
			[
				"0"
			]
		],
		rewards: {
			experience: 100
		},
		sends_telemetry_event: true
	})

	// addAdvancement("academic_fraud", {
	// 	parent: "cmi:start",
	// 	criteria: {
	// 		no_blast_furnace_iron: {
	// 			trigger: "cmi:academic_fraud",
	// 			conditions: {}
	// 		}
	// 	},
	// 	display: {
	// 		announce_to_chat: true,
	// 		description: {
	// 			color: "#DBA213",
	// 			translate: "advancements.cmi.academic_fraud.desc"
	// 		},
	// 		frame: "challenge",
	// 		hidden: true,
	// 		icon: {
	// 			item: "minecraft:iron_ingot"
	// 		},
	// 		show_toast: true,
	// 		title: {
	// 			translate: "advancements.cmi.academic_fraud"
	// 		}
	// 	},
	// 	requirements: [
	// 		[
	// 			"no_blast_furnace_iron"
	// 		]
	// 	]
	// })

	addAdvancement("fraud", {
		parent: "cmi:start",
		criteria: {
			get_water_well: {
				conditions: {
					items: [
						{
							items: [
								"cmi:togni_leets"
							]
						}
					]
				},
				trigger: "minecraft:inventory_changed"
			}
		},
		display: {
			announce_to_chat: false,
			description: {
				color: "#00b7ffff",
				translate: "advancements.cmi.fraud.desc"
			},
			frame: "goal",
			hidden: true,
			icon: {
				item: "cmi:togni_leets"
			},
			show_toast: true,
			title: {
				translate: "advancements.cmi.fraud"
			},
			requirements: [
				[
					"get_togni_leets"
				]
			]
		}
	})

	addAdvancement("fked_up", {
		parent: "ae2:main/storage_cell",
		criteria: {
			get_obsidian_cell: {
				conditions: {
					items: [
						{
							items: [
								"cmi:obsidian_cell"
							]
						}
					]
				},
				trigger: "minecraft:inventory_changed"
			}
		},
		display: {
			announce_to_chat: true,
			description: {
				color: "#00b7ffff",
				text: "he f**ked up"
			},
			frame: "challenge",
			hidden: true,
			icon: {
				item: "cmi:obsidian_cell"
			},
			show_toast: false,
			title: {
				text: "it was at this moment that he knew"
			},
			requirements: [
				[
					"get_obsidian_cell"
				]
			]
		}
	})

	/**
	 * 
	 * @param {string} name 
	 * @param {Internal.JsonElement_} json 
	 */
	function addAdvancement(name, json) {
		event.addJson(Cmi.loadResource(`advancements/${name}.json`), json)
	}
})