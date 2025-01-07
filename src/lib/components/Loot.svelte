<script>
	import { lootTracker } from '$lib/store/LootTracker.svelte';
</script>

<div
	class="loot"
	class:isAnimated={lootTracker.playLowLootAnimation}
	onanimationend={() => {
		lootTracker.unsetAnimation('LowLoot');
	}}
>
	Loot: {lootTracker.collectedLoot}
</div>

<style>
	.loot {
		position: absolute;
		top: 60px;
		left: 0;
		color: white;
		font-size: 48px;
	}

	.isAnimated {
		animation: shake 1s ease-in-out;
	}

	@keyframes shake {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.3);
		}
	}
</style>
