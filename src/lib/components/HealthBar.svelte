<script>
	import { cursor } from '$lib/store/Cursor.svelte';

	const { entity } = $props();

	const maxHealth = 500;
	const segments = 5; // 5 segments of 100 each

	// Calculate health percentage for width
	const healthPercentage = $derived(
		Math.max(0, Math.min(100, (entity.stats.health / maxHealth) * 100))
	);

	// Generate array of segment markers
	const segmentMarkers = Array.from({ length: segments - 1 }, (_, i) => (i + 1) * (100 / segments));
</script>

<div class="health-bar-container" style:cursor={cursor.get('arrow')}>
	<div class="health-bar-background">
		{#each segmentMarkers as marker}
			<div class="segment-marker" style:left="{marker}%" />
		{/each}
		<div
			class="health-bar-fill"
			style:width="{healthPercentage}%"
			class:low={healthPercentage <= 20}
			class:medium={healthPercentage > 20 && healthPercentage <= 60}
			class:high={healthPercentage > 60}
		/>
	</div>
</div>

<style>
	.health-bar-container {
		bottom: 12px;
		position: absolute;
		width: var(--width);
		height: 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.health-bar-background {
		position: relative;
		width: 100%;
		height: 40px;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 10px;
		overflow: hidden;
	}

	.segment-marker {
		position: absolute;
		top: 0;
		width: 2px;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.3);
		z-index: 1;
	}

	.health-bar-fill {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		transition:
			width 0.3s ease-out,
			background-color 0.3s ease-out;
		z-index: 0;
	}

	.health-bar-fill.low {
		background-color: #ff4444;
		box-shadow: 0 0 10px #ff4444;
	}

	.health-bar-fill.medium {
		background-color: #ffff44;
		box-shadow: 0 0 10px #ffff44;
	}

	.health-bar-fill.high {
		background-color: #44ff44;
		box-shadow: 0 0 10px #44ff44;
	}

	.first-segment-highlight {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		background-color: rgba(195, 116, 20, 0.8);
		z-index: 2;
		animation: flashOnce 1s ease-out forwards;
	}

	@media (max-width: 768px) {
		.health-bar-container {
			bottom: 40px;
		}
	}

	@keyframes flashOnce {
		0% {
			transform: scale(0);
			opacity: 0;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.8;
		}
		100% {
			transform: scale(0);
			opacity: 0;
		}
	}
</style>
