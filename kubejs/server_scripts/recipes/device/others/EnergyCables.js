ServerEvents.recipes((event) => {
    let { kubejs } = event.getRecipes()

    // 绝缘线缆
    kubejs.shapeless("16x ad_astra:steel_cable", [
        "2x #forge:wires/copper",
        "thermal:cured_rubber"
    ]).id("ad_astra:steel_cable")

    // 中压线缆
    kubejs.shapeless("16x ad_astra:desh_cable", [
        "2x #forge:wires/electrum",
        "thermal:cured_rubber"
    ]).id("ad_astra:desh_cable")

    // IE绝缘线缆
    kubejs.shapeless("immersiveengineering:wirecoil_copper_ins", [
        "immersiveengineering:wirecoil_copper",
        "thermal:cured_rubber"
    ]).id("immersiveengineering:crafting/wirecoil_copper_ins")

    kubejs.shapeless("thermal:cured_rubber", [
        "immersiveengineering:wirecoil_copper_ins"
    ]).replaceIngredient(
        "immersiveengineering:wirecoil_copper_ins",
        "immersiveengineering:wirecoil_copper"
    ).id("immersiveengineering:crafting/strip_lv")

    kubejs.shapeless("immersiveengineering:wirecoil_electrum_ins", [
        "immersiveengineering:wirecoil_electrum",
        "thermal:cured_rubber"
    ]).id("immersiveengineering:crafting/wirecoil_electrum_ins")

    kubejs.shapeless("thermal:cured_rubber", [
        "immersiveengineering:wirecoil_electrum_ins"
    ]).replaceIngredient(
        "immersiveengineering:wirecoil_electrum_ins",
        "immersiveengineering:wirecoil_electrum"
    ).id("immersiveengineering:crafting/strip_mv")

    // CCA连接器
    kubejs.shapeless("createaddition:connector", [
        "#forge:plates/andesite_alloy",
        "#forge:rods/copper",
        "thermal:cured_rubber"
    ]).id("createaddition:crafting/small_connector_copper")

    kubejs.shapeless("createaddition:large_connector", [
        "2x #forge:plates/andesite_alloy",
        "#forge:rods/electrum",
        "thermal:cured_rubber"
    ]).id("createaddition:crafting/large_connector_electrum")

    // IE接线器
    kubejs.shapeless("immersiveengineering:connector_lv", [
        "#immersiveengineering:connector_insulator",
        "#forge:rods/copper"
    ]).id("immersiveengineering:crafting/connector_lv")

    kubejs.shapeless("immersiveengineering:connector_lv", [
        "immersiveengineering:connector_lv_relay"
    ])

    kubejs.shapeless("immersiveengineering:connector_lv_relay", [
        "immersiveengineering:connector_lv"
    ]).id("immersiveengineering:crafting/connector_lv_relay")

    kubejs.shapeless("immersiveengineering:connector_mv", [
        "#immersiveengineering:connector_insulator",
        "#forge:rods/electrum"
    ]).id("immersiveengineering:crafting/connector_mv")

    kubejs.shapeless("immersiveengineering:connector_mv", [
        "immersiveengineering:connector_mv_relay"
    ])

    kubejs.shapeless("immersiveengineering:connector_mv_relay", [
        "immersiveengineering:connector_mv"
    ]).id("immersiveengineering:crafting/connector_mv_relay")

    kubejs.shapeless("immersiveengineering:connector_hv", [
        "#immersiveengineering:connector_insulator",
        "#forge:rods/aluminum"
    ]).id("immersiveengineering:crafting/connector_hv")

    kubejs.shapeless("immersiveengineering:connector_hv", [
        "immersiveengineering:connector_hv_relay"
    ])

    kubejs.shapeless("immersiveengineering:connector_hv_relay", [
        "immersiveengineering:connector_hv"
    ]).id("immersiveengineering:crafting/connector_hv_relay")
})