<script>
	import { entityManager } from '$store/EntityManager.svelte';
	import { sprites } from '$lib/config/sprites';
	import * as effects from './Effects';
	import { onMount } from 'svelte';
	import Entity from './Entity.svelte';
	import { Vector2 } from '$store/Vector2.svelte';
	import { Sprite } from '$store/Sprite.svelte';
	import { stageManager } from '$store/StageManager.svelte';
	import ParallaxBackground from './ParallaxBackground.svelte';

	let debugEntities = $derived(
		entityManager.entities.filter((entity) => entity.type === 'debug') || []
	);
	let firstDebug = $derived(debugEntities[0]);
	let parallaxBackground = $state(true);

	let currentSprite = $state('None');
	let currentEffect = $state('TestEffect');

	const handleClick = (e) => {
		firstDebug.state.setState('RunToPoint', {
			targetPoint: new Vector2(e.clientX, e.clientY)
		});
		console.log(e.clientX, e.clientY);
	};

	const handleEffectChange = (e) => {
		currentEffect = e.target.value;

		if (!firstDebug) return;
		firstDebug.cleanEffects();
		if (currentEffect === 'None') return;

		firstDebug.addEffect(currentEffect);
	};

	const handleSpriteChange = (e) => {
		currentSprite = e.target.value;

		if (currentSprite === 'None') {
			firstDebug.sprite = null;
		} else {
			const entitySprites = [sprites[currentSprite]];
			firstDebug.setSprite('RunToPoint', entitySprites);
			firstDebug.state.onEnter = (stateName) => {
				if (firstDebug.sprite) {
					firstDebug.setSprite(stateName, entitySprites);
				}
			};
		}
	};

	const spawnProjectile = (e) => {
		const projectile = stageManager.spawnEntity('debug', new Vector2(e.clientX, e.clientY), {
			shouldDie: true,
			targetPoint: new Vector2(300, 500)
		});

		if (currentEffect !== 'None') {
			projectile.addEffect(currentEffect);
		}
	};

	onMount(() => {
		stageManager.spawnEntity('debug', new Vector2(200, 200));

		const debugEntity = entityManager.entities.find((entity) => entity.type === 'debug');

		debugEntity.sprite = null;
		debugEntity.addEffect('TestEffect');
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div onclick={handleClick}>
	<div class="select-container" onclick={(e) => e.stopPropagation()}>
		<select onchange={handleSpriteChange}>
			{#each ['None', 'enemy1'] as sprite}
				<option value={sprite}>
					{sprite}
				</option>
			{/each}
		</select>
		<select onchange={handleEffectChange}>
			{#each ['None', ...Object.keys(effects)] as effect}
				<option value={effect}>
					{effect}
				</option>
			{/each}
		</select>
		<button onclick={() => (parallaxBackground = !parallaxBackground)}>
			{parallaxBackground ? 'Hide background' : 'Show background'}
		</button>
		<button onclick={spawnProjectile}>Spawn projectile</button>
	</div>
	<div class="controls" onclick={(e) => e.stopPropagation()}>
		<label>
			Height:
			<input
				type="range"
				min="10"
				max="200"
				value={firstDebug?.height || 40}
				oninput={(e) => firstDebug && (firstDebug.height = Number(e.target.value))}
			/>
			<span>{firstDebug?.height || 40}px</span>
		</label>

		<label>
			Width:
			<input
				type="range"
				min="10"
				max="200"
				value={firstDebug?.width || 30}
				oninput={(e) => firstDebug && (firstDebug.width = Number(e.target.value))}
			/>
			<span>{firstDebug?.width || 30}px</span>
		</label>

		<label>
			Scale:
			<input
				type="range"
				min="0.1"
				max="3"
				step="0.1"
				value={firstDebug?.scale || 1}
				oninput={(e) => firstDebug && (firstDebug.stats.scale = Number(e.target.value))}
			/>
			<span>{firstDebug?.scale || 1}x</span>
		</label>

		<label>
			Speed:
			<input
				type="range"
				min="0.05"
				max="1"
				step="0.05"
				value={firstDebug?.stats.speed || 0.2}
				oninput={(e) => firstDebug && (firstDebug.stats.speed = Number(e.target.value))}
			/>
			<span>{firstDebug?.stats.speed || 0.2}</span>
		</label>
	</div>

	{#each debugEntities as entity}
		<Entity {entity} />
	{/each}

	{#if parallaxBackground}
		<ParallaxBackground />
	{/if}
</div>

<style>
	.select-container {
		display: flex;
		gap: 10px;
		height: 60px;
	}

	.controls {
		height: 100px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		background: rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		width: fit-content;
	}
	label {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 16px;
	}
	input[type='range'] {
		width: 200px;
	}
	span {
		min-width: 50px;
	}

	select {
		font-size: 24px;
		margin: 10px;
	}
	div {
		position: relative;
		z-index: 1;
		width: 100dvw;
		height: 100dvh;
	}
</style>
