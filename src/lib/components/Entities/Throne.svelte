<script>
	import { devTools } from '$store/DevTools.svelte';
	import { entityManager } from '$store/EntityManager.svelte';
	import { handleScreenChange } from '$store/States/effects';
	import Entity from './Entity.svelte';

	const { throne } = $props();

	let node = $state();

	$effect(() => handleScreenChange(node, throne));
</script>

<Entity
	bind:node
	entity={throne}
	onclick={() => devTools.inspectEntity(throne)}
	oncontextmenu={() => devTools.inspectEntity(throne)}
	isStatic={true}
/>
