<script>
	import GameArea from '$lib/components/GameArea.svelte';
	import { game } from '$lib/store/Game.svelte';
	import DevTools from '$components/DevTools.svelte';

	$effect(() => {
		game.start();
	});
</script>

<section>
	<DevTools />

	<GameArea />
</section>

<style>
	section {
		width: 440px;
		height: 780px;
		display: flex;
		background: rgb(92, 87, 87);
		background-size: contain;
	}
</style>
