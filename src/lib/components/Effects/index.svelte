<script>
	import Effect1 from './Effect1.svelte';
	import Effect2 from './Effect2.svelte';
	import Effect3 from './Effect3.svelte';
	import TowerEffect1 from './TowerEffect1.svelte';
	import ToxicCloud from './ToxicCloud.svelte';
	import BlinkingStar from './BlinkingStar.svelte';
	import Effect4 from './Effect4.svelte';
	import Effect5 from './Effect5.svelte';

	const { entity, name } = $props();
</script>

{#if name === 'effect1'}
	<Effect1 {entity} />
{:else if name === 'effect2'}
	<Effect2 {entity} />
{:else if name === 'effect3'}
	<Effect3 {entity} />
{:else if name === 'toxicCloud'}
	<ToxicCloud {entity} />
{:else if name === 'blinkingStar'}
	<BlinkingStar {entity} />
{:else if name === 'towerEffect1'}
	<TowerEffect1 {entity} />
{:else if name === 'effect4'}
	<Effect4 {entity} />
{:else if name === 'effect5'}
	<Effect5 {entity} />
{/if}
