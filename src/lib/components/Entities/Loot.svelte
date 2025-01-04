<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import Entity from './Entity.svelte';

	const { loot } = $props();
</script>

<Entity entity={loot} onclick={() => devTools.inspectEntity(loot)} --z-index={10} />
