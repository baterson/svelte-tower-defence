<script>
	import { spendUpgradePoints } from '$store/gameActions.svelte';
	import { handleScreenChange } from '$store/States/effects';
	import Entity from './Entity.svelte';

	let node = $state();

	const { tower, placement } = $props();

	$effect(() => handleScreenChange(node, tower));
</script>

<Entity
	onclick={() => {
		if (tower.isUpgradable) {
			spendUpgradePoints(tower);
		}
	}}
	bind:node
	entity={tower}
	isStatic={true}
	--place-self={placement}
	--position="relative"
	--margin-left={placement === 'start' ? '20px' : 'auto'}
	--margin-right={placement === 'end' ? '20px' : 'auto'}
/>
