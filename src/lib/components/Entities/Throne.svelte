<script>
	import { devTools } from '$store/DevTools.svelte';
	import { spendThronePower } from '$store/gameActions.svelte';
	import { screen } from '$store/Screen.svelte';
	import { handleScreenChange } from '$store/States/effects';
	import Entity from './Entity.svelte';
	import { Vector2 } from '$store/Vector2.svelte';

	const { throne } = $props();

	let node = $state();

	$effect(() => {
		const bottomMargin = screen.isMobile ? 200 : 300;

		const width = Number(screen.gameAreaWidth / 2 - throne.width / 2);
		const height = Number(screen.gameAreaHeight - bottomMargin);

		throne.position = new Vector2(width, height);
	});
</script>

<Entity bind:node onclick={() => spendThronePower()} entity={throne} --z-index={10} />
