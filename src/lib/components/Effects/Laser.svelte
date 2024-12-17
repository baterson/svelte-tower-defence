<script lang="ts">
	const { entity } = $props();

	// Масштаб длины лазера (можно подстраивать)
	let laserLength = entity.length ?? 150;

	let particles = $state([]);
	const numParticles = 15; // Количество частиц
	const neonColors = [
		'#00FFFF', // cyan
		'#FF00FF', // magenta
		'#FF0080', // hot pink
		'#80FFFF' // light cyan
	];

	$effect(() => {
		// Генерируем частицы
		particles = Array.from({ length: numParticles }, () => {
			const color = neonColors[Math.floor(Math.random() * neonColors.length)];
			return {
				id: Math.random(),
				offset: Math.random(), // позиция частицы вдоль лазера (от 0 до 1)
				size: Math.random() * 3 + 2,
				speed: Math.random() * 0.5 + 0.5,
				color,
				opacity: Math.random() * 0.5 + 0.5
			};
		});

		// Очищаем частицы при размонтировании
		return () => {
			particles = [];
		};
	});
</script>

<div
	class="laser-container"
	style="
        left: {entity.position.x}px;
        top: {entity.position.y}px;
        transform: rotate({entity.rotation}deg);
    "
>
	<!-- Лазерный луч -->
	<div
		class="laser-beam"
		style="
            width: {laserLength}px;
        "
	>
		<div class="core"></div>
		<div class="glow"></div>
	</div>

	<!-- Частицы вдоль лазера -->
	{#each particles as particle (particle.id)}
		<div
			class="particle"
			style="
                --offset: {particle.offset};
                --size: {particle.size}px;
                --speed: {particle.speed};
                --color: {particle.color};
                --opacity: {particle.opacity};
                --length: {laserLength}px;
            "
		></div>
	{/each}
</div>

<style>
	.laser-container {
		position: absolute;
		pointer-events: none;
		transform-origin: left center; /* вращение вокруг левого конца луча */
	}

	.laser-beam {
		position: relative;
		height: 2px; /* толщина луча */
		transform-origin: left center;
	}

	.core {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #00ffff, #ff00ff);
		border-radius: 1px;
		animation: pulseCore 1.5s ease-in-out infinite;
	}

	.glow {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 1px;
		box-shadow:
			0 0 10px #00ffff,
			0 0 20px #ff00ff,
			0 0 30px #00ffff;
		animation: pulseGlow 1.5s ease-in-out infinite alternate;
	}

	.particle {
		position: absolute;
		top: 50%;
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
		background: var(--color);
		box-shadow: 0 0 8px var(--color);
		opacity: var(--opacity);
		transform-origin: left center;
		animation: particleMove 0.8s ease-out infinite;
	}

	/* Позиционирование частиц вдоль луча: 
       Используем custom properties:
       --offset определяет, где по длине луча (от 0 до 1) частица изначально появляется.
       Анимация смещает её в обратную сторону, создавая эффект пробегающих искр.
    */
	@keyframes particleMove {
		0% {
			transform: translateX(calc(var(--offset) * var(--length))) translateY(-50%) scale(1);
			opacity: var(--opacity);
		}
		100% {
			transform: translateX(calc((var(--offset) * var(--length)) - 50px * var(--speed)))
				translateY(-50%) scale(0);
			opacity: 0;
		}
	}

	@keyframes pulseCore {
		0% {
			transform: scaleX(1);
		}
		50% {
			transform: scaleX(1.05);
		}
		100% {
			transform: scaleX(1);
		}
	}

	@keyframes pulseGlow {
		0% {
			box-shadow:
				0 0 10px #00ffff,
				0 0 20px #ff00ff,
				0 0 30px #00ffff;
		}
		100% {
			box-shadow:
				0 0 15px #00ffff,
				0 0 25px #ff00ff,
				0 0 40px #00ffff;
		}
	}
</style>
