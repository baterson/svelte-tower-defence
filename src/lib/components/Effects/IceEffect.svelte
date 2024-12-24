<!-- IceFreezingEffect.svelte -->
<script>
	const { entity } = $props();
	let iceShards = $state([]);

	$effect(() => {
		iceShards = Array.from({ length: 10 }, () => ({
			id: Math.random(),
			x: Math.random() * 100,
			y: Math.random() * 100,
			size: Math.random() * 10 + 5,
			angle: Math.random() * 360,
			opacity: Math.random() * 0.5 + 0.3
		}));

		const interval = setInterval(() => {
			iceShards = iceShards.map((shard) => ({
				...shard,
				opacity: 0.3 + Math.sin(Date.now() / 500 + shard.id) * 0.2,
				angle: shard.angle + 1
			}));
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="freezing-effect"
	style:width={`${entity.width * 2}px`}
	style:height={`${entity.height * 2}px`}
	style:left={`-${entity.width * 0.5}px`}
	style:top={`-${entity.height * 0.5}px`}
>
	{#each iceShards as shard (shard.id)}
		<div
			class="ice-shard"
			style:left={`${shard.x}%`}
			style:top={`${shard.y}%`}
			style:width={`${shard.size}px`}
			style:height={`${shard.size}px`}
			style:transform={`rotate(${shard.angle}deg)`}
			style:opacity={shard.opacity}
		/>
	{/each}
	<div class="freeze-overlay" />
</div>

<style>
	.freezing-effect {
		position: absolute;
		pointer-events: none;
		z-index: 5;
	}

	.ice-shard {
		position: absolute;
		background: linear-gradient(45deg, rgba(255, 255, 255, 0.8), rgba(135, 206, 235, 0.4));
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
		filter: blur(1px);
	}

	.freeze-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			45deg,
			transparent 40%,
			rgba(255, 255, 255, 0.1) 45%,
			rgba(135, 206, 235, 0.2) 50%,
			rgba(255, 255, 255, 0.1) 55%,
			transparent 60%
		);
		animation: iceShine 3s infinite linear;
	}

	@keyframes iceShine {
		from {
			background-position: -200% -200%;
		}
		to {
			background-position: 200% 200%;
		}
	}
</style>
