<script>
	const { children } = $props();
</script>

<div class="menu-container">{@render children()}</div>

<style>
	.menu-container {
		width: 100dvw;
		height: 100dvh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: radial-gradient(circle at center, #5b1578 0%, #1c0334 80%);
		z-index: 1000;
		flex-direction: column;
	}
</style>
