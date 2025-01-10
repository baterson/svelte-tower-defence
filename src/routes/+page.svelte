<script>
	import './global.css';

	import GameArea from '$lib/components/GameArea.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import WinLoseScreen from '$lib/components/Gui/WinLoseScreen.svelte';
	import StartScreen from '$lib/components/Gui/StartScreen.svelte';
	import { onMount, tick } from 'svelte';
	import { game } from '$lib/store/Game.svelte';
	import PauseScreen from '$lib/components/Gui/PauseScreen.svelte';
	import BackgroundContainer from '$lib/components/BackgroundContainer.svelte';
	import Loot from '$lib/components/Loot.svelte';
	import Pause from '$lib/components/Gui/Pause.svelte';
	import { preloadUrls } from '$lib/utils/preload';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import { cursor } from '$lib/store/Cursor.svelte';

	const gameLoop = $derived(managers.get('gameLoop'));
	const stageManager = $derived(managers.get('stageManager'));

	const handleGameClick = (e) => {
		lootTracker.spendLoot({
			type: 'click',
			payload: { offset: new Vector2(e.clientX, e.clientY) }
		});
	};

	const handlePauseClick = () => {
		soundManager.play('clickMenu', true);
		gameLoop.pause();
	};

	const handlePressKey = (e) => {
		if (e.key === 'Escape') {
			if (gameLoop.pauseState) {
				gameLoop.resume();
			} else {
				gameLoop.pause();
			}
		}
	};

	onMount(() => {
		soundManager.preload();
	});
</script>

<svelte:window
	bind:innerWidth={screen.width}
	bind:innerHeight={screen.height}
	onkeydown={handlePressKey}
/>

<svelte:head>
	{#each preloadUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>

{#if !game.isStarted}
	<StartScreen onStart={() => game.start()} />
{:else if stageManager.stageResult}
	<WinLoseScreen onRestart={() => game.restart()} />
{:else if gameLoop.pauseState}
	<PauseScreen onResume={() => gameLoop.resume()} onRestart={() => game.restart()} />
{/if}

{#if game.isStarted && soundManager.preloaded}
	<div class="window-wrapper" onclick={handleGameClick} style:cursor={cursor.get('arrow')}>
		<div class="wrapper">
			<BackgroundContainer stageNumber={stageManager.stageNumber} />
			<Loot />
			<button tabindex="-1" class="btn-pause" onclick={handlePauseClick}><Pause /></button>
			<div
				bind:offsetHeight={screen.gameAreaHeight}
				bind:offsetWidth={screen.gameAreaWidth}
				class="game-container"
				style:transform-origin="center"
			>
				<GameArea />
			</div>
		</div>
	</div>
{/if}

<style>
	.btn-pause {
		position: absolute;
		top: 20px;
		right: 20px;
		border: none;
		font-size: 16px;
		background: none;
		z-index: 10;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		-webkit-touch-callout: none;
	}

	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		width: 100vw;
		height: 100dvh;
		overflow: hidden;
		background-color: black;
		touch-action: none;
	}

	.game-container {
		position: relative;
		width: 100%;
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
