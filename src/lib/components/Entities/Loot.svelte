<script>
	import Entity from './Entity.svelte';

	const { loot } = $props();
</script>

<Entity entity={loot} --z-index={10} />
