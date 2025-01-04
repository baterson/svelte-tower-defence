<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import Entity from './Entity.svelte';

	const { projectile } = $props();
</script>

<Entity entity={projectile} onclick={() => devTools.inspectEntity(projectile)} --z-index={11} />
