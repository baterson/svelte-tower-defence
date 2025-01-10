<script>
	const { onRestart } = $props();
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { fade, slide } from 'svelte/transition';

	const stageManager = $derived(managers.get('stageManager'));
</script>

<MenuLayout>
	<div class="content" in:slide={{ duration: 500 }} out:fade={{ duration: 300 }}>
		<h1>{stageManager.stageResult === 'win' ? 'You win!' : 'You lose!'}</h1>
		<div class="scores">
			<h2>Enemies killed: {lootTracker.killsEnemy}</h2>
			<h2>Score: {lootTracker.score}</h2>
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
	h2 {
		font-size: 2rem;
	}
	h1 {
		font-size: 4rem;
	}
</style>
