<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import Entity from './Entity.svelte';

	const { loot } = $props();
</script>

<Entity entity={loot} --z-index={10} />
