<script>
	import { devTools } from '$lib/store/DevTools.svelte';
	import { spendThronePower } from '$lib/store/gameActions.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import { handleScreenChange } from '$lib/store/States/effects';
	import Entity from './Entity.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';

	const { throne } = $props();

	let node = $state();

	$effect(() => {
		if (screen.isMobile) {
			throne.scale = 0.3;
		} else {
			throne.scale = 0.5;
		}
	});

	$effect(() => {
		const bottomMargin = screen.isMobile ? 250 : 300;

		const width = Number(screen.gameAreaWidth / 2 - throne.width / 2);
		const height = Number(screen.gameAreaHeight - bottomMargin);

		throne.position = new Vector2(width, height);
	});
</script>

<Entity bind:node onclick={() => spendThronePower()} entity={throne} --z-index={10} />
