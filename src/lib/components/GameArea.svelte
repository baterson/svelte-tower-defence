<script>
	import { managers } from '$store/managers.svelte';
	import Loot from './Entities/Loot.svelte';
	import Enemy from './Entities/Enemy.svelte';
	import Tower from './Entities/Tower.svelte';
	import Throne from './Entities/Throne.svelte';
	import Entity from './Entities/Entity.svelte';
	import Projectile from './Entities/Projectile.svelte';

	const entityManager = $derived(managers.get('entityManager'));
</script>

<section>
	{#each entityManager.enemies as enemy (enemy.id)}
		<Enemy {enemy} />
	{/each}

	{#each entityManager.projectiles as projectile (projectile.id)}
		<Projectile {projectile} />
	{/each}

	{#each entityManager.loot as loot (loot.id)}
		<Loot {loot} />
	{/each}

	{#each entityManager.towers as tower, index (tower.id)}
		<Tower {tower} {index} />
	{/each}

	<Throne throne={entityManager.throne} />
</section>

<style>
	section {
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
	}

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
