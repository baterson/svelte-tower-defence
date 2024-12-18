<script>
	import Effect1 from './Effect1.svelte';
	import Effect2 from './Effect2.svelte';
	import Effect3 from './Effect3.svelte';
	import Effect4 from './Effect4.svelte';
	import Effect5 from './Effect5.svelte';
	import Effect6 from './Effect6.svelte';

	const { entity } = $props();
</script>

{#if entity.effect === 'effect1'}
	<Effect1 {entity} />
{:else if entity.effect === 'effect2'}
	<Effect2 {entity} />
{:else if entity.effect === 'effect3'}
	<Effect3 {entity} />
{:else if entity.effect === 'effect4'}
	<Effect4 {entity} />
{:else if entity.effect === 'effect5'}
	<Effect5 {entity} />
{:else if entity.effect === 'effect6'}
	<Effect6 {entity} />
{/if}
