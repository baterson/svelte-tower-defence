<script>
	import { cubicIn, cubicOut } from 'svelte/easing';

	let { duration = 2000, starCount = 200 } = $props();

	let isJumping = $state(false);
	let stars = $state([]);

	// Custom transition for stars stretching
	/** @type {import('svelte/transition').TransitionConfig} */
	function hyperStretch(node, { delay = 0, duration = 1000, initialScale = 0, finalScale = 1 }) {
		return {
			delay,
			duration,
			css: (t, u) => {
				const scale = initialScale + (finalScale - initialScale) * t;
				const eased = cubicOut(t);

				return `
            transform: scaleX(${scale}) translateZ(0);
            opacity: ${eased};
          `;
			}
		};
	}

	// Initialize stars with random positions
	$effect(() => {
		stars = Array(starCount)
			.fill(0)
			.map(() => ({
				x: Math.random() * 100,
				y: Math.random() * 100,
				length: Math.random() * 3 + 1,
				delay: Math.random() * 1000
			}));
	});

	function startHyperJump() {
		if (!isJumping) {
			isJumping = true;
			setTimeout(() => {
				isJumping = false;
			}, duration);
		}
	}
</script>

<div class="hyperspace-container" class:jumping={isJumping} onclick={startHyperJump}>
	<div class="stars-container">
		{#each stars as star, i}
			{#if isJumping}
				<div
					class="star"
					style:left="{star.x}%"
					style:top="{star.y}%"
					transition:hyperStretch={{
						delay: star.delay,
						duration: duration - star.delay,
						initialScale: 1,
						finalScale: 30
					}}
				>
					<div class="star-line" style:width="{star.length}px"></div>
				</div>
			{/if}
		{/each}
	</div>

	{#if !isJumping}
		<div class="instruction">Click to jump to hyperspace</div>
	{/if}
</div>

<style>
	.hyperspace-container {
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: #000;
		overflow: hidden;
		cursor: pointer;
		perspective: 1000px;
	}

	.stars-container {
		position: absolute;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
	}

	.star {
		position: absolute;
		width: auto;
		height: 2px;
		transform-origin: left center;
	}

	.star-line {
		height: 100%;
		background: #fff;
		box-shadow:
			0 0 10px #699bff,
			0 0 20px #699bff,
			0 0 30px #699bff;
	}

	.jumping .stars-container {
		animation: tunnel 2s cubic-in-out infinite;
	}

	.instruction {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #ffe81f;
		font-family: 'Star Wars', sans-serif;
		font-size: 1.5em;
		text-align: center;
		opacity: 0.7;
	}

	@keyframes tunnel {
		0%,
		100% {
			transform: translateZ(0) rotateX(0deg);
		}
		50% {
			transform: translateZ(-100px) rotateX(5deg);
		}
	}

	@keyframes flash {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
</style>
