<script>
	import { entityManager } from '$store/EntityManager.svelte';
	import { sprites } from '$lib/config/sprites';
	import * as effects from './Effects';
	import { onMount } from 'svelte';
	import Entity from './Entity.svelte';
	import { Vector2 } from '$store/Vector2.svelte';
	import { Sprite } from '$store/Sprite.svelte';
	import { stageManager } from '$store/StageManager.svelte';

	let debug = $derived(entityManager.entities.find((entity) => entity.type === 'debug'));

	const handleClick = (e) => {
		debug.state.setState('RunToPoint', {
			targetPoint: new Vector2(e.clientX, e.clientY)
		});
		console.log(e.clientX, e.clientY);
	};

	const handleEffectChange = (e) => {
		debug.cleanEffects();
		if (e.target.value === 'None') return;

		debug.addEffect(e.target.value);
	};

	const handleSpriteChange = (e) => {
		if (e.target.value === 'None') {
			debug.sprite = null;
		} else {
			const spriteName = e.target.value;
			const entitySprites = [sprites[spriteName]];
			debug.setSprite('Idle', entitySprites);

			debug.state.onEnter = (stateName) => {
				if (debug.sprite) {
					debug.setSprite(stateName, entitySprites);
				}
			};
		}
	};

	onMount(() => {
		stageManager.spawnEntity('debug', new Vector2(200, 200));

		const debugEntity = entityManager.entities.find((entity) => entity.type === 'debug');

		debugEntity.sprite = null;
		debugEntity.addEffect(Object.keys(effects)[0]);
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
	</div>
	<div class="controls" onclick={(e) => e.stopPropagation()}>
		<label>
			Height:
			<input
				type="range"
				min="10"
				max="200"
				value={debug?.height || 40}
				oninput={(e) => debug && (debug.height = Number(e.target.value))}
			/>
			<span>{debug?.height || 40}px</span>
		</label>

		<label>
			Width:
			<input
				type="range"
				min="10"
				max="200"
				value={debug?.width || 30}
				oninput={(e) => debug && (debug.width = Number(e.target.value))}
			/>
			<span>{debug?.width || 30}px</span>
		</label>

		<label>
			Scale:
			<input
				type="range"
				min="0.1"
				max="3"
				step="0.1"
				value={debug?.scale || 1}
				oninput={(e) => debug && (debug.stats.scale = Number(e.target.value))}
			/>
			<span>{debug?.scale || 1}x</span>
		</label>

		<label>
			Speed:
			<input
				type="range"
				min="0.05"
				max="1"
				step="0.05"
				value={debug?.stats.speed || 0.2}
				oninput={(e) => debug && (debug.stats.speed = Number(e.target.value))}
			/>
			<span>{debug?.stats.speed || 0.2}</span>
		</label>
	</div>

	{#if debug}
		<Entity entity={debug} />
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
		z-index: 1000;
		width: 100dvw;
		height: 100dvh;
	}
</style>
