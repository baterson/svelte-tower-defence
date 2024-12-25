<script>
	const { entity } = $props();
	let shards = $state([]);

	$effect(() => {
		shards = Array.from({ length: 12 }, () => ({
			id: Math.random(),
			x: 0,
			y: 0,
			rotation: Math.random() * 360,
			scale: 0.5 + Math.random() * 0.5,
			speedX: (Math.random() - 0.5) * 4,
			speedY: (Math.random() - 0.5) * 4,
			rotationSpeed: (Math.random() - 0.5) * 10,
			opacity: 1
		}));

		const interval = setInterval(() => {
			shards = shards.map((shard) => ({
				...shard,
				x: shard.x + shard.speedX,
				y: shard.y + shard.speedY,
				rotation: shard.rotation + shard.rotationSpeed,
				speedX: shard.speedX * 0.98,
				speedY: shard.speedY * 0.98,
				opacity: shard.opacity * 0.98
			}));
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="explosion-effect"
	style:width={`${entity.width * 2.5}px`}
	style:height={`${entity.height * 2.5}px`}
	style:left={`-${entity.width * 0.75}px`}
	style:top={`-${entity.height * 0.75}px`}
>
	{#each shards as shard (shard.id)}
		<div
			class="shard"
			style:transform={`
          translate(${shard.x}px, ${shard.y}px)
          rotate(${shard.rotation}deg)
          scale(${shard.scale})
        `}
			style:opacity={shard.opacity}
		/>
	{/each}
	<div class="dust-cloud" />
</div>

<style>
	.explosion-effect {
		position: absolute;
		pointer-events: none;
		z-index: 5;
	}

	.shard {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 10px;
		height: 10px;
		margin: -5px;
		background: linear-gradient(45deg, #8b4513, #654321);
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
		box-shadow: 0 0 5px rgba(139, 69, 19, 0.5);
	}

	.dust-cloud {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: radial-gradient(
			circle,
			rgba(139, 69, 19, 0.4),
			rgba(139, 69, 19, 0.2) 50%,
			transparent 70%
		);
		filter: blur(8px);
		animation: expand 1s infinite;
	}

	@keyframes expand {
		from {
			transform: scale(0.8);
			opacity: 0.6;
		}
		to {
			transform: scale(1.2);
			opacity: 0;
		}
	}
</style>
