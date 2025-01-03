<script>
	const { entity } = $props();
	const clipId = `clip-${entity.id}`;
</script>

{#if entity.isInteractable}
	<div class="fire-clip-container">
		<!-- SVG для clip-path -->
		<svg width="0" height="0">
			<defs>
				<clipPath id={clipId}>
					<use href={`#frame_${entity.animation.currentFrame}`} />
				</clipPath>
			</defs>
		</svg>

		<div class="fire-effect" style:clip-path={`url(#${clipId})`}>
			<div class="fire-core"></div>

			<div class="fire-glow"></div>
		</div>
	</div>
{/if}

<style>
	.fire-clip-container {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 100;
	}

	.fire-effect {
		position: absolute;
		inset: 0;
		mix-blend-mode: screen;
	}

	.fire-core {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			circle at 50% 50%,
			rgba(255, 200, 0, 0.8) 0%,
			rgba(255, 120, 0, 0.6) 40%,
			rgba(255, 60, 0, 0.4) 60%,
			transparent 80%
		);
		animation: pulse 1s ease-in-out infinite alternate;
	}

	.fire-glow {
		position: absolute;
		inset: -5px;
		background: radial-gradient(circle at 50% 50%, rgba(255, 100, 0, 0.5), transparent 70%);
		filter: blur(4px);
		animation: glow 0.8s ease-in-out infinite alternate;
	}

	@keyframes pulse {
		0% {
			transform: scale(0.95);
			opacity: 0.8;
		}
		100% {
			transform: scale(1.05);
			opacity: 1;
		}
	}

	@keyframes glow {
		0% {
			opacity: 0.6;
			filter: blur(4px) brightness(1);
		}
		100% {
			opacity: 0.8;
			filter: blur(4px) brightness(1.2);
		}
	}

	@keyframes particles {
		0% {
			transform: translateY(0) scale(1);
		}
		50% {
			transform: translateY(-5px) scale(1.05);
		}
		100% {
			transform: translateY(0) scale(1);
		}
	}
</style>
