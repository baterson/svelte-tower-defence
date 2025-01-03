<script>
	import { onMount } from 'svelte';
	import { Game } from '$store/Game.svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import DevTools from '$components/DevTools.svelte';
	import { managers } from '$store/managers.svelte';
	// import Dialog from '$components/Dialog.svelte';
	// import BackDrop from '$components/BackDrop.svelte';
	import Bg1 from '$components/Bg1.svelte';
	let game = $state(null);

	onMount(() => {
		game = new Game();
		game.start();
	});
</script>

<svelte:window bind:innerWidth={screen.width} bind:innerHeight={screen.height} />

<DevTools />
<!-- <Dialog /> -->
<!-- <BackDrop /> -->

{#if game}
	<div class="wrapper">
		<Bg1 />
		<div class="time">Stage {managers.get('stageManager').stageNumber + 1}</div>
		<div
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
