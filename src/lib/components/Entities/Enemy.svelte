<script>
	import { devTools } from '$store/DevTools.svelte';
	import Entity from './Entity.svelte';

	const { enemy } = $props();
</script>

<Entity entity={enemy} onclick={() => devTools.inspectEntity(enemy)} />
