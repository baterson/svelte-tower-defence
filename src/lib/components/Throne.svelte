<script>
	import { devTools } from '$store/DevTools.svelte';
	import { handleScreenChange } from '$store/States/effects';

	const { throne } = $props();

	let node = $state();

	$effect(() => handleScreenChange(node, throne));
</script>

<div
	oncontextmenu={() => devTools.inspectEntity(throne)}
	bind:this={node}
	style:background={`url(${throne.spriteSheet}) no-repeat ${throne.sprite.currentFrame[0]}px ${throne.sprite.currentFrame[1]}px`}
	style:width={`${throne.width}px`}
	style:height={`${throne.height}px`}
	style:transform={`rotate(${throne.rotation}deg) scale(${throne.scale})`}
	style:transform-origin={'center'}
></div>

<style>
	div {
		background-position: center;
		z-index: 10;
	}

	@media (max-width: 768px) {
		div {
			margin-bottom: 80px;
		}
	}
</style>
