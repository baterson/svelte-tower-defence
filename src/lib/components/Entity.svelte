<script>
	const { entity } = $props();

	let spriteSheet = $derived(entity.spriteSheet);
	const onClick = () => {
		if (entity.type === 'tower') {
			entity.state.setState('Build');
		}
	};
</script>

<div
	onclick={onClick}
	style:background={`url(${spriteSheet}) no-repeat ${entity.sprite.currentFrame[0]}px ${entity.sprite.currentFrame[1]}px`}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:left={`${entity.position.x}px`}
	style:top={`${entity.position.y}px`}
	style:transform={`rotate(${entity.rotation}deg) scale(${entity.sprite.scaleX}, ${entity.sprite.scaleY})`}
	style:transform-origin={'center'}
></div>

<style>
	div {
		background-position: center;
		z-index: 10;
		position: absolute;
	}
</style>
