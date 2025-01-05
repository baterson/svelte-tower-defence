import { boundingBoxFromPoint } from '$lib/utils/math';
import type { Entity } from './Entity.svelte';
import { Vector2 } from './Vector2.svelte';
import { managers } from './managers.svelte';

export const spendThroneHealth = (action) => {
	const { entityManager } = managers.get(['entityManager', 'stageManager']);

	let toSpend = 0;

	if (action === 'click') {
		toSpend = 10;
	} else if (action === 'towerBuild') {
		toSpend = 50;
	} else if (action === 'upgrade') {
		toSpend = 30;
	}

	if (entityManager.throne.stats.health >= toSpend) {
		entityManager.throne.stats.health -= toSpend;
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

export const spendThronePower = () => {
	const { entityManager, stageManager } = managers.get(['entityManager', 'stageManager']);

	entityManager.throne.stats.health -= 50;
	entityManager.throne.scale = 3;

	stageManager.spawnEntity(
		'thronePower',
		entityManager.throne.position.add(new Vector2(-400, -100)),
		{
			targetPoint: new Vector2(100, 100),
			spawner: entityManager.throne
		}
	);
	// it's temporary don't do like this
	setTimeout(() => {
		entityManager.throne.cleanEffects();
		entityManager.throne.scale = 1;
	}, 2000);
};
