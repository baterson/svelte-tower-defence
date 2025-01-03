<script>
	import { getAnimation } from '$lib/config/animations';

	const { entity } = $props();

	let animation = $derived(getAnimation(entity.animation.name));

	let frame = $derived(animation.frames[entity.animation.currentFrame]);
	// $effect(() => {
	// 	if (entity.type === 'projectile') {
	// 		console.log('effect:   ', entity.animation.currentFrame);
	// 	}
	// });
</script>

<svg fill="none" xmlns="http://www.w3.org/2000/svg">
	{@html frame}
</svg>

<style>
	svg {
		height: 100%;
		width: 100%;
	}
</style>
