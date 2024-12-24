<script>
	const { entity } = $props();
</script>

<div
	class="position-container"
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform={`translate(${entity.position.x}px, ${entity.position.y}px) rotate(${entity.rotation}deg)`}
>
	<div class="shake-container" onanimationend={() => entity.removeEffect('ShakeEffect')}></div>
</div>

<style>
	.position-container {
		position: absolute;
		z-index: 50;
	}

	.shake-container {
		width: 100%;
		height: 100%;
		animation: shake 0.5s;
	}

	@keyframes shake {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		75% {
			transform: translateX(5px);
		}
	}
</style>
