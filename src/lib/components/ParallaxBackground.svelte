<script>
	import { screen } from '$lib/store/Screen.svelte';
	import { managers } from '$store/managers.svelte';
	import { fade } from 'svelte/transition';

	const background = $derived(managers.get('background'));

	$effect(() => {
		if (background) {
			background.updateDimensions(screen.width, screen.height);
		}
	});
</script>

{#if background}
	<div
		class="background-container"
		in:fade
		out:fade
		style:width="{screen.width}px"
		style:height="{screen.height}px"
	>
		<!-- Scrolling base nebula layers -->
		<div
			class="base-layer"
			style:background-image="url({background.base})"
			style:transform="translateY({background.baseLayer1Position}px)"
			style:height="{background.layerHeight}px"
		></div>
		<div
			class="base-layer"
			style:background-image="url({background.base})"
			style:transform="translateY({background.baseLayer2Position}px)"
			style:height="{background.layerHeight}px"
		></div>

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
		width: 100vw;
		height: 100dvh;
		z-index: 2;
	}

	.base-layer {
		position: absolute;
		top: -100%;
		left: 0;
		width: 100%;
		background-size: cover;
		background-repeat: repeat-y;
		will-change: transform;
		transition: transform 50ms linear;
		z-index: 1;
		opacity: 1;
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

		opacity: 0.7;

		z-index: 2;
	}
</style>
