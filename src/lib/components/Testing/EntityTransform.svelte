<script>
	import { managers } from '$store/managers.svelte';
	import Effect from '../Effect.svelte';
	import Animation from '$components/_Animation.svelte';

	// todo: pass in/out transitions
	let { entity, onclick, node = $bindable(), isStatic = false } = $props();

	const uiManager = $derived(managers.get('uiManager'));

	// Add a derived transform style that combines rotation, scale, and translation
	const transformStyle = $derived(
		isStatic
			? `rotate(${entity.rotation}deg) scale(${entity.stats.scale})`
			: `translate(${entity.position.x}px, ${entity.position.y}px) `
	);

	// rotate(${entity.rotation}deg) scale(${entity.stats.scale})
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform={transformStyle}
	style:left={0}
	style:top={0}
	style:position={isStatic ? 'relative' : 'absolute'}
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
		background-position: center;
		z-index: 10;

		/* left: 0;
		top: 0; */

		place-self: var(--place-self);
		/* position: var(--position); */
		margin-left: var(--margin-left);
		margin-right: var(--margin-right);
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
