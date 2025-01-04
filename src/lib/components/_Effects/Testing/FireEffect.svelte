<script>
	const { entity } = $props();

	let particles = $state([]);
	const PARTICLE_COUNT = 15;

	$effect(() => {
		particles = Array.from({ length: PARTICLE_COUNT }, () => ({
			id: Math.random(),
			x: Math.random() * entity.width,
			y: entity.height,
			size: Math.random() * 4 + 2,
			opacity: Math.random() * 0.5 + 0.5,
			velocity: Math.random() * 2 + 1,
			hue: Math.random() * 60 + 10
		}));

		const interval = setInterval(() => {
			particles = particles.map((p) => ({
				...p,
				y: p.y - p.velocity,
				opacity: p.opacity * 0.98,
				y: p.y <= 0 ? entity.height : p.y - p.velocity, // Возвращаем частицу вниз когда она достигает верха
				opacity: p.y <= 0 ? Math.random() * 0.5 + 0.5 : p.opacity * 0.98
			}));
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div class="fire-container" style:width={`${entity.width}px`} style:height={`${entity.height}px`}>
	{#each particles as particle (particle.id)}
		<div
			class="particle fire-particle"
			style:left={`${particle.x}px`}
			style:top={`${particle.y}px`}
			style:width={`${particle.size}px`}
			style:height={`${particle.size}px`}
			style:opacity={particle.opacity}
			style:background={`hsl(${particle.hue}, 100%, 50%)`}
			style:box-shadow={`0 0 ${particle.size * 2}px hsl(${particle.hue}, 100%, 70%)`}
		/>
	{/each}
	<div class="glow" />
</div>

<style>
	.fire-container {
		position: absolute;
		pointer-events: none;
		z-index: 5;
	}

	.particle {
		position: absolute;
		border-radius: 50%;
		mix-blend-mode: screen;
	}

	.glow {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle,
			rgba(255, 100, 0, 0.2) 0%,
			rgba(255, 50, 0, 0.1) 40%,
			transparent 70%
		);
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 0.5;
		}
		50% {
			opacity: 1;
		}
	}
</style>
