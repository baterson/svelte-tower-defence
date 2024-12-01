<script>
	import Entity from '$lib/components/Entity.svelte';
	import { game } from '$lib/store/Game.svelte';
</script>

<section>
	{#each game.entityPool.entities as entity}
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
