<script>
	import { managers } from '$lib/store/managers.svelte';
	import DynamicEntity from './DynamicEntity.svelte';
	import StaticEntity from './StaticEntity.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';

	const entityManager = $derived(managers.get('entityManager'));

	const onclick = (tower) => (e) => {
		// move to upgrade
		e.stopPropagation();
		if (tower.upgradeLevel === 2 || !tower.isUpgradable) {
			return;
		}

		lootTracker.spendLoot({ type: 'upgrade', payload: { tower } });
	};
</script>

<section>
	{#each entityManager.loot as loot (loot.id)}
		<DynamicEntity entity={loot} --z-index={5} />
	{/each}

	{#each entityManager.projectiles as projectile (projectile.id)}
		<DynamicEntity entity={projectile} />
	{/each}

	{#each entityManager.enemies as enemy (enemy.id)}
		<DynamicEntity entity={enemy} />
	{/each}

	<div class="towers">
		{#each entityManager.topTowers as tower, index (tower.id)}
			<StaticEntity
				entity={tower}
				onclick={onclick(tower)}
				--cursor={'url(/cursor-hammer.svg), auto'}
				--z-index={10}
				--pointer-events={'auto'}
				--margin-left={index === 0 ? '12px' : '0'}
				--margin-right={index === 1 ? '12px' : '0'}
			/>
		{/each}
	</div>

	<div class="throne">
		<StaticEntity entity={entityManager.throne} />
	</div>

	<div class="towers">
		{#each entityManager.bottomTowers as tower, index (tower.id)}
			<StaticEntity
				entity={tower}
				onclick={onclick(tower)}
				--cursor={'url(/cursor-hammer.svg), auto'}
				--z-index={10}
				--pointer-events={'auto'}
				--margin-left={index === 0 ? '12px' : '0'}
				--margin-right={index === 1 ? '12px' : '0'}
			/>
		{/each}
	</div>
</section>

<style>
	section {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-items: center;
		/* padding: 0 40px 0 40px; */
		/* height: 100dvh;
		width: 100dvw; */
		width: 100%;
		height: 100%;
		will-change: transform;
		z-index: 4;
	}

	.towers {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;

		/* display: grid;
		grid-template-columns: 1fr 1fr; */
		/* gap: 60px; */
		/* padding: 100px; */
	}

	.throne {
		font-size: 94px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	/* section {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		will-change: transform;
		z-index: 4;
	} */

	@media (max-width: 768px) {
		section {
			margin-top: 0;
			justify-content: end;
		}

		.towers {
			gap: 20px;
			padding: 0 20px 0 20px;
		}
	}
</style>
