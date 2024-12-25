<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();

	let intensity = $state(1);

	$effect(() => {
		const interval = setInterval(() => {
			intensity = 0.7 + Math.random() * 0.5;
		}, 100);

		return () => clearInterval(interval);
	});
</script>

<div
	class="electric-field"
	transition:fade
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`0px`}
	style:top={`0px`}
	style:opacity={intensity}
></div>

<style>
	.electric-field {
		position: absolute;
		z-index: 5;
		border-radius: 50%;
		background: radial-gradient(circle, #ff00ff20, #ff00ff10, transparent 70%);
		box-shadow:
			0 0 15px #ff00ff,
			0 0 30px #00ffff;
		pointer-events: none;
	}
</style>
