declare interface Player {
	unlockAdvancement(id: ResourceLocation_): void
	revokeAdvancement(id: ResourceLocation_): void
	isAdvancementDone(id: ResourceLocation_): boolean
	getAdvancements(): Internal.PlayerAdvancements
}

declare namespace Internal {
	interface MinecraftServer {
		getAdvancements(): ServerAdvancementManager
	}

	interface ServerAdvancementManager {
		getAdvancement(id: ResourceLocation_): Advancement
	}

	interface PlayerAdvancements {
		award(advancement: Advancement, criteria: string): boolean
		getOrStartProgress(advancement: Advancement): AdvancementProgress
	}

	interface AdvancementProgress {
		getRemainingCriteria(): Internal.Iterable<string>
	}

	interface Advancement {}
}

declare type Advancement_ = Internal.Advancement