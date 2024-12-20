<script>
	import { fade } from 'svelte/transition';

	const { entity } = $props();

	let scale = $state(1);
	let opacity = $state(0.7);

	$effect(() => {
		const interval = setInterval(() => {
			scale = 1 + Math.sin(Date.now() / 1000) * 0.2;
			opacity = 0.8 + Math.sin(Date.now() / 800) * 0.2;
		}, 50);

		return () => clearInterval(interval);
	});
</script>

<div
	class="toxic-cloud"
	transition:fade
	style:width={`${entity.width * 1.5}px`}
	style:height={`${entity.height * 1.5}px`}
	style:left={`10px`}
	style:top={`10px`}
	style:transform={`scale(${scale})`}
	style:opacity
/>

<style>
	.toxic-cloud {
		position: absolute;
		z-index: 5;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(76, 217, 105, 0.7),
			rgba(46, 160, 67, 0.5),
			transparent
		);
		filter: blur(8px);
		box-shadow:
			0 0 20px rgba(76, 217, 105, 0.7),
			0 0 40px rgba(46, 160, 67, 0.5);
		animation: pulse 3s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes pulse {
		0% {
			filter: blur(8px);
		}
		50% {
			filter: blur(12px);
		}
		100% {
			filter: blur(8px);
		}
	}
</style>
