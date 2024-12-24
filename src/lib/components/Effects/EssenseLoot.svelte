<script>
	let { entity } = $props();

	function blobTransition(node, { duration = 2000, delay = 0 }) {
		return {
			delay,
			duration,
			css: (t) => {
				const scale = 0.8 + Math.sin(t * Math.PI * 2) * 0.2;
				return `
					transform: scale(${scale});
				`;
			}
		};
	}
</script>

<div
	class="essence"
	style:left={0}
	style:top={0}
	style:width="{entity.width}px"
	style:height="{entity.height}px"
	transition:blobTransition
/>

<style>
	.essence {
		position: absolute;
		border-radius: 50%;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.8),
			rgba(123, 200, 255, 0.9) 40%,
			rgba(202, 0, 220) 70%
		);
		pointer-events: none;
		filter: blur(2px);
		box-shadow: 0 0 15px rgba(123, 200, 255, 0.4);
		animation: blob 3s ease-in-out infinite;
	}

	@keyframes blob {
		0%,
		100% {
			border-radius: 50%;
		}
		50% {
			border-radius: 60% 40% 40% 60% / 50% 50% 50% 50%;
		}
	}
</style>
