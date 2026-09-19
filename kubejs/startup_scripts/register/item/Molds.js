StartupEvents.registry("item", (event) => {
    
    /**
     * 
     * @param {string} name 
     * @returns 
     */
    function addMold(name) {
        let builder = event.create(`${Cmi.MODID}:${name}_mold`)

        builder.texture(Cmi.loadResource(`item/material/mold/${name}`))
        builder.tag("vintageimprovements:curving_heads")
        builder.tag("cmi:molds")

        return builder
    }

    /**
     * 
     * @param {string} name 
     * @returns 
     */
    function addClayMold(name) {
        let builder = event.create(`${Cmi.MODID}:${name}_clay_mold`)

        builder.texture(Cmi.loadResource(`item/material/mold/clay/${name}`))
        builder.tag("cmi:clay_molds")

        return builder
    }

    addMold("plate")
    addMold("gear")
    addMold("rod")
    addMold("wire")
    addMold("coin")
    addMold("bullet")
    addMold("mechanism")
    addMold("2x2_packing")
    addMold("3x3_packing")
    addMold("unpack")

    addClayMold("plate")
    addClayMold("gear")
    addClayMold("wire")
    addClayMold("coin")
    addClayMold("rod")
    addClayMold("unpack")
    addClayMold("2x2_packing")
    addClayMold("3x3_packing")

    addClayMold("blank")

})