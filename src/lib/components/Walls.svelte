<script>
	import { Walls } from '$lib/config/entitiyConfig';
	import { devTools } from '$lib/store/DevTools.svelte';
</script>

{#if devTools.isWallsVisible}
	{#each Walls as wall}
		<div
			style:left={`${wall.x}px`}
			style:top={`${wall.y}px`}
			style:width={`${wall.width}px`}
			style:height={`${wall.height}px`}
		></div>
	{/each}
{/if}

<style>
	div {
		position: absolute;
		background-color: midnightblue;
	}
</style>
