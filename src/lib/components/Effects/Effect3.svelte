<!-- NeonCircle.svelte -->
<script>
	// Import the custom transition function
	import { neonLightTransition } from '../transitions.js';

	const { entity } = $props();
</script>

<div
	class="circle"
	in:neonLightTransition={{ duration: 200 }}
	out:neonLightTransition={{ duration: 200 }}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`${entity.position.x}px`}
	style:top={`${entity.position.y}px`}
/>

<style>
	.circle {
		position: absolute;
		border-radius: 10%;
		background: linear-gradient(10deg, #deff05, #aa9219);
		box-shadow:
			0 0 10px #ffe66d,
			0 0 20px #ff69b4,
			0 0 30px #ffe66d;
	}
</style>
