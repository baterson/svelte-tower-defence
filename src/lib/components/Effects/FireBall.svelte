<script>
	import { onMount } from 'svelte';

	const { entity } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
{#if entity}
	<div class="effect-container">
		<!-- Main Fireball -->
		<svg class="fireball" width="100%" height="100%" viewBox="0 0 100 100">
			<defs>
				<radialGradient id="fireGradient" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stop-color="#ffffff" />
					<stop offset="30%" stop-color="#ffdd00" />
					<stop offset="60%" stop-color="#ff4500" />
					<stop offset="100%" stop-color="#ff000000" />
				</radialGradient>

				<filter id="fireGlow">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feComposite in="SourceGraphic" in2="blur" operator="over" />
				</filter>
			</defs>

			<!-- Main fireball centered in the container -->
			<circle cx="50" cy="50" r="35" fill="url(#fireGradient)" filter="url(#fireGlow)" />
		</svg>
	</div>
{/if}

<style>
	.effect-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
	.fireball {
		position: absolute;
		inset: 0;
		animation: pulse 1.2s ease-in-out infinite;
	}
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			filter: brightness(1);
		}
		50% {
			transform: scale(1.1);
			filter: brightness(1.2);
		}
	}
	@keyframes particleFade {
		0% {
			transform: translate(0, 0);
			opacity: 1;
		}
		100% {
			transform: translate(-20px, 0);
			opacity: 0;
		}
	}
</style>
