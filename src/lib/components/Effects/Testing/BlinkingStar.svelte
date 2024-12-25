<script>
	import { fade } from 'svelte/transition';

	const { entity } = $props();

	let rotation = $state(0);
	let scale = $state(1);

	$effect(() => {
		const interval = setInterval(() => {
			rotation += 2;
			scale = 0.8 + Math.sin(Date.now() / 500) * 0.2;
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="star-container"
	transition:fade
	style:width={`${entity.width / 3}px`}
	style:height={`${entity.height / 3}px`}
	style:left={`10px`}
	style:top={`10px`}
	style:transform={`rotate(${rotation}deg) scale(${scale})`}
>
	<div class="star" />
</div>

<style>
	.star-container {
		position: absolute;
		z-index: 6;
		transform-origin: center;
		pointer-events: none;
	}

	.star {
		transform: scale(2);
		width: 100%;
		height: 100%;
		background: white;
		clip-path: polygon(
			50% 0%,
			61% 35%,
			98% 35%,
			68% 57%,
			79% 91%,
			50% 70%,
			21% 91%,
			32% 57%,
			2% 35%,
			39% 35%
		);
		background: linear-gradient(45deg, #fff4d6, #ffeb3b);
		box-shadow:
			0 0 10px #fff4d6,
			0 0 20px #ffeb3b,
			0 0 30px #ffd700;
		animation: glow 1.5s ease-in-out infinite alternate;
	}

	@keyframes glow {
		from {
			box-shadow:
				0 0 10px #fff4d6,
				0 0 20px #ffeb3b,
				0 0 30px #ffd700;
		}
		to {
			box-shadow:
				0 0 20px #fff4d6,
				0 0 30px #ffeb3b,
				0 0 40px #ffd700;
		}
	}
</style>
