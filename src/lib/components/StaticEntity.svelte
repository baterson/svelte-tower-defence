<script>
	import { managers } from '$lib/store/managers.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import Effect from './Effect.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import { getAnimation } from '$lib/config/animations';

	let { entity, onclick } = $props();

	let node = $state();

	let animation = $derived(getAnimation(entity.animation.name));

	let frame = $derived(animation.frames[entity.animation.currentFrame]);

	let imageLoaded = $state(false);

	function onImageLoad() {
		imageLoaded = true;
	}

	const scale = $derived(screen.isMobile ? entity.scale - 0.2 : entity.scale);
	const transform = $derived(`scale(${scale})`);

	$effect(() => {
		if (!node || !imageLoaded) return;

		let _rect = node.getBoundingClientRect();
		entity.position = new Vector2(_rect.x, _rect.y);
		entity.width = _rect.width;
		entity.height = _rect.height;

		// console.log('entity.position', frame, entity.width, entity.height, screen.width);
	});
</script>

<img
	{onclick}
	style:transform
	bind:this={node}
	src={frame}
	alt="Enemy animation"
	onload={onImageLoad}
/>

<style>
	img {
		pointer-events: var(--pointer-events, none);
		z-index: var(--z-index, 6);

		margin-right: var(--margin-right, 0);
		margin-left: var(--margin-left, 0);

		will-change: transform;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		perspective: 1000;
		-webkit-perspective: 1000;

		border: 0;
		box-sizing: border-box; /* Ensures accurate sizing */
		overflow: hidden; /* Prevents content from escaping */
	}
</style>
