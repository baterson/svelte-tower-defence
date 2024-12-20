<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();
	let scale = $state(1);

	$effect(() => {
		const interval = setInterval(() => {
			scale = 1 + Math.sin(Date.now() / 500) * 0.2;
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="effect-6"
	transition:fade
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`0px`}
	style:top={`0px`}
	style:transform={`scale(${scale})`}
/>

<style>
	.effect-6 {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(circle, #00ffff 0%, #ff00ff 100%);
		box-shadow:
			0 0 10px #00ffff,
			0 0 20px #ff00ff;
		opacity: 0.7;
		pointer-events: none;
		z-index: 4;
	}
</style>
