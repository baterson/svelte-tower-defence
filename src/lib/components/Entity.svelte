<script>
	import { SPRITE_URL } from '$lib/entitiesConfig';

	const { entity } = $props();
</script>

<div
	style:background={`url(${SPRITE_URL}) no-repeat ${entity.sprite.x}px ${entity.sprite.y}px`}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`${entity.position.x}px`}
	style:top={`${entity.position.y}px`}
></div>

<style>
	div {
		z-index: 10;
		position: absolute;
	}
</style>
