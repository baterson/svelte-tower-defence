<script>
	import { onMount } from 'svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import { Game } from '$lib/store/Game.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import ParallaxBackground from '$components/ParallaxBackground.svelte';
	import DevTools from '$components/DevTools.svelte';
	import { stageManager } from '$store/StageManager.svelte';
	import Dialog from '$components/Dialog.svelte';
	import BackDrop from '$components/BackDrop.svelte';

	onMount(() => {
		const game = new Game();

		game.start();
	});
</script>

<svelte:window bind:innerWidth={screen.width} bind:innerHeight={screen.height} />

<!-- <DevTools /> -->
<ParallaxBackground />
<Dialog />
<BackDrop />

<div class="wrapper">
	<div class="time">Stage {stageManager.stageNumber + 1}</div>
	<div
		bind:offsetHeight={screen.gameAreaHeight}
		bind:offsetWidth={screen.gameAreaWidth}
		class="game-container"
		style:transform-origin="center"
	>
		<GameArea />
	</div>
</div>

<style>
	.time {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
		font-size: 40px;
		color: white;
	}

	.wrapper {
		z-index: 3;
		position: absolute;
		width: 100vw;
		height: 100dvh;
		display: flex;
		justify-content: center;
		/* align-items: center; */
		overflow: hidden;
	}

	.game-container {
		position: relative;
		width: 520px;
		height: 100dvh;
		will-change: transform;
		padding-top: 100px;
	}

	/* Mobile styles - game takes full screen */
	@media (max-width: 768px) {
		.wrapper {
			align-items: flex-end;
		}

		.game-container {
			width: 100vw;
			height: 100dvh;
			padding-top: 0;
			padding-bottom: 40px;
		}
	}
</style>
