<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();

	let droplets = $state([]);
	const DROPLET_COUNT = 15;

	$effect(() => {
		droplets = Array.from({ length: DROPLET_COUNT }, () => ({
			id: Math.random(),
			x: Math.random() * entity.width,
			y: Math.random() * entity.height,
			size: Math.random() * 4 + 2,
			opacity: Math.random() * 0.5 + 0.5,
			speed: Math.random() * 0.5 + 0.2
		}));

		const interval = setInterval(() => {
			droplets = droplets.map((d) => ({
				...d,
				y: d.y + d.speed,
				opacity: 0.3 + Math.sin(Date.now() / 1000 + d.id) * 0.3,
				y: d.y > entity.height ? 0 : d.y + d.speed
			}));
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	transition:fade
	class="liquid-container"
	style:width={`${entity.width * 1.5}px`}
	style:height={`${entity.height * 1.5}px`}
>
	<div class="liquid-core"></div>
	{#each droplets as droplet (droplet.id)}
		<div
			class="droplet"
			style:left={`${droplet.x}px`}
			style:top={`${droplet.y}px`}
			style:width={`${droplet.size}px`}
			style:height={`${droplet.size}px`}
			style:opacity={droplet.opacity}
		/>
	{/each}
</div>

<style>
	.liquid-container {
		position: absolute;
		pointer-events: none;
	}

	.liquid-core {
		position: absolute;
		inset: 25%;
		background: radial-gradient(
			circle,
			rgba(212, 0, 255, 0.861) 0%,
			rgba(21, 0, 255, 0.591) 50%,
			transparent 70%
		);
		filter: blur(1px);
		animation: pulse 2s ease-in-out infinite;
	}

	.droplet {
		position: absolute;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.8),
			rgba(0, 149, 255, 0.6)
		);
		border-radius: 50%;
		filter: blur(1px);
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}
</style>
