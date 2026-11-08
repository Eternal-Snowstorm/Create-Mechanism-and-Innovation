ServerEvents.recipes((event) => {
	let { immersiveengineering } = event.getRecipes()

	immersiveengineering.blueprint("4x immersiveengineering:casull", [
		"2x cmi:nitrocellulose",
		"2x #forge:nuggets/lead",
		"4x immersiveengineering:empty_casing"
	]).blueprint("bullet")
		.id("immersiveengineering:blueprint/bullet_casull")

	immersiveengineering.blueprint("4x immersiveengineering:silver", [
		"2x cmi:nitrocellulose",
		"4x immersiveengineering:empty_casing",
		"2x #forge:nuggets/lead",
		"2x #forge:nuggets/silver"
	]).blueprint("bullet")
		.id("immersiveengineering:blueprint/bullet_silver")

	immersiveengineering.blueprint("4x immersiveengineering:armor_piercing", [
		"2x cmi:nitrocellulose",
		"4x immersiveengineering:empty_casing",
		"2x #forge:nuggets/steel",
		"2x #forge:nuggets/constantan"
	]).blueprint("bullet")
		.id("immersiveengineering:blueprint/bullet_armorpiercing")

	immersiveengineering.blueprint("4x immersiveengineering:buckshot", [
		"2x cmi:nitrocellulose",
		"4x immersiveengineering:empty_shell",
		"2x #forge:dusts/steel"
	]).blueprint("bullet")
		.id("immersiveengineering:blueprint/bullet_buckshot")

	immersiveengineering.blueprint("4x immersiveengineering:homing", [
		"2x cmi:nitrocellulose",
		"4x immersiveengineering:empty_casing",
		"2x #forge:nuggets/lead",
		"1x minecraft:ender_eye"
	]).blueprint("specialBullet")
		.id("immersiveengineering:blueprint/bullet_homing")

	immersiveengineering.blueprint("4x immersiveengineering:dragons_breath", [
		"2x cmi:nitrocellulose",
		"4x immersiveengineering:empty_shell",
		"4x #forge:dusts/aluminum"
	]).blueprint("specialBullet")
		.id("immersiveengineering:blueprint/bullet_dragonsbreath")

	immersiveengineering.blueprint("immersiveengineering:wolfpack", [
		"cmi:nitrocellulose",
		"immersiveengineering:empty_shell",
		"6x tconstruct:quartz_shuriken",
		"1x minecraft:ender_eye"
	]).blueprint("specialBullet")
		.id("immersiveengineering:blueprint/bullet_wolfpack")

	immersiveengineering.blueprint("immersiveengineering:he", [
		"cmi:nitrocellulose",
		"immersiveengineering:empty_casing",
		"thermal:explosive_grenade"
	]).blueprint("specialBullet")
		.id("immersiveengineering:blueprint/bullet_explosive")

	immersiveengineering.blueprint("immersiveengineering:potion", [
		"cmi:nitrocellulose",
		"immersiveengineering:empty_casing",
		"minecraft:glass_bottle"
	]).blueprint("specialBullet")
		.id("immersiveengineering:blueprint/bullet_potion")

})