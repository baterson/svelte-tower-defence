<script>
	import Effect1 from './Effect1.svelte';
	import Effect2 from './Effect2.svelte';

	const { entity } = $props();
</script>

{#if entity.effect === 'effect1'}
	<Effect1 {entity} />
{:else if entity.effect === 'effect2'}
	<Effect2 {entity} />
{/if}
