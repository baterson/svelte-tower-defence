<script>
	import { spendThroneHealth } from '$lib/store/gameActions.svelte';
	import { screen } from '$lib/store/Screen.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import Entity from './Entity.svelte';
	import { managers } from '$lib/store/managers.svelte';

	let node = $state();
	const { tower, index } = $props();

	const onclick = (e) => {
		e.stopPropagation();
		if (tower.upgradeLevel === 2) {
			return;
		}

		let isSuccess = false;

		if (tower.state.currentState.name === 'NotBuilt') {
			isSuccess = spendThroneHealth('towerBuild');
		} else {
			isSuccess = spendThroneHealth('upgrade');
		}

		console.log('tower.upgradeLevel', tower.upgradeLevel);

		if (isSuccess) {
			tower.state.setState('Upgrade');
			managers.get('soundManager').play('lvlUp');
		}
	};

	$effect(() => {
		if (screen.isMobile) {
			tower.scale = 0.7;
		} else {
			tower.scale = 1;
		}
	});
</script>

<Entity
	{onclick}
	position={tower.staticPosition}
	bind:node
	entity={tower}
	--z-index={10}
	--pointer-events={'auto'}
/>
