<script>
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import Loot from './Gui/Loot.svelte';
	let isAnimated = $derived(lootTracker.playLowLootAnimation);
</script>

<div
	class="loot"
	class:isAnimated
	onanimationend={(e) => {
		lootTracker.unsetAnimation('LowLoot');
	}}
>
	<Loot />
	{lootTracker.collectedLoot}
</div>

<style>
	.loot {
		position: absolute;
		top: 60px;
		left: 0;
		color: white;
		font-size: 34px;
		z-index: 20;
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
			transform: scale(3);
		}
	}
</style>
