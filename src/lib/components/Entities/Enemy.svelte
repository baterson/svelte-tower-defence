<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	// import Entity from '$components/Testing/EntityTransform.svelte';
	import { fade } from 'svelte/transition';
	import Entity from './Entity.svelte';

	const { enemy } = $props();
</script>

<Entity entity={enemy} />
