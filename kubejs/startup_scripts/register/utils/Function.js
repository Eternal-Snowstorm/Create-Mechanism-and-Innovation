// priority: 101

/**
 * 
 * @param {string} name 
 * @returns 
 */
function setFluidBucketModel(name) {
	let json = new JsonWrapper()

	json.addStringProperty("parent", "forge:item/bucket_drip")
	json.addStringProperty("loader", "forge:fluid_container")
	json.addStringProperty("fluid", `${Cmi.MODID}:${name}`)

	return json.toJson()
}

/**
 * 模型定义
 * 根据 overlay 决定 2 / 3 层
 * 
 * @param {string} type 
 * @param {boolean} overlay 
 * @returns 
 */
function defineModels(type, overlay) {
	let textures = {
		layer0: `cmi:item/material/color/${type}/${type}`,
		layer1: `cmi:item/material/color/${type}/${type}_secondary`
	}

	if (overlay) {
		textures.layer2 = `cmi:item/material/color/${type}/${type}_overlay`
	}

	return {
		parent: "minecraft:item/generated",
		textures: textures
	}
}

/**
 * 
 * @typedef {Internal.Item | Internal.Block | Internal.Fluid} TagKeyType
 * @param {Internal.TagKey_<TagKeyType>} tag 
 * @returns 
 */
function useJavaTag(tag) {
	return tag.location()
}

function attachItemHandlerCapability() {
	return CapabilityBuilder.ITEM.blockEntity()
		// 允许漏斗或管道提取物品
		.extractItem((entity, slot, amount, simulate) => {
			return entity.inventory.extractItem(slot, amount, simulate)
		})
		// 允许漏斗或管道插入物品
		.insertItem((entity, slot, stack, simulate) => {
			return entity.inventory.insertItem(slot, stack, simulate)
		})
		// 获取指定槽位的物品
		.getStackInSlot((entity, slot) => {
			return entity.inventory.getStackInSlot(slot)
		})
		// 槽位堆叠上限
		.getSlotLimit((entity, slot) => {
			return entity.inventory.getSlotLimit(slot)
		})
		// 槽位总数
		.getSlots((entity) => {
			return entity.inventory.slots
		})
		// 判断物品是否能放入槽位
		.isItemValid((entity, slot, stack) => {
			return entity.inventory.isItemValid(slot, stack)
		})
}