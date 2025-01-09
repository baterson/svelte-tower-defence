<script>
	import { managers } from '$lib/store/managers.svelte';
	import Effect from './Effect.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import { screen } from '$lib/store/Screen.svelte';
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

	const translateX = $derived(entity.position.x);
	const translateY = $derived(entity.position.y);

	const transform = $derived(
		`translate(${translateX}px, ${translateY}px) rotate(${entity.rotation}deg) scale(${scale})`
	);

	$effect(() => {
		if (!node || !imageLoaded) return;

		let _rect = node.getBoundingClientRect();
		entity.width = _rect.width;
		entity.height = _rect.height;

		// console.log('screen changes', screen.width, screen.height);
	});
	// style:left={`${entity.position.x}px`}
	// style:top={`${entity.position.y}px`}
</script>

<img
	style:left={`${0}px`}
	style:top={`${0}px`}
	style:transform
	bind:this={node}
	src={frame}
	alt="Enemy animation"
	onload={onImageLoad}
/>

<style>
	img {
		position: absolute;
		pointer-events: var(--pointer-events, none);
		z-index: var(--z-index, 5);

		will-change: transform;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		perspective: 1000;
		-webkit-perspective: 1000;

		padding: 0;
		margin: 0;
		border: 0;
		box-sizing: border-box; /* Ensures accurate sizing */
		overflow: hidden; /* Prevents content from escaping */
	}
</style>
