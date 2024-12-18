<script>
	const { tower } = $props();

	let isActive = $state(false);
	let upgradeLevel = $derived(tower.upgradeLevel);

	$effect(() => {
		if (tower.state.currentState.name === 'Shoot') {
			isActive = true;
			setTimeout(() => {
				isActive = false;
			}, 300);
		}
	});
</script>

{#if isActive}
	<!-- Основной эффект свечения -->
	<div class="shoot-effect" />

	<!-- Электрические разряды -->
	<div class="electric-effect">
		<div class="arc arc1"></div>
		<div class="arc arc2"></div>
		<div class="arc arc3"></div>
	</div>

	<!-- Внутреннее кольцо энергии -->
	<div class="energy-ring"></div>
{/if}

<style>
	.shoot-effect {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 120%;
		height: 120%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		border-radius: 50%;
		background: radial-gradient(
			circle at center,
			rgba(0, 255, 255, 0.4) 0%,
			rgba(255, 0, 255, 0.2) 50%,
			transparent 70%
		);
		animation: pulse 0.3s ease-out;
		z-index: 9;
		mix-blend-mode: screen;
	}

	/* Внутреннее кольцо энергии */
	.energy-ring {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 90%;
		height: 90%;
		transform: translate(-50%, -50%);
		border: 2px solid rgba(0, 255, 255, 0.6);
		border-radius: 50%;
		animation: energyPulse 0.3s ease-out;
		box-shadow:
			0 0 10px rgba(0, 255, 255, 0.4),
			inset 0 0 10px rgba(0, 255, 255, 0.4);
	}

	/* Контейнер для электрических разрядов */
	.electric-effect {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 140%;
		height: 140%;
		transform: translate(-50%, -50%);
		pointer-events: none;
		z-index: 10;
	}

	/* Электрические дуги */
	.arc {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 2px;
		height: 40%;
		background: linear-gradient(to top, transparent, #00ffff, transparent);
		transform-origin: bottom center;
	}

	.arc1 {
		transform: translate(-50%, -50%) rotate(0deg);
	}
	.arc2 {
		transform: translate(-50%, -50%) rotate(120deg);
	}
	.arc3 {
		transform: translate(-50%, -50%) rotate(240deg);
	}

	@keyframes pulse {
		0% {
			transform: translate(-50%, -50%) scale(0.8);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.5);
			opacity: 0;
		}
	}

	@keyframes energyPulse {
		0% {
			transform: translate(-50%, -50%) scale(0.8) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
			opacity: 0;
		}
	}

	.arc {
		animation: arcFlash 0.3s ease-out;
	}

	@keyframes arcFlash {
		0% {
			opacity: 1;
			height: 0%;
		}
		50% {
			opacity: 1;
			height: 40%;
		}
		100% {
			opacity: 0;
			height: 40%;
		}
	}

	/* Применяем разные задержки к дугам */
	.arc1 {
		animation-delay: 0s;
	}
	.arc2 {
		animation-delay: 0.1s;
	}
	.arc3 {
		animation-delay: 0.2s;
	}
</style>
