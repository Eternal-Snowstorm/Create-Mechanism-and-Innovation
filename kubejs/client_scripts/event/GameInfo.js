ClientEvents.loggedIn((event) => {
	let { player } = event

	let isDev = DebugUserManager.isDebugger(player)
	/**
	 * @type {Record<string, any>}
	 */
	let paintData = {}

	if (isDev) {
		let devInfo = Component.translatable(`text.${Cmi.MODID}.dev`).getString()
		let playerInfo = Component.translatable(`text.${Cmi.MODID}.player`).getString()

		paintData.devTip = {
			type: "text",
			x: 10,
			y: "$screenH - 40",
			alignX: "left",
			text: devInfo,
			scale: 1.0
		}

		paintData.playerTip = {
			type: "text",
			x: 10,
			y: "$screenH - 30",
			alignX: "left",
			text: playerInfo,
			scale: 1.0
		}
	}

	paintData.versionTip = {
		type: "text",
		x: 10,
		y: "$screenH - 20",
		alignX: "left",
		text: CmiGlobal.getModPackMainVersion(),
		scale: 1.0
	}

	player.paint(paintData)
})