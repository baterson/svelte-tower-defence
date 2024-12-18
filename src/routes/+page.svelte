<script>
	import { onMount } from 'svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import { Game } from '$lib/store/Game.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import ParallaxBackground from '$components/ParallaxBackground.svelte';
	import DevTools from '$components/DevTools.svelte';

	onMount(() => {
		const game = new Game();

		game.start();
	});
</script>

<svelte:window bind:innerWidth={screen.width} bind:innerHeight={screen.height} />

<DevTools />
<ParallaxBackground />
<div class="wrapper">
	<div
		bind:clientHeight={screen.gameAreaHeight}
		bind:clientWidth={screen.gameAreaWidth}
		class="game-container"
		style:transform-origin="center"
	>
		<GameArea />
	</div>
</div>

<style>
	.wrapper {
		z-index: 3;
		position: absolute;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		overflow: hidden;
	}

	.game-container {
		position: relative;
		width: 520px;
		height: 100vh;
		will-change: transform;
	}

	/* Mobile styles - game takes full screen */
	@media (max-width: 768px) {
		.wrapper {
			align-items: flex-end;
		}

		.game-container {
			width: 100vw;
			height: 100vh;
		}
	}
</style>
