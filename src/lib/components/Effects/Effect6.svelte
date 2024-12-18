<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();

	let quantum = $state(0);
	let resonance = $state(1);

	$effect(() => {
		const interval = setInterval(() => {
			quantum = (quantum + 0.03) % 1;
			resonance = 1 + Math.sin(quantum * Math.PI * 6) * 0.3;
		}, 16);

		return () => clearInterval(interval);
	});
</script>

<div
	class="quantum-resonator"
	style="
      --quantum: {quantum};
      --resonance: {resonance};
      left: {entity.position.x}px;
      top: {entity.position.y}px;
      transform: rotate({entity.rotation}rad);
    "
	in:fade
>
	<div class="quantum-core"></div>
	<div class="interference-waves"></div>
	<div class="probability-field"></div>
</div>

<style>
	.quantum-resonator {
		position: absolute;
		width: 15px;
		height: 15px;
		mix-blend-mode: screen;
		z-index: 5;
	}

	.quantum-core {
		position: absolute;
		width: 100%;
		height: 100%;
		background: radial-gradient(circle at center, #00ffff, #ff00ff);
		border-radius: 50%;
		transform: scale(var(--resonance));
		filter: blur(2px) brightness(1.5);
	}

	.interference-waves {
		position: absolute;
		width: 200%;
		height: 200%;
		top: -50%;
		left: -50%;
		background: repeating-radial-gradient(
			circle at center,
			transparent 0%,
			rgba(0, 255, 255, 0.1) 2%,
			transparent 4%,
			rgba(255, 0, 255, 0.1) 6%
		);
		transform: rotate(calc(var(--quantum) * 360deg));
		animation: quantum-spin 4s linear infinite;
	}

	.probability-field {
		position: absolute;
		width: 300%;
		height: 300%;
		top: -100%;
		left: -100%;
		background: conic-gradient(
			from calc(var(--quantum) * 720deg),
			transparent 0%,
			#00ffff 25%,
			#ff00ff 50%,
			transparent 75%
		);
		opacity: 0.3;
		filter: blur(8px);
		transform-origin: center;
		animation: probability-fluctuation 3s ease-in-out infinite;
	}

	@keyframes quantum-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes probability-fluctuation {
		0%,
		100% {
			transform: scale(1) rotate(0deg);
		}
		50% {
			transform: scale(1.5) rotate(180deg);
		}
	}
</style>
