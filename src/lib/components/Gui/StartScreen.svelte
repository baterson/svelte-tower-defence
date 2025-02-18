<script>
	import { fade } from 'svelte/transition';
	import { soundManager } from '$lib/store/SoundManager.svelte';
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';
	import Title from './Title.svelte';
	import Loot from './Loot.svelte';

	const { onStart } = $props();

	const text = $derived(soundManager.preloaded ? 'Start game' : `${soundManager.preloadPercent}%`);
</script>

<MenuLayout>
	<div class="content" out:fade={{ duration: 300 }}>
		<Title />
		<div>
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
		color: rgba(214, 133, 218);
		text-align: center;
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
