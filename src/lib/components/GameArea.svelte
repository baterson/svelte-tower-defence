<script>
	import Entity from '$lib/components/Entity.svelte';
	import { game } from '$lib/store/Game.svelte';
</script>

<section>
	{#each game.entityManager.entities as entity (entity.id)}
		<Entity {entity} />
	{/each}
</section>

<style>
	section {
		position: relative;
		flex: 1;
		display: flex;
	}
</style>
