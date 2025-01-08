<script>
	import { managers } from '$lib/store/managers.svelte';
	import Loot from './Entities/Loot.svelte';
	import Enemy from './Entities/Enemy.svelte';
	import Tower from './Entities/Tower.svelte';
	import Throne from './Entities/Throne.svelte';
	import Entity from './Entities/Entity.svelte';
	import Projectile from './Entities/Projectile.svelte';
	import AnimationImage from './AnimationImage.svelte';
	import AnimationImageNew from './AnimationImageNew.svelte';
	import DynamicEntity from './Entities/DynamicEntity.svelte';
	import StaticEntity from './Entities/StaticEntity.svelte';
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
	<!-- <div class="towers">
		{#each entityManager.towers as tower, index (tower.id)}
			<Tower {tower} placement={index % 2 !== 0 ? 'end' : 'start'} />
		{/each}
	</div> -->

	{#each entityManager.enemies as enemy (enemy.id)}
		<DynamicEntity entity={enemy} />
		<!-- <Enemy {enemy} /> -->
	{/each}

	{#each entityManager.loot as loot (loot.id)}
		<Loot {loot} />
	{/each}

	{#each entityManager.projectiles as projectile (projectile.id)}
		<Projectile {projectile} />
	{/each}

	<div class="towers">
		{#each entityManager.topTowers as tower, index (tower.id)}
			<!-- <Tower {tower} placement={index === 0 ? 'start' : 'end'} /> -->
			<StaticEntity
				entity={tower}
				onclick={onclick(tower)}
				--cursor={'url(/cursor-hammer.svg), auto'}
				--z-index={10}
				--pointer-events={'auto'}
			/>
		{/each}
	</div>

	<div class="throne">
		<!-- <AnimationImageNew name="Throne" currentFrame={0} entity={entityManager.throne} /> -->
		<!-- <AnimationImage name="Throne" currentFrame={0} entity={entityManager.throne} /> -->
		<StaticEntity entity={entityManager.throne} />
	</div>

	<div class="towers">
		{#each entityManager.bottomTowers as tower, index (tower.id)}
			<StaticEntity entity={tower} onclick={onclick(tower)} />

			<!-- <Tower {tower} placement={index === 0 ? 'start' : 'end'} /> -->
		{/each}
	</div>

	<!-- {#each entityManager.towers as tower, index (tower.id)}
		<Tower {tower} {index} />
	{/each}

	<Throne throne={entityManager.throne} /> -->
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
