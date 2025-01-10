<script>
	import { managers } from '$lib/store/managers.svelte';
	import { cursor } from '$lib/store/Cursor.svelte';
	import DynamicEntity from './DynamicEntity.svelte';
	import StaticEntity from './StaticEntity.svelte';
	import { lootTracker } from '$lib/store/LootTracker.svelte';
	import HealthBar from './HealthBar.svelte';

	const entityManager = $derived(managers.get('entityManager'));

	const onclick = (tower) => (e) => {
		e.stopPropagation();
		if (tower.upgradeLevel === 2 || !tower.isUpgradable || cursor.inAnimation) {
			return;
		}

		lootTracker.spendLoot({ type: 'upgrade', payload: { tower } });
	};
</script>

<section>
	{#each entityManager.loot as loot (loot.id)}
		<DynamicEntity entity={loot} --z-index={11} />
	{/each}

	{#each entityManager.projectiles as projectile (projectile.id)}
		<DynamicEntity entity={projectile} --z-index={12} />
	{/each}

	{#each entityManager.enemies as enemy (enemy.id)}
		<DynamicEntity entity={enemy} />
	{/each}

	<div class="towers">
		{#each entityManager.topTowers as tower, index (tower.id)}
			<div class="tower-wrapper">
				<StaticEntity
					entity={tower}
					onclick={onclick(tower)}
					--cursor={cursor.get('hammer')}
					--z-index={10}
					--pointer-events={'auto'}
					--margin-left={index === 0 ? '12px' : '0'}
					--margin-right={index === 1 ? '12px' : '0'}
				/>
			</div>
		{/each}
	</div>

	<div class="throne">
		<StaticEntity entity={entityManager.throne} --cursor={cursor.get('arrow')} />
		<HealthBar entity={entityManager.throne} --width={`${entityManager.throne.width}px`} />
	</div>

	<div class="towers">
		{#each entityManager.bottomTowers as tower, index (tower.id)}
			<div class="tower-wrapper">
				<StaticEntity
					entity={tower}
					onclick={onclick(tower)}
					--cursor={cursor.get('hammer')}
					--z-index={10}
					--pointer-events={'auto'}
					--margin-left={index === 0 ? '12px' : '0'}
					--margin-right={index === 1 ? '12px' : '0'}
				/>
			</div>
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
		width: 100%;
		height: 100%;
		will-change: transform;
		z-index: 4;
	}

	.towers {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tower-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.throne {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		gap: -10px;
	}

	@media (max-width: 768px) {
		section {
			margin-top: 0;
			justify-content: end;
		}

		.towers {
			gap: 60px;
		}
	}
</style>
