<script>
	import { spendUpgradePoints } from '$store/gameActions.svelte';
	import { screen } from '$store/Screen.svelte';
	import { Vector2 } from '$store/Vector2.svelte';
	import Entity from './Entity.svelte';
	import { managers } from '$store/managers.svelte';

	let node = $state();
	const { tower, index } = $props();
	const onclick = () => {
		tower.state.setState('Guard');
		managers.get('soundManager').play('lvlUp');
		if (tower.isUpgradable) {
			spendUpgradePoints(tower);
		}
	};

	$effect(() => {
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

		// const width = isLeftSide ? 100 : screen.width - 100;
		// const height = isTopRow ? screen.height - 400 : screen.height - 200;

		// tower.position = new Vector2(width, height);
	});
</script>

<Entity {onclick} bind:node entity={tower} --z-index={10} />
