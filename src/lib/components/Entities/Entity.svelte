<script>
	import { managers } from '$lib/store/managers.svelte';
	import Effect from '../Effect.svelte';
	import AnimationImage from '$lib/components/AnimationImage.svelte';

	let { entity, position, onclick, children } = $props();

	const uiManager = $derived(managers.get('uiManager'));

	let x = $derived(position ? position.x : entity.positionWithOffset.x);
	let y = $derived(position ? position.y : entity.positionWithOffset.y);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	{onclick}
	class:highlighted={uiManager.highlightedEntity &&
		uiManager.highlightedEntity?.name === entity.name}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform-origin={'center'}
	style:transform={`translate(${x}px, ${y}px) rotate(${entity.rotation}deg) scale(${entity.scale})`}
	style:--webkit-transform={`translate(${x}px, ${y}px) rotate(${entity.rotation}deg) scale(${entity.scale})`}
>
	<AnimationImage name={entity.animation.name} currentFrame={entity.animation.currentFrame} />
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
		position: absolute;
		pointer-events: var(--pointer-events, none);
		z-index: var(--z-index, 3);
		left: 0;
		top: 0;

		will-change: transform;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		perspective: 1000;
		-webkit-perspective: 1000;
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
