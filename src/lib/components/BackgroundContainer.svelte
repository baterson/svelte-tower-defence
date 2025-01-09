<script>
	import { fade, fly, slide, blur, scale } from 'svelte/transition';
	import { cubicInOut, elasticOut } from 'svelte/easing';

	import Bg1 from './Bg1.svelte';
	import Bg2 from './Bg2.svelte';
	import Bg3 from './Bg3.svelte';
	import Bg4 from './Bg4.svelte';

	const { stageNumber } = $props();

	const bgs = [Bg1, Bg2, Bg3, Bg4];

	let CurrentBackground = $derived(bgs[stageNumber] || Bg1);
</script>

<!-- in:scale={{
    duration: 400,
    start: 1.3,
    opacity: 0.9,
    easing: cubicInOut
}} -->

<!-- in:scale={{
    duration: 800,
    start: 0.8,
    opacity: 0,
    easing: elasticOut
}}
out:scale={{
    duration: 300,
    start: 1,
    opacity: 0.8,
    easing: cubicInOut
}} -->

{#key stageNumber}
	<div in:fade={{ duration: 400 }} out:fade={{ duration: 300 }} class="background-container">
		<svelte:component this={CurrentBackground} />
	</div>
{/key}

<style>
	.background-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
</style>
