<script>
	import { devTools } from '$store/DevTools.svelte';
	import { Vector2 } from '$store/Vector2.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import { handleScreenChange } from '$store/States/effects';

	let node = $state();

	const { tower, placement } = $props();

	$effect(() => handleScreenChange(node, tower));
</script>

<div
	oncontextmenu={() => devTools.inspectEntity(tower)}
	onclick={tower.upgrade}
	bind:this={node}
	style:place-self={placement}
	style:margin-left={placement === 'start' ? '20px' : 'auto'}
	style:margin-right={placement === 'end' ? '20px' : 'auto'}
	style:background={`url(${tower.spriteSheet}) no-repeat ${tower.sprite.currentFrame[0]}px ${tower.sprite.currentFrame[1]}px`}
	style:width={`${tower.width}px`}
	style:height={`${tower.height}px`}
	style:transform={`rotate(${tower.rotation}deg) scale(${tower.scale})`}
	style:transform-origin={'center'}
></div>

<!-- style:left={`${tower.position.x}px`}
style:top={`${tower.position.y}px`} -->

<style>
	div {
		background-position: center;
		z-index: 10;
		/* position: absolute; */
	}
</style>
