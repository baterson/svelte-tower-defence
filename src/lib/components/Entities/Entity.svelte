<script>
	import { managers } from '$lib/store/managers.svelte';
	import Effect from '../Effect.svelte';
	import Animation from '$lib/components/Animation.svelte';

	let { entity, position, onclick, children } = $props();

	const uiManager = $derived(managers.get('uiManager'));

	// style:transform={`rotate(${entity.rotation}deg) scale(${entity.scale}) translate(${position ? position.x : entity.positionWithOffset.x}px, ${position ? position.y : entity.positionWithOffset.y}px)`}
	// style:transform={`translate(${position ? position.x : entity.positionWithOffset.x}px, ${position ? position.y : entity.positionWithOffset.y}px) rotate(${entity.rotation}deg) scale(${entity.scale})`}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	{onclick}
	class:highlighted={uiManager.highlightedEntity &&
		uiManager.highlightedEntity?.name === entity.name}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:-transform={`rotate(${entity.rotation}deg) scale(${entity.scale}) translateZ(0)`}
	style:-webkit-transform={`rotate(${entity.rotation}deg) scale(${entity.scale}) translateZ(0)`}
	style:transform-origin={'center'}
	style:top={`${position ? position.y : entity.positionWithOffset.y}px`}
	style:left={`${position ? position.x : entity.positionWithOffset.x}px`}
>
	{#if Animation}
		<Animation name={entity.animation.name} currentFrame={entity.animation.currentFrame} />
	{/if}

	{#each entity.vfx as vfx (vfx)}
		<Effect name={vfx} {entity} />
	{/each}

	{#if children}
		{@render children(entity)}
	{/if}
</div>

<style>
	div {
		position: absolute;
		pointer-events: var(--pointer-events, none);
		z-index: var(--z-index, 3);

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
