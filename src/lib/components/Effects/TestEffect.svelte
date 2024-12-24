<!-- NeonCircle.svelte -->
<script>
	// Import the custom transition function
	import { neonLightTransition } from '../transitions.js';

	const { entity } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
{#if entity}
	<div
		class="circle"
		style:width={`${entity.width}px`}
		style:height={`${entity.height}px`}
		style:left={0}
		style:top={0}
	></div>
{/if}

<style>
	.circle {
		z-index: 99;
		position: absolute;
		border-radius: 50%;
		background: linear-gradient(90deg, #ff4d00, #ffd700);
		box-shadow:
			0 0 10px #ff4d00,
			0 0 20px #ffd700,
			0 0 30px #ff4d00;
		animation: fireball 2s infinite;
	}

	@keyframes fireball {
		0% {
			transform: scale(1);
			box-shadow:
				0 0 10px #ff4d00,
				0 0 20px #ffd700,
				0 0 30px #ff4d00;
		}

		50% {
			transform: scale(3);
			box-shadow:
				0 0 15px #ff4d00,
				0 0 30px #ffd700,
				0 0 45px #ff4d00;
		}

		100% {
			transform: scale(1);
			box-shadow:
				0 0 10px #ff4d00,
				0 0 20px #ffd700,
				0 0 30px #ff4d00;
		}
	}
</style>
