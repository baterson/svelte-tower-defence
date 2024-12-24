<script>
	const { entity } = $props();
</script>

<div
	class="damage-flash"
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	onanimationend={() => {
		entity.removeEffect('TakeDamage');
	}}
>
	<div class="flash" />
</div>

<style>
	.damage-flash {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		filter: blur(2px);
		mix-blend-mode: screen;
	}

	.flash {
		position: absolute;
		inset: 0;
		background: rgba(255, 0, 0);
		border-radius: 50%;
		animation: flash 0.3s ease-out;
	}

	@keyframes flash {
		0% {
			opacity: 0.8;
		}
		50% {
			opacity: 0.4;
		}
		100% {
			opacity: 0;
		}
	}
</style>
