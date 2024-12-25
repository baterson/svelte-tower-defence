<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { managers } from '$store/managers.svelte';

	const entityManager = $derived(managers.get('entityManager'));
	const gameLoop = $derived(managers.get('gameLoop'));
	const background = $derived(managers.get('background'));

	// Background options
	const baseOptions = [
		'/background/BlueNebula/Blue_Nebula_01.png',
		'/background/BlueNebula/Blue_Nebula_02.png',
		'/background/BlueNebula/Blue_Nebula_03.png',
		'/background/PurpleNebula/Purple_Nebula_01.png',
		'/background/PurpleNebula/Purple_Nebula_02.png',
		'/background/PurpleNebula/Purple_Nebula_03.png'
	];

	const starOptions = [
		'/background/Starfields/Starfield_01.png',
		'/background/Starfields/Starfield_02.png',
		'/background/Starfields/Starfield_03.png',
		'/background/Starfields/Starfield_08.png'
	];

	let selectedBase = $state(baseOptions[0]);
	let selectedStars = $state(starOptions[0]);
	let value = $state(0);

	onMount(() => {
		window.em = entityManager;
	});

	const pause = () => {
		if (gameLoop.pauseState) {
			gameLoop.resume();
		} else {
			gameLoop.pause();
		}
	};

	const handleBaseChange = (event) => {
		selectedBase = event.target.value;
		background.setBase(selectedBase);
	};

	const handleStarsChange = (event) => {
		selectedStars = event.target.value;
		background.setStars(selectedStars);
	};

	// let value = $state(devTools.debugEntity ? devTools.debugEntity.state.currentState.name : '');
	$effect(() => {
		if (devTools.debugEntity) {
			value = devTools.debugEntity.state.currentState.name;
		}
	});

	const setState = (state) => {
		if (!devTools.debugEntity) return;
		entityManager.getById(devTools.debugEntity.id).state.setState(state);
	};

	let isHidden = $state(true);
</script>

{#if browser}
	<div class="wrapper">
		<button onclick={() => (isHidden = !isHidden)}>{isHidden ? 'Show' : 'Hide'}</button>
		<button onclick={() => pause()}> Pause </button>

		{#if !isHidden}
			<section>
				<div class="select-group">
					<label>
						Base Background:
						<select value={selectedBase} onchange={handleBaseChange}>
							{#each baseOptions as option}
								<option value={option}>
									{option.split('/').pop().replace('.png', '')}
								</option>
							{/each}
						</select>
					</label>

					<label>
						Stars Background:
						<select value={selectedStars} onchange={handleStarsChange}>
							{#each starOptions as option}
								<option value={option}>
									{option.split('/').pop().replace('.png', '')}
								</option>
							{/each}
						</select>
					</label>
				</div>

				<h2>Enemies: {entityManager.enemies.length}</h2>
				<h2>Projectiles: {entityManager.projectiles.length}</h2>
				<h2>Loot: {entityManager.loot.length}</h2>
			</section>

			<section>
				<h1 onclick={() => devTools.inspectEntity(null)}>Inspected Entity</h1>
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
		{/if}
	</div>
{/if}

<style>
	.wrapper {
		z-index: 4;
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
		margin-bottom: 10px;
	}

	section {
		z-index: 4;
		background-color: antiquewhite;
		margin-top: 20px;
		padding: 15px;
		border-radius: 5px;
	}

	.select-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 10px 0;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 5px;
		font-size: 14px;
	}

	select {
		padding: 5px;
		border-radius: 3px;
		border: 1px solid #ccc;
		background-color: white;
		font-size: 14px;
		width: 200px;
	}

	h1,
	h2 {
		margin: 10px 0;
	}
</style>
