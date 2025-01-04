<script>
	const { entity } = $props();
	let currentFrameId = $derived(`frame_${entity.animation.currentFrame}`);
</script>

{#if entity.isInteractable}
	<div class="overlay">
		<svg width="100%" height="100%">
			<defs>
				<mask id="flashMask">
					<use href={`#${currentFrameId}`} fill="white" />
				</mask>
			</defs>

			<rect
				width="100%"
				height="100%"
				fill="red"
				opacity="0.6"
				mask="url(#flashMask)"
				class="flash"
				onanimationend={() => {
					entity.removeVFX('TakeDamage');
				}}
			/>
		</svg>
	</div>
{/if}

<style>
	.overlay {
		position: absolute;
		inset: 0;
		z-index: 100;
		pointer-events: none;
	}

	svg {
		width: 100%;
		height: 100%;
		pointer-events: none;
		mix-blend-mode: overlay;
	}

	.flash {
		animation: damage-flash 0.3s ease-out;
	}

	@keyframes damage-flash {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
		100% {
			opacity: 0.2;
		}
	}
</style>
