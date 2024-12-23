<script>
	import { uiManager } from '$store/UIManager.svelte';
	import Effect from './Effect.svelte';
	// todo: pass in/out transitions
	let {
		entity,
		onclick,
		oncontextmenu,
		node = $bindable(),
		isStatic = false,
		placementStyles = ''
	} = $props();

	const positionStyles = $derived(
		isStatic
			? placementStyles
			: `position: absolute; left: ${entity.position.x}px; top: ${entity.position.y}px;`
	);

	const bgStyles = $derived(
		entity.sprite
			? `background: url(${entity.sprite.spritesheet}) no-repeat ${entity.sprite.currentFrame[0]}px ${entity.sprite.currentFrame[1]}px;`
			: ''
	);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	{onclick}
	{oncontextmenu}
	bind:this={node}
	class:highlighted={uiManager.highlightedEntity &&
		uiManager.highlightedEntity?.name === entity.name}
	style:width={`${entity.width}px`}
	style:height={`${entity.height}px`}
	style:transform={`rotate(${entity.rotation}deg) scale(${entity.stats.scale})`}
	style:transform-origin={'center'}
	style={`${positionStyles}; ${bgStyles}`}
>
	{#each entity.effects as effect (effect)}
		<Effect name={effect} {entity} />
	{/each}
</div>

<style>
	div {
		position: relative;
		background-position: center;
		z-index: 10;
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
