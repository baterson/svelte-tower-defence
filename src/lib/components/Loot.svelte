<script>
	import { cursor } from '$lib/store/Cursor.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import Loot from './Gui/Loot.svelte';
	let isAnimated = $derived(lootTracker.playLowLootAnimation);
</script>

<div
	class="loot"
	class:isAnimated
	style:cursor={cursor.get('arrow')}
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
		top: 20px;
		left: 10px;
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
			color: white;
		}
		10%,
		30%,
		50%,
		70%,
		90% {
			transform: scale(1.2) translateX(-4px);
			color: red;
		}
		20%,
		40%,
		60%,
		80% {
			transform: scale(1.2) translateX(4px);
			color: red;
		}
	}
</style>
