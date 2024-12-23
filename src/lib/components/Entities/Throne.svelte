<script>
	import { devTools } from '$store/DevTools.svelte';

	import { entityManager } from '$store/EntityManager.svelte';
	import { spendThronePower } from '$store/gameActions.svelte';

	import { handleScreenChange } from '$store/States/effects';
	import Entity from '../Entity.svelte';
	import { gameLoop } from '$store/GameLoop.svelte';

	const { throne } = $props();

	let node = $state();

	$effect(() => handleScreenChange(node, throne));

	const cdEffectId = gameLoop.setCD(1000, true);
	$effect(() => {
		if (gameLoop.isCDReady(cdEffectId)) {
			throne.removeEffect('TowerEffectMedium');
		}
	});
</script>

<Entity
	bind:node
	onclick={() => spendThronePower()}
	entity={throne}
	oncontextmenu={() => devTools.inspectEntity(throne)}
	isStatic={true}
/>
