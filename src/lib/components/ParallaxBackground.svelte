<script>
	import { game } from '$lib/store/Game.svelte';
	import { fade } from 'svelte/transition';

	const background = $derived(game.background);
</script>

{#if background}
	<div
		class="background-container"
		in:fade
		out:fade
		style:width="{background.windowWidth}px"
		style:height="{background.windowHeight}px"
	>
		<!-- Static base nebula layer -->
		<div class="base-layer" style:background-image="url({background.base})"></div>

		<!-- Scrolling star layers -->
		<div
			class="star-layer"
			style:background-image="url({background.stars})"
			style:transform="translateY({background.starLayer1Position}px)"
			style:height="{background.layerHeight}px"
		></div>
		<div
			class="star-layer"
			style:background-image="url({background.stars})"
			style:transform="translateY({background.starLayer2Position}px)"
			style:height="{background.layerHeight}px"
		></div>
	</div>
{/if}

<style>
	.background-container {
		position: absolute;
		overflow: hidden;
	}

	.base-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		z-index: 1;
	}

	.star-layer {
		position: absolute;
		top: -100%;
		left: 0;
		width: 100%;
		background-size: cover;
		background-repeat: repeat-y;
		will-change: transform;
		transition: transform 50ms linear;
		opacity: 0.1;
		z-index: 2;
	}
</style>
