import type { Entity } from './Entity.svelte';
import { Vector2 } from './Vector2.svelte';
import { managers } from './managers.svelte';

export const spendUpgradePoints = (tower: Entity) => {
	const { entityManager, stageManager } = managers.get(['entityManager', 'stageManager']);

	entityManager.throne.stats.health -= 20;
	// stageManager.spawnEntity('upgradePoint', entityManager.throne.position.clone(), {
	// 	target: tower,
	// 	spawner: entityManager.throne
	// });
	tower.upgrade();
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
