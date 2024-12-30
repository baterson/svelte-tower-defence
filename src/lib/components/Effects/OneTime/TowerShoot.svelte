<script>
	const { entity } = $props();

	// Map tower types to colors
	const towerColors = {
		fireTower: '#ff4400',
		windTower: '#88ff88',
		earthTower: '#964B00',
		iceTower: '#00ffff'
	};

	const color = $derived(towerColors[entity.name] || '#ffffff');
</script>

{#if entity}
	<div
		onanimationend={() => {
			entity.removeVFX('TowerShoot');
		}}
		class="shoot-circle"
		style:--color={color}
		style:--size="{entity.width}px"
	/>
{/if}

<style>
	.shoot-circle {
		z-index: 10;
		position: absolute;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		border: 2px solid var(--color);
		animation: shoot 0.5s ease-out forwards;
		transform: translate(-50%, -50%);
	}

	@keyframes shoot {
		0% {
			opacity: 1;
			transform: translate(-50%, -50%) scale(0.5);
		}
		100% {
			opacity: 0;
			transform: translate(-50%, -50%) scale(2);
		}
	}
</style>
