<!-- RockProjectile.svelte -->
<script>
	const { entity } = $props();
	let rotation = $state(0);

	$effect(() => {
		const interval = setInterval(() => {
			rotation += 8;
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="rock"
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform={`rotate(${rotation}deg)`}
>
	<div class="rock-body" />
	<div class="shadow" />
</div>

<style>
	.rock {
		position: absolute;
		z-index: 99;
	}

	.rock-body {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, #6b4423, #8b4513);
		clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
		box-shadow:
			inset -3px -3px 10px rgba(0, 0, 0, 0.5),
			0 0 15px rgba(107, 68, 35, 0.5);
	}

	.shadow {
		position: absolute;
		inset: -20%;
		background: radial-gradient(circle, rgba(107, 68, 35, 0.4), transparent 70%);
		filter: blur(4px);
	}
</style>
