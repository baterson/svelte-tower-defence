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
</style>
