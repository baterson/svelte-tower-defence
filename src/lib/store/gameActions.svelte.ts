import { boundingBoxFromPoint } from '$lib/utils/math';
import type { Entity } from './Entity.svelte';
import { Vector2 } from './Vector2.svelte';
import { managers } from './managers.svelte';

export let playLowHealthAnimation = $state(false);

export const spendThroneHealth = (action) => {
	const { entityManager, uiManager } = managers.get(['entityManager', 'uiManager']);
	const throne = entityManager.throne;

	let toSpend = 0;

	if (action === 'click') {
		toSpend = 10;
	} else if (action === 'towerBuild') {
		toSpend = 1;
	} else if (action === 'upgrade') {
		toSpend = 1;
	}

	if (throne.stats.health > toSpend) {
		throne.stats.health -= toSpend;
		return true;
	} else {
		uiManager.hightlightThroneHealth();
		return false;
	}
};

export const handleGameClick = (e) => {
	const { entityManager, collisionManager } = managers.get(['entityManager', 'collisionManager']);
	const position = new Vector2(e.offsetX, e.offsetY);
	const boundingBox = boundingBoxFromPoint(position, 20, 20);
	const en = collisionManager.filterEntitiesByBounds(boundingBox);
	spendThroneHealth('click');

	en.forEach((entity) => {
		if (entity.type === 'enemy') {
			entity.state.setState('Die');
		}
	});
};
