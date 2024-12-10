<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import { browser } from '$app/environment';
	import { on } from 'svelte/events';
	import { onMount } from 'svelte';

	const { game } = $props();

	onMount(() => {
		window.game = game;
		window.entityManager = game.entityManager;
		window.towers = game.entityManager.towers;
	});
</script>

{#if browser}
	<div>
		<button onclick={devTools.toggleWalls}>Toggle Walls</button>

		<section>
			{#each game.entityManager.towers as tower}
				<h3>{tower.name}</h3>
				<p>{tower.state.currentState.constructor.name}</p>
			{/each}
		</section>
	</div>
{/if}

<style>
	button {
		background-color: mediumaquamarine;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}

	section {
		margin-top: 20px;
	}

	div {
		position: absolute;
		top: 0;
		right: 0;
		padding: 20px 10px 20px 10px;
		width: 400px;
		height: 300px;
		background-color: mediumpurple;
		display: flex;
		flex-direction: column;
	}
</style>
