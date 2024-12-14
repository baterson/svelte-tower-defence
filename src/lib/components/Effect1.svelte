<!-- NeonCircle.svelte -->
<script>
	// Import the custom transition function
	import { neonLightTransition } from './transitions.js';

	// State to toggle the transition
	let showCircle = false;

	// Function to toggle the circle visibility
	function toggleCircle() {
		showCircle = !showCircle;
	}
</script>

<button on:click={toggleCircle}>Toggle Circle</button>

{#if showCircle}
	<div
		class="circle"
		in:neonLightTransition={{ duration: 2000 }}
		out:neonLightTransition={{ duration: 2000 }}
	/>
{/if}

<style>
	.circle {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: linear-gradient(90deg, #ff69b4, #ffe66d);
		box-shadow:
			0 0 10px #ffe66d,
			0 0 20px #ff69b4,
			0 0 30px #ffe66d;
	}
</style>
