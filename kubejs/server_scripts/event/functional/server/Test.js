// ignored: true
let $NTModifier =
    Java.loadClass("dev.celestiacraft.tinker.common.register.NTModifier")

BlockEvents.rightClicked("minecraft:stone", (event) => {
    const MODIFIER = $NTModifier.FRENZY

    if (DebugUserManager.isDebugger(event.getPlayer())) {
        event.player.tell(MODIFIER.getId())
    }
})