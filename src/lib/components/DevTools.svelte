<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { game } from '$lib/store/Game.svelte';
	import { entityManager } from '$lib/store/EntityManager.svelte';
	import { gameLoop } from '$store/GameLoop.svelte';

	onMount(() => {
		window.game = game;
		window.entityManager = entityManager;
	});

	const pause = () => {
		if (gameLoop.pauseState) {
			gameLoop.resume();
		} else {
			gameLoop.pause();
		}
	};

	let value = $state(devTools.debugEntity ? devTools.debugEntity.state.currentState.name : '');

	const setState = (state) => {
		if (!devTools.debugEntity) return;

		entityManager.getById(devTools.debugEntity.id).state.setState(state);
	};
</script>

{#if browser}
	<div class="wrapper">
		<section>
			<button onclick={() => pause()}> Pause </button>
			<h2>Enemies count: {entityManager.enemies.length}</h2>
			<h2>Projectiles count: {entityManager.projectiles.length}</h2>
		</section>

		<section>
			<h1 onclick={() => devTools.inspectEntity(null)}>Inscected Entity</h1>
			{#if devTools.debugEntity}
				<p>ID: {devTools.debugEntity.id}</p>
				<p>Name: {devTools.debugEntity.name}</p>
				<p>Position: {devTools.debugEntity.position.x}, {devTools.debugEntity.position.y}</p>
				<p>Rotation: {devTools.debugEntity.rotation}</p>
				<p>Scale: {devTools.debugEntity.scale}</p>

				<input bind:value />

				<button onclick={() => setState(value)}>Set State</button>
			{/if}
		</section>
	</div>
{/if}

<style>
	.wrapper {
		position: absolute;
		right: 0;
		top: 0;
		padding: 20px;
		margin-top: 20px;
	}
	button {
		background-color: mediumpurple;
		border: none;
		padding: 10px 20px;
		font-size: 16px;
		cursor: pointer;
	}

	section {
		margin-top: 20px;
	}
</style>
