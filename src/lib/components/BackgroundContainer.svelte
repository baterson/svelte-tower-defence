<script>
	import { fade } from 'svelte/transition';
	import Bg1 from './Bg1.svelte';
	import Bg2 from './Bg2.svelte';
	import Bg3 from './Bg3.svelte';
	import Bg4 from './Bg4.svelte';
	import Bg5 from './Bg5.svelte';

	const { stageNumber } = $props();

	const bgs = [Bg1, Bg2, Bg3, Bg4, Bg5];

	let CurrentBackground = $derived(bgs[stageNumber] || Bg1);
</script>

{#key stageNumber}
	<div in:fade={{ duration: 1000 }} out:fade={{ duration: 1000 }}>
		<svelte:component this={CurrentBackground} />
	</div>
{/key}
