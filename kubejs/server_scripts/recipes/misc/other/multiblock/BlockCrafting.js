let $BasicBlock =
	Java.loadClass("dev.celestiacraft.libs.api.register.block.BasicBlock")

let stru1 = StructureBuilder.create([
	[
		" 0 ",
		"AAA",
		" A "
	],
	[
		"AAA",
		"AAA",
		"AAA"
	]
])
	.define("A", (builder) => {
		builder.block("minecraft:stone")
	})
	.define("0", (builder) => {
		builder.block("minecraft:obsidian")
	})
	.build()

BlockEvents.rightClicked((event) => {
	spawnEntityByMultiblock(
		event,
		"minecraft:stick",
		stru1,
		"alexscaves:submarine",
		(context) => {
			let { player, block, level } = context.event
			const CHANCE = 0.01

			if (Math.random() < CHANCE) {
				let tables = [
					"alexscaves:ortholance",
					"alexscaves:sea_staff"
				]

				let randomId = tables[
					Math.floor(Math.random() * tables.length)
				]

				let item = Item.of(randomId)
					.withNBT({
						Unbreakable: 1,
						Enchantments: [
							{}
						]
					})

				player.give(item)

				player.playNotifySound(
					"cmi:meme.welcome",
					"players",
					1,
					1
				)

				let tran = Component.translatable(
					"message.cmi.welcomeback"
				).withStyle(ChatFormatting.GOLD)

				player.displayClientMessage(tran, true)
			}
		}
	)
})

/**
 * @param {Internal.BlockRightClickedEventJS} event 
 * @param {Internal.ItemStack} item
 * @param {vazkii.patchouli.api.IMultiblock} structure 
 * @param {Internal.EntityType_<any>} entityId 
 * @param {(context: {
 *   event: Internal.BlockRightClickedEventJS,
 *   entity: Internal.ItemStack,
 *   multiblock: vazkii.patchouli.api.IMultiblock,
 *   direction: Internal.Direction_
 * }) => void} onBuild
 * @returns 
 */
function spawnEntityByMultiblock(
	event,
	item,
	structure,
	entityId,
	onBuild
) {
	let { player, block, level } = event

	if (event.hand !== InteractionHand.MAIN_HAND) {
		return
	}

	if (event.getItem() !== item) {
		return
	}

	if (structure.validate(level, block.pos) === null) {
		return
	}

	let multiblock = MultiblockHandler
		.builder(level, block.pos, () => structure)
		.renderOffset(0, -1, 0)
		.cacheTicks(20)
		.build()

	let direction = multiblock.getDirection()

	player.swing()

	if (!CmiGlobal.isDebug) {
		multiblock.destroyAll(false)
	}

	let entity = level.createEntity(entityId)
	entity.setPos(block.x + 0.5, block.y, block.z + 0.5)
	entity.spawn()

	if (direction) {
		let rot = $BasicBlock.getYRotFromFacing(direction)

		entity.setYRot(rot)
		entity.setYHeadRot(rot)
		entity.setYBodyRot(rot)
	}

	// 额外逻辑
	if (onBuild) {
		onBuild({
			event: event,
			entity: entity,
			multiblock: multiblock,
			direction: direction
		})
	}
}