<script>
	import { fade } from 'svelte/transition';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';

	const { onStart } = $props();

	const text = $derived(soundManager.preloaded ? 'Start game' : `${soundManager.preloadPercent}%`);
</script>

<MenuLayout>
	<div class="content" out:fade={{ duration: 300 }}>
		<div class="title">
			<h1>Svelte Space</h1>
		</div>
		<div class="buttons-container">
			<Button disabled={!soundManager.preloaded} {text} onclick={onStart} />
		</div>
	</div>
</MenuLayout>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100%;
	}
	.title {
		color: #fff;
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
	}
	@media (max-width: 768px) {
		.title {
			font-size: 1.5rem;
		}
	}
</style>
