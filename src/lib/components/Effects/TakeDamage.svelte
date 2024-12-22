<script>
	import { fade } from 'svelte/transition';
	const { entity } = $props();

	let intensity = $state(1);

	$effect(() => {
		const interval = setInterval(() => {
			intensity = 0.8 + Math.sin(Date.now() / 100) * 0.2; // Быстрое пульсирующее свечение
		}, 16);

		// Автоматически удаляем эффект
		const timer = setTimeout(() => {
			entity.removeEffect('TakeDamageEffect');
		}, 300); // Короткая длительность для эффекта урона

		return () => {
			clearInterval(interval);
			clearTimeout(timer);
		};
	});
</script>

<div class="damage-flash" transition:fade={{ duration: 100 }} style:opacity={intensity}>
	<div class="explosion"></div>
</div>

<style>
	.damage-flash {
		position: absolute;
		inset: 0;
		pointer-events: none;
		filter: blur(2px);
		mix-blend-mode: screen;
	}

	.explosion {
		position: absolute;
		inset: -20%;
		background: radial-gradient(
			circle,
			rgba(255, 0, 0, 0.8) 0%,
			rgba(255, 50, 0, 0.5) 30%,
			transparent 70%
		);
		animation: explode 0.3s ease-out;
	}

	@keyframes explode {
		0% {
			transform: scale(0.5);
			opacity: 1;
		}
		100% {
			transform: scale(1.2);
			opacity: 0;
		}
	}
</style>
