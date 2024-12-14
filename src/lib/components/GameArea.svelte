<script>
	import Entity from '$lib/components/Entity.svelte';
	import { entityManager } from '$lib/store/EntityManager.svelte';
	import Effect1 from './Effect1.svelte';
</script>

<section>
	{#each entityManager.enemies as entity (entity.id)}
		<Entity {entity} />
	{/each}

	{#each entityManager.towers as entity (entity.id)}
		<Entity {entity} />
	{/each}

	{#each entityManager.projectiles as entity (entity.id)}
		<Effect1 {entity} />
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
