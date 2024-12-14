<script>
	import { cubicOut } from 'svelte/easing';

	/** @type {import('svelte/transition').TransitionConfig} */
	function neonCircle(node, { delay = 0, duration = 1500, color = '#00ff00' }) {
		return {
			delay,
			duration,
			css: (t, u) => {
				const eased = cubicOut(t);
				return `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: transparent;
            border: 2px solid ${color};
            box-shadow:
              0 0 5px ${color},
              0 0 10px ${color},
              0 0 15px ${color},
              inset 0 0 5px ${color},
              inset 0 0 10px ${color};
            opacity: ${eased};
            transform: scale(${0.95 + eased * 0.1});
          `;
			}
		};
	}

	let visible = $state(true);
</script>

<div class="container">
	{#if visible}
		<div
			transition:neonCircle={{
				color: '#2196f3',
				duration: 2000
			}}
			class="circle"
		/>
	{/if}
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #111;
		padding: 20px;
	}

	.circle {
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(1.3);
		}
	}
</style>
