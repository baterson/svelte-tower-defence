<script>
	import { screen } from '$lib/store/Screen.svelte';
	import Entity from './Entity.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';

	const { tower, placement } = $props();

	let node = $state();

	const onclick = (e) => {
		// move to upgrade
		e.stopPropagation();
		if (tower.upgradeLevel === 2 || !tower.isUpgradable) {
			return;
		}

		lootTracker.spendLoot({ type: 'upgrade', payload: { tower } });
	};

	$effect(() => {
		if (screen.isMobile) {
			tower.scale = 0.7;
		} else {
			tower.scale = 1;
		}
	});
	// position={tower.staticPosition}
</script>

<Entity
	{onclick}
	--placement={placement}
	isStatic={true}
	entity={tower}
	--cursor={'url(/cursor-hammer.svg), auto'}
	--z-index={10}
	--pointer-events={'auto'}
/>
