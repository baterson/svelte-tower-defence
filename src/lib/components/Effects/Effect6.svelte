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
	style:width={`${entity.width + 10}px`}
	style:height={`${entity.height + 10}px`}
	style:left={`20px`}
	style:top={`10px`}
/>

<style>
	.circle {
		z-index: 99;
		position: absolute;
		/* top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
		border-radius: 10px;
		background: linear-gradient(180deg, #ff0000, #d410c7);
		box-shadow:
			0 0 10px #d410c7,
			0 0 40px #ff0000,
			0 0 50px #d410c7;
	}
</style>
