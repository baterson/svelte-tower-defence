<script>
	import { managers } from '$lib/store/managers.svelte';
	import Effect from '../Effect.svelte';
	import AnimationImage from '$lib/components/AnimationImage.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';

	let { entity, onclick, isStatic, children } = $props();

	// let node = $state();

	const uiManager = $derived(managers.get('uiManager'));

	// let x = $derived(position ? position.x : entity.positionWithOffset.x);
	// let y = $derived(position ? position.y : entity.positionWithOffset.y);
	let x = $derived(entity.position.x);
	let y = $derived(entity.position.y);

	// let node = $state();

	// $effect(() => {
	// 	if (entity.name === 'IceTower' || entity.name === 'PoisonTower') {
	// 		if (!node) return;
	// 		// if (node.offsetLeft === entity.position.x && node.offsetTop === entity.position.y) return;
	// 		// let c = $state.snapshot(entity.position);
	// 		// debugger;
	// 		const rect = node.getBoundingClientRect();
	// 		// console.log('rect.x, rect.y', rect.x, rect.y, rect);

	// 		entity.position = new Vector2(rect.x, rect.y);
	// 		if (entity.upgradeLevel === 1) {
	// 			debugger;
	// 		}
	// 		// console.log('entity.position', entity.position.x, entity.position.y);
	// 	}

	// 	if (entity.type === 'throne') {
	// 		if (!node) return;
	// 		// if (node.offsetLeft === entity.position.x && node.offsetTop === entity.position.y) return;
	// 		// let c = $state.snapshot(entity.position);
	// 		// debugger;
	// 		const rect = node.getBoundingClientRect();
	// 		// console.log('rect.x, rect.y', rect.x, rect.y, rect);

	// 		entity.position = new Vector2(rect.x, rect.y);
	// 		entity.width = node.offsetWidth;
	// 		entity.height = node.offsetHeight;
	// 		// console.log('entity.position', entity.position.x, entity.position.y);
	// 	}
	// });
	// style:--webkit-transform={`translate(${x}px, ${y}px) rotate(${entity.rotation}deg) scale(${entity.scale})`}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	{onclick}
	class:highlighted={uiManager.highlightedEntity &&
		uiManager.highlightedEntity?.name === entity.name}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform-origin={'center'}
	style:transform={!isStatic
		? `translate(${x}px, ${y}px) rotate(${entity.rotation}deg) scale(${entity.scale})`
		: `scale(${entity.scale})`}
	style:position={isStatic ? 'static' : 'absolute'}
	style:left={isStatic ? `` : `${0}px`}
	style:top={isStatic ? `` : `${0}px`}
>
	<AnimationImage
		{entity}
		name={entity.animation.name}
		currentFrame={entity.animation.currentFrame}
	/>
	<!--
	{#each entity.vfx as vfx (vfx)}
		<Effect name={vfx} {entity} />
	{/each} -->

	{#if children}
		{@render children(entity)}
	{/if}
</div>

<style>
	div {
		/* position: absolute; */
		pointer-events: var(--pointer-events, none);
		z-index: var(--z-index, 12);
		/* left: 0;
		top: 0; */

		/* place-self: var(--placement, default); */

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

	div:hover {
		cursor: var(--cursor, 'url(/cursor-pointer.svg), auto');
	}

	.highlighted {
		/* z-index: 1003; */
		animation: highlight 1.5s ease-in-out infinite;
		outline: 3px solid #ffeb3b;
		outline-offset: 2px;
	}

	@keyframes highlight {
		0% {
			outline-color: rgba(255, 235, 59, 0.8);
			outline-offset: 2px;
		}
		50% {
			outline-color: rgba(255, 235, 59, 0.3);
			outline-offset: 4px;
		}
		100% {
			outline-color: rgba(255, 235, 59, 0.8);
			outline-offset: 2px;
		}
	}
</style>
