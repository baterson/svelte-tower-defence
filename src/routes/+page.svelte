<script>
	import GameArea from '$lib/components/GameArea.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import DevTools from '$lib/components/DevTools.svelte';
	import { Game } from '$lib/store/Game.svelte';
	import { managers } from '$lib/store/managers.svelte';
	// import Dialog from '$components/Dialog.svelte';
	// import BackDrop from '$components/BackDrop.svelte';
	import Bg1 from '$lib/components/Bg1.svelte';
	import { handleGameClick } from '$lib/store/gameActions.svelte';
	import { onMount } from 'svelte';
	import GameMenu from '$lib/components/GameMenu.svelte';
	import PauseIcon from '$lib/components/PauseIcon.svelte';
	const gameLoop = $derived(managers.get('gameLoop'));
	const soundManager = $derived(managers.get('soundManager'));
	let game = $state(null);
	let isGameStarted = $state(false);
	let isPaused = $state(false);

	const startGame = () => {
		game = new Game();
		soundManager.init();
		game.start();
		isGameStarted = true;
	};
	const pauseGame = () => {
		gameLoop.pause();
		isPaused = true;
	};
	const resumeGame = () => {
		gameLoop.resume();
		isPaused = false;
	};
	const restartGame = () => {
		game.restart();
		gameLoop.resume();
		isPaused = false;
	};
</script>

<svelte:window bind:innerWidth={screen.width} bind:innerHeight={screen.height} />

<DevTools />
<!-- <Dialog /> -->
<!-- <BackDrop /> -->

{#if !isGameStarted}
	<GameMenu onStart={startGame} />
{:else if game}
	<div class="wrapper">
		<Bg1 />
		<div class="time">Stage {managers.get('stageManager').stageNumber + 1}</div>
		<button class="btn-pause" onclick={pauseGame}><PauseIcon /></button>
		<div
			onclick={handleGameClick}
			bind:offsetHeight={screen.gameAreaHeight}
			bind:offsetWidth={screen.gameAreaWidth}
			class="game-container"
			style:transform-origin="center"
		>
			<GameArea />
		</div>
		{#if isPaused}
			<GameMenu onResume={resumeGame} isPaused={true} onRestart={restartGame} />
		{/if}
	</div>
{/if}

<style>
	.btn-pause {
		position: absolute;
		top: 20px;
		right: 20px;
		border: none;
		font-size: 16px;
		cursor: pointer;
		background: none;
		z-index: 1000;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		-webkit-touch-callout: none;
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
