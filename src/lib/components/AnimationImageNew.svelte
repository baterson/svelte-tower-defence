<script>
	import { getAnimation } from '$lib/config/animations/index';
	import { screen } from '$lib/store/Screen.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import { boundingBoxFromPoint } from '$lib/utils/math';
	import { tick } from 'svelte';

	const { name, currentFrame, entity } = $props();

	let animation = $derived(getAnimation(name));

	let frame = $derived(animation.frames[currentFrame]);

	// let node = $state();

	let node = $state();

	let imageLoaded = $state(false);

	let rect = $derived(node.getBoundingClientRect ? node.getBoundingClientRect() : null);

	let w = $derived(node.getBoundingClientRect ? node.getBoundingClientRect().x : null);
	let h = $derived(node.getBoundingClientRect ? node.getBoundingClientRect().y : null);

	let containerRect = $state(null);

	const setPosition = () => {
		if (entity.type === 'throne') {
			let _rect = node.getBoundingClientRect();
			entity.position = new Vector2(_rect.x, _rect.y);
			entity.width = _rect.width;
			entity.height = _rect.height;

			console.log(_rect.x);
		}
	};

	$effect(() => {
		if (!node || !imageLoaded || !rect) return;

		setPosition();

		// if (entity.type === 'throne') {
		// 	// entity.position = new Vector2(rect.x, rect.y);
		// 	// entity.width = rect.width;
		// 	// entity.height = rect.height;

		// 	// entity.x = rect.x;
		// 	// entity.y = rect.y;
		// 	tick().then(() => {
		// 		let _rect = node.getBoundingClientRect();
		// 		console.log('_rect x tick', _rect.x);

		// 		entity.position = new Vector2(_rect.x, _rect.y);
		// 		entity.width = _rect.width;
		// 		entity.height = _rect.height;
		// 	});

		// 	let _rect = node.getBoundingClientRect();

		// 	if (screen.isMobile) {
		// 		entity.x = _rect.x;
		// 		entity.y = _rect.y;
		// 	} else {
		// 		entity.x = _rect.x;
		// 		entity.y = _rect.y;
		// 	}

		// 	console.log('__rect BEFORE', _rect.x);

		// 	// entity.position = new Vector2(_rect.x, _rect.y);
		// 	// entity.width = _rect.width;
		// 	// entity.height = _rect.height;

		// 	// entity.x = rect.x;
		// 	// entity.y = rect.y;

		// 	// debugger;
		// 	// }
		// 	// console.log('entity.position', entity.position.x, entity.position.y);
		// }
	});

	setTimeout(() => {
		// if (entity.type === 'throne') {
		// 	let _rect = node.getBoundingClientRect();
		// 	entity.position = new Vector2(_rect.x, _rect.y);

		// 	console.log('__rect AFTER', _rect.x);
		// }
		setPosition();
	}, 50);

	function onImageLoad() {
		imageLoaded = true;
	}
</script>

<img
	bind:this={node}
	style:transform={`scale(${entity.scale})`}
	src={frame}
	alt="Enemy animation"
	onload={onImageLoad}
/>

<style>
	img {
		/* width: 100%;
		height: 100%; */
	}
	/* svg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
	} */
</style>
