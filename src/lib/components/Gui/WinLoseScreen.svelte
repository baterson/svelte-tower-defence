<script>
	const { onRestart } = $props();
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import { managers } from '$lib/store/managers.svelte';
	import { fade, slide } from 'svelte/transition';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import { onDestroy, onMount } from 'svelte';
	import Loot from './Loot.svelte';

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
			<div class="additional-hint">
				<div>Manage your resources carefully if you want to survive until the last wave!</div>
				<div class="cost">
					<div class="cost-item">
						<div>Upgrading towers costs 35</div>
						<div>
							<Loot width={13} height={13} />
						</div>
					</div>
					<div class="cost-item">
						<div>Enemy click costs 5</div>
						<div>
							<Loot width={13} height={13} />
						</div>
					</div>
				</div>
			</div>
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
	.additional-hint {
		font-size: small;
		max-width: 80%;
		margin: auto;
		line-height: 1.6;
		color: hsl(270, 15%, 45%);

		flex-direction: column;
		padding-top: 1.5rem;
	}
	.cost {
		padding-top: 0.5rem;
		flex-direction: column;
		font-size: x-small;
	}
	.cost-item {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
