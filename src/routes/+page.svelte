<script>
	import GameArea from '$lib/components/GameArea.svelte';
	import { game } from '$lib/store/Game.svelte';
	import DevTools from '$components/DevTools.svelte';
	import SynthwaveGrid from '$components/SynthwaveGrid.svelte';
	import ParallaxBackground from '$components/ParallaxBackground.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		game.start();
		game.setBackground(window.innerWidth, window.innerHeight);
	});
</script>

<!-- <div>
    </div> -->
<DevTools />

<ParallaxBackground />

<section>
	<!-- <TowerPlacement /> -->
	<!-- <SynthwaveGrid /> -->

	<GameArea />
</section>

<style>
	section {
		position: relative;
		width: 440px;
		height: 780px;

		/* background: rgb(92, 87, 87); */
		/* background-size: contain; */
		/* background-color: black; */
		overflow: hidden;
	}
</style>
