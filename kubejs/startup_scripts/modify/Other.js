/**
 * 
 * @param {Special.Mod} modid 
 * @param {string} name 
 */
function modifyDisplayName(modid, name) {
	Platform.getInfo(modid).setName(name)
}

modifyDisplayName("moreburners", "Create: More Burners")
modifyDisplayName("edenring", "Ring of Eden")