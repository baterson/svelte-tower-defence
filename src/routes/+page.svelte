<script>
	import { onMount } from 'svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import DevTools from '$lib/components/DevTools.svelte';
	import { Game } from '$lib/store/Game.svelte';
	import { managers } from '$lib/store/managers.svelte';
	// import Dialog from '$components/Dialog.svelte';
	// import BackDrop from '$components/BackDrop.svelte';
	import Bg1 from '$lib/components/Bg1.svelte';
	import { handleGameClick } from '$lib/store/gameActions.svelte';
	let game = $state(null);
	let isGameStarted = $state(false);

	// onMount(() => {
	// 	game = new Game();
	// 	game.start();
	// });
	const startGame = () => {
		game = new Game();
		managers.get('soundManager').init();
		game.start();
		isGameStarted = true;
	};
</script>

<svelte:window bind:innerWidth={screen.width} bind:innerHeight={screen.height} />

<!-- <DevTools /> -->
<!-- <Dialog /> -->
<!-- <BackDrop /> -->

{#if !isGameStarted}
	<div class="overlay-for-music">
		<button onclick={startGame} class="btn-start">Start game</button>
	</div>
{:else if game}
	<div class="wrapper">
		<Bg1 />
		<div class="time">Stage {managers.get('stageManager').stageNumber + 1}</div>
		<div
			onclick={handleGameClick}
			bind:offsetHeight={screen.gameAreaHeight}
			bind:offsetWidth={screen.gameAreaWidth}
			class="game-container"
			style:transform-origin="center"
		>
			<GameArea />
		</div>
	</div>
{/if}

<style>
	.btn-start {
		background-color: mediumpurple;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
		margin-bottom: 10px;
	}
	.overlay-for-music {
		width: 100vw;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.7);
		z-index: 10;
	}
	.time {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 3;
		font-size: 40px;
		color: white;
	}

	.wrapper {
		background-color: rgb(236, 209, 218);
		z-index: 3;
		position: relative;
		display: flex;
		justify-content: center;
		width: 100vw;
		height: 100dvh;
		overflow: hidden;
	}

	.game-container {
		position: relative;
		width: 680px;
		height: 100dvh;
		z-index: 330;
		will-change: transform;
	}

	@media (max-width: 768px) {
		.wrapper {
			display: block;
		}
		.game-container {
			width: 100vw;
			height: 100dvh;
		}
	}
</style>
