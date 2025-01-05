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

{#if entity}
	<svg fill="none" xmlns="http://www.w3.org/2000/svg">
		{@html frame}
	</svg>
{/if}

<style>
	svg {
		position: absolute;
		bottom: 0; /* This will position it at the bottom of parent div */
		left: 0;
		width: 100%;
		height: 100%;
	}
</style>
