<script>
	const { entity } = $props();
</script>

<div
	onanimationend={() => {
		entity.removeEffect('TowerEffectRingHigh');
	}}
	class="planet-rings"
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`-2px`}
	style:top={`-2px`}
>
	<div class="ring ring1"></div>
	<div class="ring ring2"></div>
</div>

<style>
	.planet-rings {
		position: absolute;
		z-index: 5;
		pointer-events: none;
	}

	.ring {
		position: absolute;
		inset: -15%;
		width: 130%;
		height: 130%;
		border-radius: 50%;
		border: 2px solid transparent;
		animation: rotateRing 0.3s linear;
	}

	.ring1 {
		border-top-color: rgba(255, 0, 255, 0.2);
		border-bottom-color: rgba(0, 255, 255, 0.2);
	}

	.ring2 {
		width: 120%;
		height: 120%;
		inset: -10%;
		border-left-color: rgba(255, 0, 255, 0.3);
		border-right-color: rgba(0, 255, 255, 0.3);
		animation-direction: reverse;
	}

	@keyframes rotateRing {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
