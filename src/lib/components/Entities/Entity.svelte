<script>
	import { managers } from '$store/managers.svelte';
	import Effect from '../Effect.svelte';
	import Animation from '$components/Animation.svelte';
	import { fade } from 'svelte/transition';
	// todo: pass in/out transitions
	let { entity, onclick, onout, node = $bindable(), isStatic = false } = $props();

	const uiManager = $derived(managers.get('uiManager'));
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	{onclick}
	out:fade={{ duration: 100 }}
	bind:this={node}
	class:highlighted={uiManager.highlightedEntity &&
		uiManager.highlightedEntity?.name === entity.name}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform={`rotate(${entity.rotation}deg) scale(${entity.stats.scale}) `}
	style:transform-origin={'center'}
	style:top={`${entity.position.y}px`}
	style:left={`${entity.position.x}px`}
>
	{#if Animation}
		<Animation name={entity.animation.name} {entity} />
	{/if}

	<!-- {#each entity.vfx as vfx (vfx)}
		<Effect name={vfx} {entity} />
	{/each} -->
</div>

<style>
	div {
		position: absolute;
		z-index: var(--z-index);
		/* place-self: var(--place-self); */
		/* position: var(--position);
		margin-left: var(--margin-left);
		margin-right: var(--margin-right); */
	}

	.highlighted {
		z-index: 1003;
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
