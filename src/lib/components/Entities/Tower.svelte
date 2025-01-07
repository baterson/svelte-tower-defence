<script>
	import { screen } from '$lib/store/Screen.svelte';
	import Entity from './Entity.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';

	const { tower } = $props();

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
</script>

<Entity
	{onclick}
	position={tower.staticPosition}
	entity={tower}
	--z-index={10}
	--pointer-events={'auto'}
/>
