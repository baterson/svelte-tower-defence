<script>
	const { entity } = $props();
	let waves = $state([]);

	$effect(() => {
		waves = Array.from({ length: 3 }, (_, i) => ({
			id: i,
			scale: 0.5 + i * 0.2,
			opacity: 1 - i * 0.2
		}));

		const interval = setInterval(() => {
			waves = waves.map((w) => ({
				...w,
				scale: w.scale > 2 ? 0.5 : w.scale + 0.03,
				opacity: Math.max(0, 1 - w.scale / 2)
			}));
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="pulse-effect"
	style:width={`${entity.width * 2}px`}
	style:height={`${entity.height * 2}px`}
	style:left={`-${entity.width * 0.5}px`}
	style:top={`-${entity.height * 0.5}px`}
>
	{#each waves as wave (wave.id)}
		<div class="wave" style:transform={`scale(${wave.scale})`} style:opacity={wave.opacity} />
	{/each}
	<div class="energy-field" />
</div>

<style>
	.pulse-effect {
		position: absolute;
		pointer-events: none;
		z-index: 5;
	}

	.wave {
		position: absolute;
		inset: 0;
		border: 2px solid rgba(255, 255, 255, 0.6);
		border-radius: 50%;
		filter: blur(2px);
	}

	.energy-field {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 70%);
		filter: blur(5px);
		animation: pulse 2s infinite alternate;
	}

	@keyframes pulse {
		from {
			opacity: 0.3;
		}
		to {
			opacity: 0.7;
		}
	}
</style>
