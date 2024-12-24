<!-- IceShard.svelte -->
<script>
	const { entity } = $props();
</script>

<div class="ice-shard" style:width={`${entity.width}px`} style:height={`${entity.height}px`}>
	<div class="shard-core" />
	<div class="sparkles" />
</div>

<style>
	.ice-shard {
		position: absolute;
		z-index: 99;
	}

	.shard-core {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #b2ffff;
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
		animation: spin 0.5s linear infinite;
	}

	.sparkles {
		position: absolute;
		inset: -20%;
		background: radial-gradient(circle at center, rgba(178, 255, 255, 0.6), transparent 70%);
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
