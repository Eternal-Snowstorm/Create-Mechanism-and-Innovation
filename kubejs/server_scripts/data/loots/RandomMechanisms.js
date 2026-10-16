ServerEvents.genericLootTables((event) => {
	event.addGeneric("cmi:gameplay/random_mechanisms/basic", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("cmi:wooden_faucet")
				.randomChance(0.125)
			pool.addItem("minecraft:flint_and_steel")
				.randomChance(0.025)
			pool.addItem("supplementaries:faucet")
				.randomChance(0.125)
			pool.addItem("4x minecraft:hopper")
				.randomChance(0.25)
			pool.addItem("4x minecraft:furnace")
				.randomChance(0.25)
			pool.addItem("minecraft:observer")
				.randomChance(0.25)
			pool.addItem("minecraft:minecart")
				.randomChance(0.25)
			pool.addItem("8x minecraft:rail")
				.randomChance(0.25)
			pool.addItem("4x thermal:rubberwood_sapling")
				.randomChance(0.25)
			pool.addItem("4x minecraft:chest")
				.randomChance(0.25)
			pool.addItem("64x minecraft:oak_log")
				.randomChance(0.125)
			pool.addItem("4x minecraft:raw_gold")
				.randomChance(0.25)
			pool.addItem("4x minecraft:raw_iron")
				.randomChance(0.25)
			pool.addItem("tconstruct:seared_faucet")
				.randomChance(0.25)
			pool.addItem("tconstruct:seared_fuel_tank")
				.randomChance(0.25)
			pool.addItem("4x tconstruct:seared_bricks")
				.randomChance(0.25)
			pool.addItem("4x tconstruct:seared_channel")
				.randomChance(0.25)
			pool.addItem("tconstruct:seared_table")
				.randomChance(0.25)
			pool.addItem("4x minecraft:golden_carrot")
				.randomChance(0.25)
			pool.addItem("minecraft:golden_apple")
				.randomChance(0.125)
			pool.addItem("minecraft:bucket")
				.randomChance(0.125)
			pool.addItem("minecraft:enchanted_golden_apple")
				.randomChance(0.0001)
			pool.addItem("cmi:drawer_upgrade_template")
				.randomChance(0.25)
			pool.addItem("4x minecraft:andesite")
				.randomChance(0.25)
			pool.addItem("4x cmi:andesite_dust")
				.randomChance(0.25)
			pool.addItem("8x cmi:wood_chip_briquette")
				.randomChance(0.25)
			pool.addItem("4x cmi:compressed_wood_chip_briquette")
				.randomChance(0.25)
			pool.addItem("2x cmi:densely_packed_wood_chip_briquette")
				.randomChance(0.25)
			pool.addItem("cmi:creosote_wood_chip_briquette")
				.randomChance(0.25)
			pool.addItem("32x minecraft:torch")
				.randomChance(0.25)
			pool.addItem("4x minecraft:lantern")
				.randomChance(0.25)
			pool.addItem("1x cmi:basic_random_mechanism")
				.randomChance(0.0125)
			pool.setUniformRolls(2, 8)
		})
	})
	event.addGeneric("cmi:gameplay/random_mechanisms/mechanical", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x minecraft:raw_copper")
				.randomChance(0.25)
			pool.addItem("4x create:raw_zinc")
				.randomChance(0.25)
			pool.addItem("4x thermal:raw_tin")
				.randomChance(0.25)
			pool.addItem("32x thermal:sulfur")
				.randomChance(0.25)
			pool.addItem("4x create:brass_ingot")
				.randomChance(0.25)
			pool.addItem("4x create:shaft")
				.randomChance(0.25)
			pool.addItem("4x create:cogwheel")
				.randomChance(0.25)
			pool.addItem("4x thermal:cured_rubber")
				.randomChance(0.125)
			pool.addItem("4x vintageimprovements:bronze_spring")
				.randomChance(0.25)
			pool.addItem("2x cmi:charged_amethyst")
				.randomChance(0.25)
			pool.addItem("4x minecraft:quartz_block")
				.randomChance(0.25)
			pool.addItem("4x minecraft:observer")
				.randomChance(0.25)
			pool.addItem("4x create:experience_nugget")
				.randomChance(0.25)
			pool.addItem("create:brass_hand")
				.randomChance(0.025)
			pool.addItem("create:whisk")
				.randomChance(0.125)
			pool.addItem("create:propeller")
				.randomChance(0.125)
			pool.addItem("create:sturdy_sheet")
				.randomChance(0.025)
			pool.addItem("create:powdered_obsidian")
				.randomChance(0.125)
			pool.addItem("minecraft:daylight_detector")
				.randomChance(0.025)
			pool.addItem("2x create:belt")
				.randomChance(0.25)
			pool.addItem("create:blaze_burner")
				.randomChance(0.25)
			pool.addItem("4x create:fluid_pipe")
				.randomChance(0.25)
			pool.addItem("4x create:piston_extension_pole")
				.randomChance(0.25)
			pool.addItem("2x create:redstone_link")
				.randomChance(0.25)
			pool.addItem("create:stockpile_switch")
				.randomChance(0.025)
			pool.addItem("4x create:brass_tunnel")
				.randomChance(0.125)
			pool.addItem("4x create:andesite_tunnel")
				.randomChance(0.25)
			pool.addItem("4x create:brass_funnel")
				.randomChance(0.125)
			pool.addItem("4x create:andesite_funnel")
				.randomChance(0.25)
			pool.addItem("4x create:track")
				.randomChance(0.25)
			pool.addItem("4x create:white_sail")
				.randomChance(0.25)
			pool.addItem("4x create:linear_chassis")
				.randomChance(0.25)
			pool.addItem("1x cmi:mechanical_random_mechanism")
				.randomChance(0.0125)
			pool.setUniformRolls(2, 8)
		})
	})
	event.addGeneric("cmi:gameplay/random_mechanisms/engineering", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x immersiveengineering:coal_coke")
				.randomChance(0.25)
			pool.addItem("8x immersiveengineering:treated_wood_horizontal")
				.randomChance(0.25)
			pool.addItem("4x immersiveengineering:component_iron")
				.randomChance(0.25)
			pool.addItem("4x immersiveengineering:component_steel")
				.randomChance(0.125)
			pool.addItem("immersiveengineering:generator")
				.randomChance(0.025)
			pool.addItem("immersiveengineering:radiator")
				.randomChance(0.025)
			pool.addItem("immersiveengineering:heavy_engineering")
				.randomChance(0.0125)
			pool.addItem("immersiveengineering:light_engineering")
				.randomChance(0.025)
			pool.addItem("immersiveengineering:rs_engineering")
				.randomChance(0.025)
			pool.addItem("immersiveengineering:connector_lv_relay")
				.randomChance(0.125)
			pool.addItem("immersiveengineering:connector_lv")
				.randomChance(0.125)
			pool.addItem("cmi:simple_battery")
				.randomChance(0.125)
			pool.addItem("immersiveengineering:electron_tube")
				.randomChance(0.125)
			pool.addItem("immersiveengineering:wirecoil_copper")
				.randomChance(0.25)
			pool.addItem("4x immersiveengineering:sheetmetal_steel")
				.randomChance(0.25)
			pool.addItem("4x immersiveengineering:sheetmetal_aluminum")
				.randomChance(0.25)
			pool.addItem("4x immersiveengineering:steel_scaffolding_standard")
				.randomChance(0.25)
			pool.addItem("immersiveengineering:conveyor_basic")
				.randomChance(0.25)
			pool.addItem("immersiveengineering:component_electronic")
				.randomChance(0.125)
			pool.addItem("immersiveengineering:light_bulb")
				.randomChance(0.25)
			pool.addItem("4x minecraft:raw_iron")
				.randomChance(0.25)
			pool.addItem("4x minecraft:raw_copper")
				.randomChance(0.25)
			pool.addItem("cmi:engineering_random_mechanism")
				.randomChance(0.0125)
			pool.setUniformRolls(2, 8)
		})
	})
	event.addGeneric("cmi:gameplay/random_mechanisms/flux", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x thermal:tin_ingot")
				.randomChance(0.25)
			pool.addItem("4x thermal:lead_ingot")
				.randomChance(0.125)
			pool.addItem("4x thermal:silver_ingot")
				.randomChance(0.125)
			pool.addItem("4x thermal:nickel_ingot")
				.randomChance(0.125)
			pool.addItem("4x thermal:apatite")
				.randomChance(0.25)
			pool.addItem("4x thermal:cinnabar")
				.randomChance(0.25)
			pool.addItem("4x thermal:niter")
				.randomChance(0.25)
			pool.addItem("4x thermal:sulfur")
				.randomChance(0.25)
			pool.addItem("4x thermal:bitumen")
				.randomChance(0.25)
			pool.addItem("8x minecraft:iron_ingot")
				.randomChance(0.25)
			pool.addItem("8x minecraft:copper_ingot")
				.randomChance(0.25)
			pool.addItem("4x minecraft:gold_ingot")
				.randomChance(0.25)
			pool.addItem("8x minecraft:redstone")
				.randomChance(0.25)
			pool.addItem("4x minecraft:diamond")
				.randomChance(0.125)
			pool.addItem("4x minecraft:ender_pearl")
				.randomChance(0.25)
			pool.addItem("4x thermal:redstone_servo")
				.randomChance(0.25)
			pool.addItem("4x thermal:rf_coil")
				.randomChance(0.125)
			pool.addItem("4x minecraft:blaze_powder")
				.randomChance(0.01)
			pool.addItem("4x thermal:basalz_powder")
				.randomChance(0.01)
			pool.addItem("4x thermal:blitz_powder")
				.randomChance(0.01)
			pool.addItem("4x thermal:blizz_powder")
				.randomChance(0.01)
			pool.setUniformRolls(2, 4)
		})
	})

	// flux
	// ['4x pipez:energy_pipe', 
	// 	'4x pipez:fluid_pipe', 
	// 	'4x pipez:item_pipe',
	// 	 'pipez:basic_upgrade',
	// 	  'thermal:dynamo_stirling',
	// 	   'thermal:upgrade_augment_1', 
	// 	   'thermal:rf_coil',
	// 	    'thermal:rf_coil_augment', 
	// 	'thermal:rf_coil_xfer_augment']
	// ['thermal:area_radius_augment',
	// 	 'thermal:potion_duration_augment',
	// 	  'thermal:potion_amplifier_augment',
	// 	   'thermal:machine_output_augment',
	// 	    'thermal:machine_catalyst_augment', 
	// 		'thermal:machine_efficiency_augment',
	// 		 'thermal:machine_speed_augment',
	// 		  'thermal:flux_capacitor',
	// 	 'thermal:phytogro']
	// ['thermal:florb']
	// ['thermal:raw_tin',
	// 	 'thermal:raw_lead',
	// 	 'thermal:raw_silver', 
	// 	'thermal:raw_nickel', 
	// 	'minecraft:raw_gold',
	// 	 'minecraft:raw_copper', 
	// 	'minecraft:raw_iron']

	event.addGeneric("cmi:gameplay/random_mechanisms/magical", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x minecraft:lapis_lazuli")
				.randomChance(0.25)
			pool.addItem("4x create:experience_nugget")
				.randomChance(0.25)
			pool.addItem(Item.of("minecraft:potion", "{Potion:'minecraft:night_vision'}"))
				.randomChance(0.125)
			pool.addItem(Item.of("minecraft:potion", "{Potion:'minecraft:swiftness'}"))
				.randomChance(0.125)
			pool.addItem("4x minecraft:ender_pearl")
				.randomChance(0.25)
			pool.addItem("4x minecraft:sculk")
				.randomChance(0.25)
			pool.addItem("4x minecraft:quartz")
				.randomChance(0.25)
			pool.addItem("4x minecraft:blaze_rod")
				.randomChance(0.125)
			pool.addItem("4x minecraft:netherite_scrap")
				.randomChance(0.125)
			pool.addItem("4x minecraft:gold_ingot")
				.randomChance(0.25)
			pool.setUniformRolls(4, 8)
		})
	})

	// ['supplementaries:antique_ink',
	// 	 'minecraft:scute',
	// 	  'minecraft:slime_ball',
	// 	   'minecraft:rabbit_hide',
	// 	    'minecraft:netherite_scrap',
	// 		 'minecraft:sunflower', 
	// 		 'minecraft:lilac',
	// 		  'minecraft:rose_bush', 
	// 	'minecraft:peony']
	// ['8x minecraft:ender_pearl',
	// 	 'minecraft:glow_ink_sac', 
	// 	 'minecraft:nautilus_shell', 
	// 	 'minecraft:echo_shard', 
	// 	 'minecraft:magma_cream', 
	// 	 'minecraft:rabbit_foot', 
	// 	 'minecraft:ghast_tear', 
	// 	 'minecraft:phantom_membrane', 
	// 	'minecraft:experience_bottle']
	// ['minecraft:pitcher_plant', 
	// 	'minecraft:sniffer_egg', 
	// 	'tconstruct:pig_iron_ingot']
	event.addGeneric("cmi:gameplay/random_mechanisms/quantum", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x ae2:singularity")
				.randomChance(0.125)
			pool.addItem("4x ae2:quantum_entangled_singularity")
				.randomChance(0.125)
			pool.addItem("4x ae2:fluix_crystal")
				.randomChance(0.25)
			pool.addItem("4x ae2:matter_ball")
				.randomChance(0.25)
			pool.addItem("4x ae2:cell_component_1k")
				.randomChance(0.25)
			pool.addItem("4x ae2:logic_processor")
				.randomChance(0.25)
			pool.addItem("4x ae2:calculation_processor")
				.randomChance(0.25)
			pool.addItem("4x ae2:engineering_processor")
				.randomChance(0.25)
			pool.addItem("8x ae2:certus_quartz_crystal")
				.randomChance(0.25)
			pool.addItem("mekanism:pellet_plutonium")
				.randomChance(0.05)
			pool.addItem("mekanism:pellet_polonium")
				.randomChance(0.05)
			pool.setUniformRolls(4, 8)
		})
	})
	event.addGeneric("cmi:gameplay/random_mechanisms/mekanism", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x mekanism:alloy_infused")
				.randomChance(0.25)
			pool.addItem("4x mekanism:alloy_reinforced")
				.randomChance(0.125)
			pool.addItem("4x mekanism:alloy_atomic")
				.randomChance(0.125)
			pool.addItem("4x mekanism:basic_control_circuit")
				.randomChance(0.25)
			pool.addItem("4x tconstruct:steel_ingot")
				.randomChance(0.25)
			pool.addItem("4x mekanism:ingot_osmium")
				.randomChance(0.25)
			pool.addItem("4x thermal:tin_ingot")
				.randomChance(0.25)
			pool.addItem("4x thermal:lead_ingot")
				.randomChance(0.25)
			pool.addItem("4x immersiveengineering:ingot_uranium")
				.randomChance(0.25)
			pool.addItem("8x minecraft:iron_ingot")
				.randomChance(0.25)
			pool.addItem("4x minecraft:gold_ingot")
				.randomChance(0.25)
			pool.addItem("mekanism:qio_drive_base")
				.randomChance(0.25)
			pool.addItem("4x mekanism:hdpe_pellet")
				.randomChance(0.25)
			pool.addItem("4x minecraft:obsidian")
				.randomChance(0.25)
			pool.setUniformRolls(3, 6)
		})
	})
	// ['mekanismgenerators:solar_panel',
	// 	 'mekanism:structural_glass',
	// 	  'mekanism:induction_casing', 
	// 	  'mekanism:dynamic_tank', 
	// 	  'mekanism:boiler_casing',
	// 	   'mekanismgenerators:fission_reactor_casing',
	// 	    'mekanismgenerators:turbine_casing',
	// 		 'mekanism:enriched_diamond', 
	// 		 'mekanism:enriched_redstone',
	// 		  'mekanism:enriched_carbon',
	// 		   'mekanism:basic_tier_installer',
	// 		    'mekanism:upgrade_muffling',
	// 			 'mekanism:upgrade_energy', 
	// 			 'mekanism:upgrade_speed',
	// 			  'mekanism:module_base', 
	// 			  'mekanism:energy_tablet', 
	// 			  'thermal:raw_lead', 
	// 			  'thermal:raw_tin',
	// 			   'mekanism:raw_osmium',
	// 			    'mekanism:dirty_netherite_scrap',
	// 				 'mekanism:electrolytic_core',
	// 				  'mekanism:hdpe_pellet',
	// 				   'mekanism:enriched_tin',
	// 				    'mekanism:enriched_gold',
	// 					 'mekanism:enriched_refined_obsidian', 
	// 					 'mekanism:cardboard_box',
	// 					  'mekanism:basic_chemical_tank', 
	// 					  'mekanism:basic_logistical_transporter', 
	// 					  'mekanism:basic_thermodynamic_conductor',
	// 					   'mekanism:basic_pressurized_tube',
	// 					    'mekanism:basic_universal_cable',
	// 						 'mekanism:basic_mechanical_pipe',
	// 						  'mekanism:basic_fluid_tank', 
	// 'mekanismadditions:blue_glow_panel']
	event.addGeneric("cmi:gameplay/random_mechanisms/space", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("4x ad_astra:steel_cable")
				.randomChance(0.25)
			pool.addItem("4x ad_astra:desh_fluid_pipe")
				.randomChance(0.25)
			pool.addItem("4x ad_astra:photovoltaic_etrium_cell")
				.randomChance(0.125)
			pool.addItem("8x minecraft:iron_ingot")
				.randomChance(0.25)
			pool.addItem("4x tconstruct:steel_ingot")
				.randomChance(0.25)
			pool.addItem("4x ad_astra:desh_ingot")
				.randomChance(0.25)
			pool.addItem("4x ad_astra:ostrum_ingot")
				.randomChance(0.125)
			pool.addItem("4x ad_astra:calorite_ingot")
				.randomChance(0.125)
			pool.addItem("4x ae2:sky_stone_block")
				.randomChance(0.25)
			pool.addItem("cmi:rocket_pattern")
				.randomChance(0.25)
			pool.addItem("2x ad_astra:rocket_nose_cone")
				.randomChance(0.25)
			pool.addItem("2x ad_astra:rocket_fin")
				.randomChance(0.25)
			pool.setUniformRolls(3, 6)
		})
	})
	event.addGeneric("cmi:gameplay/random_mechanisms/random", (builder) => {
		builder.addPool((pool) => {
			pool.addItem("cmi:basic_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:mechanical_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:engineering_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:flux_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:magical_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:quantum_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:mekanism_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:space_random_mechanism")
				.count([4, 8])
				.randomChance(0.125)
			pool.addItem("cmi:random_random_mechanism")
				.randomChance(0.0125)
			pool.setUniformRolls(2, 8)
		})
	})
})