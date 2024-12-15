<script>
	import TowerArea from '$lib/components/TowerArea.svelte';
	import GameArea from '$lib/components/GameArea.svelte';
	import Entity from '$lib/components/Entity.svelte';
	import TowerPlacement from '$components/TowerPlacement.svelte';
	import { game } from '$lib/store/Game.svelte';
	import Walls from '$components/Walls.svelte';
	import DevTools from '$components/DevTools.svelte';
	import SynthwaveGrid from '$components/SynthwaveGrid.svelte';

	$effect(() => {
		game.start();
	});
</script>

<div>
	<DevTools />
</div>
<section>
	<!-- <TowerPlacement /> -->
	<SynthwaveGrid />

	<!-- <Effect /> -->
	<GameArea />
</section>

<style>
	section {
		position: relative;
		width: 440px;
		height: 780px;
		display: flex;
		/* background: rgb(92, 87, 87); */
		background-size: contain;
		background-color: black;
		overflow: hidden;
	}
</style>
