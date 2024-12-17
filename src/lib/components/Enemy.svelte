<script>
	import { devTools } from '$store/DevTools.svelte';
	import { fade } from 'svelte/transition';

	const { enemy } = $props();

	let spriteSheet = $derived(enemy.spriteSheet);
</script>

<div
	out:fade
	onclick={() => devTools.inspectEntity(enemy)}
	style:background={`url(${spriteSheet}) no-repeat ${enemy.sprite.currentFrame[0]}px ${enemy.sprite.currentFrame[1]}px`}
	style:width={`${enemy.width}px`}
	style:height={`${enemy.height}px`}
	style:left={`${enemy.position.x}px`}
	style:top={`${enemy.position.y}px`}
	style:transform={`rotate(${enemy.rotation}deg) scale(${enemy.scale})`}
	style:transform-origin={'center'}
></div>

<style>
	div {
		background-position: center;
		z-index: 10;
		position: absolute;
	}
</style>
