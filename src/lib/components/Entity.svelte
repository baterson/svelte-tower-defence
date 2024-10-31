<script>
	import { entities } from '$lib/entitiesConfig';

	const { entity } = $props();

	let spriteSheet = $derived(entities[entity.name].spriteSheet);
</script>

<div
	style:background={`url(${spriteSheet}) no-repeat ${entity.state.currentState.sprite.currentFrame[0]}px ${entity.state.currentState.sprite.currentFrame[1]}px`}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`${entity.position.x}px`}
	style:top={`${entity.position.y}px`}
></div>

<style>
	div {
		background-position: center;
		z-index: 10;
		position: absolute;
	}
</style>
