<script lang="ts">
	import { TOWER_POSITIONS, findNearestTowerPosition } from '$utils/towerPositions';
	import type { EntityPool } from '$lib/store/EntityPool.svelte';

	const { entityPool } = $props();

	let scale = $state(1);
	let placedTowers = $state(new Set());

	// Update scale based on viewport
	$effect(() => {
		const baseWidth = 640;
		const viewportWidth = window.innerWidth;
		scale = viewportWidth / baseWidth;
	});

	function handleClick(event: MouseEvent) {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		const clickX = (event.clientX - rect.left) / scale;
		const clickY = (event.clientY - rect.top) / scale;

		const position = findNearestTowerPosition(clickX, clickY);

		if (position && !placedTowers.has(`${position.x},${position.y}`)) {
			entityPool.spawnTower(position.x, position.y);
			placedTowers.add(`${position.x},${position.y}`);
		}
	}
</script>

<div class="tower-placement-area" on:click={handleClick} style:transform="scale({scale})">
	<!-- Highlight available positions -->
	{#each [...TOWER_POSITIONS.left, ...TOWER_POSITIONS.right] as position}
		<div
			class="tower-slot"
			class:occupied={placedTowers.has(`${position.x},${position.y}`)}
			style:left="{position.x}px"
			style:top="{position.y}px"
		/>
	{/each}

	<slot />
</div>

<style>
	.tower-placement-area {
		position: relative;
		width: 640px;
		height: 960px;
		transform-origin: top left;
	}

	.tower-slot {
		position: absolute;
		width: 64px;
		height: 64px;
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		pointer-events: none;
	}

	.tower-slot.occupied {
		border-color: rgba(0, 255, 0, 0.2);
	}
</style>
