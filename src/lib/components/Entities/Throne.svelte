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
</script>

<Entity
	bind:node
	onclick={() => spendThronePower()}
	entity={throne}
	oncontextmenu={() => devTools.inspectEntity(throne)}
	isStatic={true}
/>
