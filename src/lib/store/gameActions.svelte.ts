import type { Entity } from './Entity.svelte';
import { entityManager } from './entityManager.svelte';
import { stageManager } from './StageManager.svelte';
import { Vector2 } from './Vector2.svelte';

export const spendUpgradePoints = (tower: Entity) => {
	entityManager.throne.stats.health -= 20;

	stageManager.spawnEntity('upgradePoint', entityManager.throne.position.clone(), {
		target: tower,
		spawner: entityManager.throne
	});

	tower.upgrade();
};

export const spendThronePower = () => {
	entityManager.throne.stats.health -= 50;
	entityManager.throne.stats.scale = 3;

	entityManager.throne.addEffect('TowerEffectRingHigh');

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
		entityManager.throne.stats.scale = 1;
	}, 2000);
};
