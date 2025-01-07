<script>
	import Entity from './Entity.svelte';

	const { projectile } = $props();
</script>

<Entity entity={projectile} --z-index={11} />
