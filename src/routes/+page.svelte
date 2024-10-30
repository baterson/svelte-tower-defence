<script>
	import TowerArea from '$lib/components/TowerArea.svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import Entity from '$lib/components/Entity.svelte';
	import { game } from '$lib/store/Game.svelte';

	// const game = $state(new Game());

	$effect(() => {
		game.start();
	});
</script>

<section>
	<!-- <Entity entity={game.obj} /> -->

	<TowerArea />
	<GameArea />
	<TowerArea />
</section>

<style>
	section {
		width: 720px;
		height: 800px;
		display: flex;
		justify-content: space-between;
	}
</style>
