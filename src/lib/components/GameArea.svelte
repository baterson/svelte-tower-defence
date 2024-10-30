<script>
	import Entity from '$lib/components/Entity.svelte';
	import { game } from '$lib/store/Game.svelte';

	// console.log('game.entityPool', game.entityPool.entities);
</script>

<section>
	<!-- <Entity entity={game.obj} /> -->
	{#each game.entityPool.entities as entity}
		<Entity {entity} />
	{/each}
</section>

<style>
	section {
		position: relative;
		flex: 1;
		display: flex;

		background-color: mediumaquamarine;
	}
</style>
