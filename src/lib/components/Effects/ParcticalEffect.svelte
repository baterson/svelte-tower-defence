<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();

	let particles = $state([]);
	const PARTICLE_COUNT = 20;

	$effect(() => {
		particles = Array.from({ length: PARTICLE_COUNT }, () => ({
			id: Math.random(),
			x: Math.random() * entity.width,
			y: Math.random() * entity.height,
			velocityX: (Math.random() - 0.5) * 2,
			velocityY: (Math.random() - 0.5) * 2,
			size: Math.random() * 2 + 1,
			opacity: Math.random() * 0.5 + 0.5,
			hue: Math.random() * 60 + 270 // От фиолетового до синего
		}));

		const interval = setInterval(() => {
			particles = particles.map((p) => {
				let newX = p.x + p.velocityX;
				let newY = p.y + p.velocityY;

				// Отражение от границ
				if (newX < 0 || newX > entity.width) p.velocityX *= -1;
				if (newY < 0 || newY > entity.height) p.velocityY *= -1;

				return {
					...p,
					x: newX,
					y: newY,
					opacity: 0.5 + Math.random() * 0.5
				};
			});
		}, 50);

		return () => clearInterval(interval);
	});
</script>

<div
	class="particles-container"
	transition:fade
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`0px`}
	style:top={`0px`}
>
	{#each particles as particle (particle.id)}
		<div
			class="particle spark-particle"
			style:left={`${particle.x}px`}
			style:top={`${particle.y}px`}
			style:width={`${particle.size}px`}
			style:height={`${particle.size}px`}
			style:opacity={particle.opacity}
			style:background={`hsl(${particle.hue}, 100%, 70%)`}
			style:box-shadow={`0 0 10px hsl(${particle.hue}, 100%, 70%)`}
		/>
	{/each}
</div>

<style>
	.particles-container {
		position: absolute;
		z-index: 5;
		pointer-events: none;
		overflow: hidden;
	}

	.spark-particle {
		position: absolute;
		border-radius: 50%;
		mix-blend-mode: screen;
	}
</style>
