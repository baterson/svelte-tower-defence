<script>
	const { onRestart } = $props();
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { fade, slide } from 'svelte/transition';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import { onDestroy, onMount } from 'svelte';

	const stageManager = $derived(managers.get('stageManager'));

	onMount(() => {
		soundManager.reduceBgVolume();
	});

	onDestroy(() => {
		soundManager.restoreBgVolume();
	});
</script>

<MenuLayout>
	<div class="content" in:slide={{ duration: 500 }} out:fade={{ duration: 300 }}>
		<h1>{stageManager.stageResult === 'win' ? 'You win!' : 'You lose!'}</h1>
		<div class="scores">
			<h2>Enemies killed: {lootTracker.killsEnemy}</h2>
			<h2>Score: {lootTracker.score}</h2>
		</div>
		<div class="hint">
			<h2>Hint:</h2>
			<p>- Click on an Enemy to kill it</p>
			<p>- Click on a gray spot to build a Tower</p>
			<p>- Click on a Tower to upgrade</p>
		</div>
		<Button onclick={onRestart} text="Restart" />
	</div>
</MenuLayout>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100%;
		color: rgba(214, 133, 218);
	}
	.hint {
		text-align: center;
	}
	h2 {
		font-size: 2rem;
	}
	h1 {
		font-size: 4rem;
	}
</style>
