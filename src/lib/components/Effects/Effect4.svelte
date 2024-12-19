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
	style:left={`0`}
	style:top={`0`}
/>

<style>
	.circle {
		z-index: 99;
		position: absolute;
		/* top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
		border-radius: 10%;
		background: linear-gradient(90deg, #00ff11, #ffe66d);
		box-shadow:
			0 0 10px #ffe66d,
			0 0 20px #10d663,
			0 0 30px #ffe66d;
	}
</style>
