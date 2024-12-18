<!-- NeonCircle.svelte -->
<script>
	// Import the custom transition function
	import { neonLightTransition } from '../transitions.js';

	const { entity } = $props();
</script>

<div
	class="circle"
	in:neonLightTransition={{ duration: 300 }}
	out:neonLightTransition={{ duration: 300 }}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`${entity.position.x}px`}
	style:top={`${entity.position.y}px`}
/>

<style>
	.circle {
		z-index: 99;
		position: absolute;
		/* top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
		border-radius: 50%;
		background: linear-gradient(90deg, #ff69b4, #ffe66d);
		box-shadow:
			0 0 10px #ffe66d,
			0 0 20px #ff69b4,
			0 0 30px #ffe66d;
	}
</style>
