<script>
	import { fade } from 'svelte/transition';
	import { cursor } from '$lib/store/Cursor.svelte';

	const { children } = $props();
</script>

<div
	class="menu-container"
	style:cursor={cursor.get('arrow')}
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
>
	{@render children()}
</div>

<style>
	.menu-container {
		position: fixed;
		width: 100dvw;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: radial-gradient(circle at center, #5b1578 0%, #1c0334 80%);
		z-index: 10;
		flex-direction: column;
	}
</style>
