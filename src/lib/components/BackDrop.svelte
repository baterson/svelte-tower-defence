<script>
	import { uiManager } from '$store/UIManager.svelte';
</script>

{#if uiManager.currentDialog}
	<div class="backdrop"></div>
{/if}

<style>
	.backdrop {
		z-index: 2;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
	}
</style>
