<script>
	const { entity } = $props();

	let rings = $state([]);

	$effect(() => {
		rings = Array.from({ length: 3 }, (_, i) => ({
			id: i,
			scale: 0.5,
			opacity: 1
		}));

		const interval = setInterval(() => {
			rings = rings.map((ring) => ({
				...ring,
				scale: ring.scale >= 2 ? 0.5 : ring.scale + 0.05,
				opacity: Math.max(0, 1 - ring.scale / 2)
			}));
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div class="burst" style:width={`${entity.width}px`} style:height={`${entity.height}px`}>
	<div class="core" />
	{#each rings as ring (ring.id)}
		<div class="ring" style:transform={`scale(${ring.scale})`} style:opacity={ring.opacity} />
	{/each}
</div>

<style>
	.burst {
		position: absolute;
		z-index: 99;
	}

	.core {
		position: absolute;
		left: 25%;
		top: 25%;
		width: 50%;
		height: 50%;
		border-radius: 50%;
		background: white;
		filter: blur(2px);
	}

	.ring {
		position: absolute;
		inset: 0;
		border: 2px solid white;
		border-radius: 50%;
		filter: blur(1px);
	}
</style>
