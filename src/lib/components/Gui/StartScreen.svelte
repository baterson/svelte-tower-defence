<script>
	import { fade } from 'svelte/transition';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import Title from './Title.svelte';

	const { onStart } = $props();

	const text = $derived(soundManager.preloaded ? 'Start game' : `${soundManager.preloadPercent}%`);
</script>

<MenuLayout>
	<div class="content" out:fade={{ duration: 300 }}>
		<Title />

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
</style>
