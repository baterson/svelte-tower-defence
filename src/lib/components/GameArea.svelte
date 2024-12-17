<script>
	import Entity from '$lib/components/Entity.svelte';
	import { entityManager } from '$lib/store/EntityManager.svelte';
	import Effect from './Effects/index.svelte';
	import Enemy from './Enemy.svelte';
	import Tower from './Tower.svelte';
</script>

<section>
	{#each entityManager.enemies as enemy (enemy.id)}
		<Enemy {enemy} />
	{/each}

	{#each entityManager.towers as tower (tower.id)}
		<Tower {tower} />
	{/each}

	<!-- All who uses effect instead of sprite -->
	{#each entityManager.fxEntities as entity (entity.id)}
		<Effect {entity} />
	{/each}

	<Entity entity={entityManager.throne} />
</section>

<style>
	section {
		position: relative;
		flex: 1;
		display: flex;
	}
</style>
