<script>
	import { SPRITE_URL } from '$lib/entitiesConfig';

	const { entity } = $props();
</script>

<div
	style:background={`url(${SPRITE_URL}) no-repeat ${entity.sprite.currentFrame.x}px ${entity.sprite.currentFrame.y}px`}
	style:width={`${entity.sprite.width}px`}
	style:height={`${entity.sprite.height}px`}
	style:left={`${entity.collider.position.x}px`}
	style:top={`${entity.collider.position.y}px`}
></div>

<style>
	div {
		z-index: 10;
		position: absolute;
	}
</style>
