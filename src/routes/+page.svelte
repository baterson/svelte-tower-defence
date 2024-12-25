<script>
	import { onMount } from 'svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import ParallaxBackground from '$components/ParallaxBackground.svelte';
	import DevTools from '$components/DevTools.svelte';
	import { managers } from '$store/managers.svelte';
	// import Dialog from '$components/Dialog.svelte';
	// import BackDrop from '$components/BackDrop.svelte';
	import { Game } from '$store/Game.svelte';
	import Entity from '$components/Entity.svelte';
	import Entity2 from '$components/Entity2.svelte';
	// let stageManager = $derived(managers.getManager('stageManager'));

	onMount(() => {
		const game = new Game();
		game.start();
	});
	// onMount(() => {
	// 	game = new Game();
	// 	game.start();
	// });
</script>

<!-- <svelte:window bind:innerWidth={screen.width} bind:innerHeight={screen.height} /> -->

<DevTools />
<!-- <ParallaxBackground /> -->
<!-- <Dialog /> -->
<!-- <BackDrop /> -->
<!-- {#if managers.getManager('entityManager')}
	<Entity2 entity={{ width: 100, height: 100, position: { x: 100, y: 300 } }} />
{/if} -->
{#if managers.getManager('entityManager')}
	{#each managers.getManager('entityManager').entities as entity}
		<Entity2 {entity} />
	{/each}
{/if}

<!-- {#if game} -->
<!-- <div class="wrapper">
		<div class="time">Stage {stageManager.stageNumber + 1}</div>
		<div
			bind:offsetHeight={screen.gameAreaHeight}
			bind:offsetWidth={screen.gameAreaWidth}
			class="game-container"
			style:transform-origin="center"
		>
			<GameArea />
		</div>
	</div> -->
<!-- {/if} -->

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
