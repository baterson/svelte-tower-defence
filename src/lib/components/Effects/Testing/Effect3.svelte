<script>
	import { neonLightTransition } from '../../transitions.js';

	const { entity } = $props();

	const colors = {
		primary: '#00ffff', // голубой
		secondary: '#ff00ff', // розовый
		accent: '#ff0080', // неоновый розовый
		glow: '#80ffff' // светло-голубой
	};

	let particles = $state([]);

	$effect(() => {
		// Генерируем космические частицы (мелкие звёздочки)
		particles = Array.from({ length: 20 }, () => ({
			id: Math.random(),
			x: Math.random() * 60 - 30,
			y: Math.random() * 60 - 30,
			scale: Math.random() * 0.8 + 0.2,
			velocity: Math.random() * 3 + 1,
			color: Math.random() > 0.5 ? colors.primary : colors.secondary,
			opacity: Math.random() * 0.7 + 0.3
		}));

		return () => {
			particles = [];
		};
	});
</script>

<div
	class="projectile-container"
	in:neonLightTransition={{ duration: 300 }}
	out:neonLightTransition={{ duration: 300 }}
	style="
		width: {entity.width}px;
		height: {entity.height}px;
		left: {entity.position.x}px;
		top: {entity.position.y}px;
	"
>
	<!-- Основная фигура звезды -->
	<div class="star"></div>

	<!-- Частицы -->
	{#each particles as particle (particle.id)}
		<div
			class="particle"
			style="
				--x: {particle.x}px;
				--y: {particle.y}px;
				--scale: {particle.scale};
				--velocity: {particle.velocity};
				--opacity: {particle.opacity};
				--color: {particle.color};
			"
		></div>
	{/each}
</div>

<style>
	.projectile-container {
		position: absolute;
		pointer-events: none;
		transform-origin: center;
		z-index: 99;
	}

	/* Форма звезды при помощи clip-path:
	   Создаём звезду с 5 лучами. Можно подобрать другую форму по вкусу.
	*/
	.star {
		position: absolute;
		width: 100%;
		height: 100%;
		clip-path: polygon(
			50% 0%,
			61% 35%,
			98% 35%,
			68% 57%,
			79% 91%,
			50% 70%,
			21% 91%,
			32% 57%,
			2% 35%,
			39% 35%
		);

		/* Космический градиент:
		   Используем radial-gradient для создания сияния,
		   затем mix-blend-mode для космического эффекта.
		*/
		background: radial-gradient(
			circle at center,
			#000033 0%,
			#3b00b9 30%,
			#ff00ff 60%,
			#00ffff 90%
		);

		/* Светящийся эффект */
		box-shadow:
			0 0 10px #ff00ff,
			0 0 20px #00ffff,
			0 0 30px #ff0080;
		animation: cosmicPulse 1.5s ease-in-out infinite alternate;
		mix-blend-mode: screen;
	}

	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: var(--color, #80ffff);
		box-shadow: 0 0 10px var(--color, #80ffff);
		opacity: var(--opacity);
		animation: trail 0.8s ease-out forwards;
	}

	@keyframes cosmicPulse {
		0% {
			transform: scale(1);
		}
		100% {
			transform: scale(1.1);
		}
	}

	@keyframes trail {
		0% {
			transform: translate(0, 0) scale(var(--scale));
			opacity: var(--opacity);
		}
		100% {
			transform: translate(calc(var(--x) * var(--velocity)), calc(var(--y) * var(--velocity)))
				scale(0);
			opacity: 0;
		}
	}
</style>
