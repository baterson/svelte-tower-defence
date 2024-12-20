<!-- <<<<<<< HEAD
<script>
	import { fade } from 'svelte/transition';

	const { entity } = $props();

	// Состояние для частиц
	let particles = $state([]);
	const PARTICLE_COUNT = 20;

	// Генерация случайной цветовой гаммы из неоновых цветов
	const neonColors = [
		'#FF10F0', // неоновый розовый
		'#7B61FF', // неоновый фиолетовый
		'#14F195', // неоновый зеленый
		'#00FFFF' // неоновый голубой
	];

	// Инициализация и обновление частиц
	$effect(() => {
		// Начальная генерация частиц
		particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

		// Обновление частиц
		const interval = setInterval(() => {
			particles = particles.map((particle) => {
				// Обновление времени жизни
				const newLifetime = particle.lifetime - 0.02;

				if (newLifetime <= 0) {
					return createParticle(); // Создаем новую частицу
				}

				// Обновление позиции
				return {
					...particle,
					offset: {
						x: particle.offset.x + particle.velocity.x,
						y: particle.offset.y + particle.velocity.y
					},
					lifetime: newLifetime
				};
			});
		}, 16);

		return () => clearInterval(interval);
	});

	function createParticle() {
		const angle = Math.random() * Math.PI * 2;
		const speed = Math.random() * 2 + 1;
		const distance = Math.random() * 10;

		return {
			color: neonColors[Math.floor(Math.random() * neonColors.length)],
			size: Math.random() * 3 + 1,
			offset: {
				x: Math.cos(angle) * distance,
				y: Math.sin(angle) * distance
			},
			velocity: {
				x: Math.cos(angle) * speed * 0.1,
				y: Math.sin(angle) * speed * 0.1
			},
			lifetime: Math.random() * 0.5 + 0.5
		};
	}
</script>

<div
	class="projectile"
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`${entity.position.x}px`}
	style:top={`${entity.position.y}px`}
	style:transform={`rotate(${entity.rotation}rad)`}
>
	<!-- Основное ядро снаряда -->
	<div class="core"></div>

	<!-- Внешнее свечение -->
	<div class="glow"></div>

	<!-- Система частиц -->
	{#each particles as particle}
		<div
			class="particle"
			style:--x={`${particle.offset.x}px`}
			style:--y={`${particle.offset.y}px`}
			style:--size={`${particle.size}px`}
			style:--color={particle.color}
			style:--opacity={particle.lifetime}
		></div>
	{/each}
</div>

<style>
	.projectile {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		transform-origin: center;
	}

	.core {
		position: absolute;
		width: 40%;
		height: 40%;
		background: radial-gradient(
			circle,
			rgba(255, 255, 255, 1) 0%,
			rgba(255, 16, 240, 0.8) 50%,
			rgba(123, 97, 255, 0) 100%
		);
		border-radius: 50%;
		filter: blur(1px);
		animation: pulse 0.8s infinite ease-in-out;
	}

	.glow {
		position: absolute;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			circle,
			rgba(255, 16, 240, 0.4) 0%,
			rgba(123, 97, 255, 0.2) 50%,
			transparent 100%
		);
		border-radius: 50%;
		filter: blur(3px);
		animation: pulse 1.2s infinite ease-in-out alternate;
	}

	.particle {
		position: absolute;
		width: var(--size);
		height: var(--size);
		background: var(--color);
		border-radius: 50%;
		transform: translate(calc(var(--x)), calc(var(--y)));
		opacity: var(--opacity);
		filter: blur(1px);
		pointer-events: none;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.8;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
    }
/* ============= */
<!-- laser -->
<script>
	import { fade } from 'svelte/transition';

	const { entity } = $props();

	// Масштаб длины лазера
	let laserLength = $state(150);

	// Состояние для частиц
	let particles = $state([]);
	const numParticles = 20;

	// Неоновые цвета для частиц
	const neonColors = [
		'#00FFFF', // cyan
		'#FF00FF', // magenta
		'#FF0080', // hot pink
		'#80FFFF' // light cyan
	];

	$effect(() => {
		// Генерация частиц
		particles = Array.from({ length: numParticles }, () => ({
			id: Math.random(),
			offset: Math.random(), // позиция вдоль лазера (0-1)
			size: Math.random() * 3 + 2,
			speed: Math.random() * 0.5 + 0.5,
			color: neonColors[Math.floor(Math.random() * neonColors.length)],
			opacity: Math.random() * 0.5 + 0.5
		}));
	});
</script>

<div
	class="laser-container"
	style="
        left: {entity.position.x}px;
        top: {entity.position.y}px;
        transform: rotate({entity.rotation}rad);
      "
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
>
	<!-- Основной лазерный луч -->
	<div class="laser-beam" style="width: {laserLength}px;">
		<div class="core"></div>
		<div class="glow"></div>
	</div>

	<!-- Частицы вдоль лазера -->
	{#each particles as particle (particle.id)}
		<div
			class="particle"
			style:--offset={particle.offset}
			style:--size="{particle.size}px"
			style:--speed={particle.speed}
			style:--color={particle.color}
			style:--opacity={particle.opacity}
			style:--length="{laserLength}px"
		/>
	{/each}
</div>

<style>
	.laser-container {
		position: absolute;
		pointer-events: none;
		transform-origin: left center;
	}

	.laser-beam {
		position: relative;
		height: 3px;
		transform-origin: left center;
	}

	.core {
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #ff00ff, #00ffff);
		border-radius: 1px;
		animation: pulseCore 1s ease-in-out infinite;
	}

	.glow {
		position: absolute;
		width: 100%;
		height: 100%;
		border-radius: 1px;
		box-shadow:
			0 0 10px #ff00ff,
			0 0 20px #00ffff,
			0 0 30px #ff00ff;
		animation: pulseGlow 1.5s ease-in-out infinite alternate;
	}

	.particle {
		position: absolute;
		width: var(--size);
		height: var(--size);
		border-radius: 50%;
		background: var(--color);
		box-shadow: 0 0 8px var(--color);
		opacity: var(--opacity);
		transform-origin: left center;
		animation: particleMove 0.8s ease-out infinite;
	}

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
			transform: scaleY(1);
		}
		50% {
			transform: scaleY(1.5);
		}
		100% {
			transform: scaleY(1);
		}
	}

	@keyframes pulseGlow {
		0% {
			box-shadow:
				0 0 10px #ff00ff,
				0 0 20px #00ffff,
				0 0 30px #ff00ff;
		}
		100% {
			box-shadow:
				0 0 15px #ff00ff,
				0 0 25px #00ffff,
				0 0 40px #ff00ff;
		}
    }