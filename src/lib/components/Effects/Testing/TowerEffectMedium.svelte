<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();

	let intensity = $state(1);

	$effect(() => {
		const interval = setInterval(() => {
			intensity = 0.6 + Math.random() * 0.4;
		}, 50);
		return () => clearInterval(interval);
	});
</script>

<div
	onanimationend={() => {
		entity.removeEffect('TowerEffectMedium');
	}}
	class="lightning-corona"
	transition:fade
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`0px`}
	style:top={`0px`}
	style:opacity={intensity}
>
	<div class="lightning"></div>
	<div class="corona"></div>
</div>

<style>
	.lightning-corona {
		position: absolute;
		z-index: 5;
		pointer-events: none;
		border-radius: 50%;
	}

	.lightning {
		position: absolute;
		inset: -10%;
		border-radius: 50%;
		background: conic-gradient(
			from 0deg,
			transparent 0deg,
			#ff00ff 70deg,
			transparent 90deg,
			#00ffff 180deg,
			transparent 200deg,
			#ff00ff 280deg,
			transparent 300deg
		);
		filter: blur(8px);
		animation: rotateLightning 1s linear;
	}

	.corona {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%);
		animation: pulseCorona 2s ease-in-out infinite;
	}

	@keyframes rotateLightning {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes pulseCorona {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.2);
			opacity: 0.8;
		}
	}
</style>
