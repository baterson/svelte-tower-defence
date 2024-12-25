<script>
	import { managers } from '$store/managers.svelte';

	const entityManager = $derived(managers.get('entityManager'));

	const { entity } = $props();

	// Calculate color weights based on tower counts
	const towerCounts = $derived({
		fire: entityManager.livingTowers.filter((t) => t.name === 'fireTower').length,
		earth: entityManager.livingTowers.filter((t) => t.name === 'earthTower').length,
		ice: entityManager.livingTowers.filter((t) => t.name === 'iceTower').length,
		wind: entityManager.livingTowers.filter((t) => t.name === 'windTower').length
	});

	function createWaveTransition(node, { duration = 1500 }) {
		return {
			duration,
			css: (t, u) => {
				const scale = 1 + 2 * t; // Expands from 100% to 300%
				const opacity = u; // Fades out
				const blur = 20 * t; // Increases blur as it expands

				return `
                    transform: scale(${scale});
                    opacity: ${opacity};
                    filter: blur(${blur}px);
                `;
			}
		};
	}

	const colorStyle = $derived(calculateColorStyle(towerCounts));

	function calculateColorStyle(counts) {
		const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
		const colors = [];

		if (counts.fire > 0) colors.push(`rgba(255, 77, 77, ${counts.fire / total})`); // Red
		if (counts.earth > 0) colors.push(`rgba(76, 175, 80, ${counts.earth / total})`); // Green
		if (counts.ice > 0) colors.push(`rgba(0, 188, 212, ${counts.ice / total})`); // Light Blue
		if (counts.wind > 0) colors.push(`rgba(225, 225, 225, ${counts.wind / total})`); // White

		return colors.length > 0
			? `radial-gradient(circle, ${colors.join(', ')})`
			: 'radial-gradient(circle, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))';
	}
</script>

<div class="wave-container">
	<div
		class="wave"
		in:createWaveTransition={{ duration: 1500 }}
		style:background={colorStyle}
		style:width={`${entity.width * 2}px`}
		style:height={`${entity.height * 2}px`}
	/>
	<div
		class="wave wave-echo"
		in:createWaveTransition={{ duration: 2000 }}
		style:background={colorStyle}
		style:width={`${entity.width * 2}px`}
		style:height={`${entity.height * 2}px`}
	/>
</div>

<style>
	.wave-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 99;
	}

	.wave {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		mix-blend-mode: screen;
		pointer-events: none;
	}

	.wave-echo {
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(0.95);
			opacity: 0.8;
		}
		50% {
			transform: translate(-50%, -50%) scale(1.05);
			opacity: 0.6;
		}
		100% {
			transform: translate(-50%, -50%) scale(0.95);
			opacity: 0.8;
		}
	}
</style>
