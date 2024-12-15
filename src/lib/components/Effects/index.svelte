<script>
	import Effect1 from './Effect1.svelte';
	import Effect2 from './Effect2.svelte';
	import Effect3 from './Effect3.svelte';

	const { entity } = $props();
</script>

{#if entity.name === 'effect1'}
	<Effect1 {entity} />
{:else if entity.name === 'effect2'}
	<Effect2 {entity} />
{:else if entity.name === 'effect3'}
	<Effect3 {entity} />
{/if}
