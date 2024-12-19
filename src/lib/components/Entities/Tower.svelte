<script>
	import { spendUpgradePoints } from '$lib/config/upgrades';
	import { entityManager } from '$store/EntityManager.svelte';
	import { handleScreenChange } from '$store/States/effects';
	import Entity from './Entity.svelte';

	let node = $state();

	const { tower, placement } = $props();

	const placementStyles = $derived(
		`position: relative; place-self: ${placement}; margin-left: ${placement === 'start' ? '20px' : 'auto'}; margin-right: ${placement === 'end' ? '20px' : 'auto'}`
	);

	$effect(() => handleScreenChange(node, tower));
</script>

<Entity
	bind:node
	entity={tower}
	{placementStyles}
	isStatic={true}
	onclick={() => spendUpgradePoints(tower)}
/>
