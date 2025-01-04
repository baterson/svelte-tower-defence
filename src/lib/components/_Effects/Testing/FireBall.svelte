<!-- FireBallClassic.svelte -->
<script>
	const { entity } = $props();
</script>

<div class="fireball classic" style:width={`${entity.width}px`} style:height={`${entity.height}px`}>
	<div class="core" />
</div>

<style>
	.fireball {
		position: absolute;
		z-index: 99;
		animation: rotate 1s infinite linear;
	}

	.core {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		background: linear-gradient(90deg, #ff4500, #ffa500);
		box-shadow:
			0 0 10px #ff4500,
			0 0 20px #ffa500,
			0 0 30px #ff4500;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
