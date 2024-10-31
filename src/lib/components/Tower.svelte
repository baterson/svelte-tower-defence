<script>
	import { SPRITE_URL } from '$lib/entitiesConfig';

	const { tower } = $props();

	// let spriteSheet = $derived(entities[entity.name].spriteSheet);
</script>

<div
	style:background={`url(${SPRITE_URL}) no-repeat ${tower.sprite.currentFrame.x}px ${tower.sprite.currentFrame.y}px`}
	style:width={`${tower.sprite.width}px`}
	style:height={`${tower.sprite.height}px`}
></div>

<style>
	div {
		z-index: 10;
		position: absolute;
		left: 10px;
		top: 500px;
	}
</style>
