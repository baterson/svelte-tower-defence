<script>
	import { devTools } from '$store/DevTools.svelte';
	import TowerEffects from './effects/TowerEffects.svelte';

	const { tower } = $props();

	let spriteSheet = $derived(tower.spriteSheet);
</script>

<div
	oncontextmenu={() => devTools.inspectEntity(entity)}
	onclick={() => {
		console.log('tower', tower);

		tower.upgrade();
	}}
	style:background={`url(${spriteSheet}) no-repeat ${tower.sprite.currentFrame[0]}px ${tower.sprite.currentFrame[1]}px`}
	style:width={`${tower.width}px`}
	style:height={`${tower.height}px`}
	style:left={`${tower.position.x}px`}
	style:top={`${tower.position.y}px`}
	style:transform={`rotate(${tower.rotation}deg) scale(${tower.scale})`}
	style:transform-origin={'center'}
>
	<TowerEffects {tower} />
</div>

<style>
	div {
		background-position: center;
		z-index: 10;
		position: absolute;
	}
</style>
