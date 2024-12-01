<script>
	import { game } from '$lib/store/Game.svelte';
	import Tower from '$lib/components/Tower.svelte';
</script>

<section>
	{#each game.entityPool.towers as tower}
		<Tower {tower} />
	{/each}
</section>

<style>
	section {
		position: relative;
		min-width: 100px;
		/* width: 50px; */
	}
</style>
