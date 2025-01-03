<script>
	const { entity } = $props();
	// Используем id для уникального clip-path
	const clipId = `clip-${entity.id}`;
</script>

{#if entity.isInteractable}
	<div class="damage-clip-container">
		<svg width="0" height="0">
			<defs>
				<clipPath id={clipId}>
					<use href={`#frame_${entity.animation.currentFrame}`} />
				</clipPath>
			</defs>
		</svg>

		<div
			class="damage-flash"
			style:clip-path={`url(#${clipId})`}
			onanimationend={() => {
				entity.removeVFX('TakeDamage');
			}}
		/>
	</div>
{/if}

<style>
	.damage-clip-container {
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 100;
	}

	.damage-flash {
		position: absolute;
		inset: 0;
		background: rgba(255, 0, 0, 0.8);
		filter: blur(2px);
		mix-blend-mode: screen;
		animation: flash 0.3s ease-out;
	}

	@keyframes flash {
		0% {
			opacity: 0.8;
		}
		50% {
			opacity: 0.4;
		}
		100% {
			opacity: 0;
		}
	}
</style>
