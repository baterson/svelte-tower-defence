<script>
	import { spendUpgradePoints } from '$lib/store/gameActions.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import { onMount } from 'svelte';
	import Entity from './Entity.svelte';
	import { managers } from '$lib/store/managers.svelte';

	let node = $state();
	const { tower, index } = $props();
	const onclick = (e) => {
		e.stopPropagation();
		spendUpgradePoints(tower);
		tower.state.setState('Build');
		managers.get('soundManager').play('lvlUp');
	};

	$effect(() => {
		if (screen.isMobile) {
			tower.scale = 0.7;
		} else {
			tower.scale = 1;
		}
	});

	$effect(() => {
		// Tower positioning
		// Left side: index 0 (top) and 2 (bottom)
		// Right side: index 1 (top) and 3 (bottom)
		const sideMargin = screen.isMobile ? 30 : 100;
		const bottomMargin = screen.isMobile ? 150 : 200;

		const isLeftSide = index === 0 || index === 2;
		const isTopRow = index === 0 || index === 1;

		const width = isLeftSide ? sideMargin : screen.gameAreaWidth - tower.width - sideMargin + 10;

		const height = isTopRow
			? screen.gameAreaHeight - bottomMargin * 2
			: screen.gameAreaHeight - bottomMargin;

		tower.position = new Vector2(width, height);
	});
</script>

<Entity {onclick} bind:node entity={tower} --z-index={10} --pointer-events={'auto'} />
