<script>
	import { devTools } from '$store/DevTools.svelte';
	import { fade } from 'svelte/transition';
	import Entity from './Entity.svelte';

	const { enemy } = $props();
</script>

<Entity entity={enemy} onclick={() => devTools.inspectEntity(enemy)} />
