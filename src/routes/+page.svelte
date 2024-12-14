<script>
	import TowerArea from '$lib/components/TowerArea.svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import Entity from '$lib/components/Entity.svelte';
	import TowerPlacement from '$components/TowerPlacement.svelte';
	import { game } from '$lib/store/Game.svelte';
	import Walls from '$components/Walls.svelte';
	import DevTools from '$components/DevTools.svelte';
	import Effect from '$components/Effect.svelte';
	import Effect1 from '$components/Effect1.svelte';
	import Effect2 from '$components/Effect2.svelte';
	// const game = $state(new Game());

	$effect(() => {
		game.start();
	});
</script>

<section>
	<!-- <TowerPlacement /> -->
	<!-- <DevTools {game} /> -->
	<!-- <Effect /> -->
	<GameArea />
</section>

<style>
	section {
		width: 440px;
		height: 780px;
		display: flex;
		background: url('/Base_environment.png');
		background-size: contain;
	}
</style>
