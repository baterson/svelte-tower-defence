<script>
	import { getAnimation } from '$lib/config/animations/index';

	const { name, currentFrame } = $props();

	let animation = $derived(getAnimation(name));

	let frame = $derived(animation.frames[currentFrame]);
</script>

<!-- <svg
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	shape-rendering="optimizeSpeed"
	style:transform="translate3d(0,0,0)"
>
	{@html frame}
</svg>
 -->

<img src={frame} alt="Enemy animation" />

<style>
	img {
		position: absolute;
		bottom: 0; /* This will position it at the bottom of parent div */
		left: 0;
		width: 100%;
		height: 100%;
	}
	/* svg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	} */
</style>
