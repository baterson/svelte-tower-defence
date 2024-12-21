import { entityManager } from '$store/EntityManager.svelte';

export const towerUpgrades = [
	(tower) => {
		tower.stats.health += 10;
		tower.stats.speed += 0.1;
		tower.scale += 0.3;
		tower.upgradeLevel = 1;
		tower.effects.push('TowerEffectsElectricLow');
	},
	(tower) => {
		tower.stats.health += 20;
		tower.stats.speed += 0.2;
		tower.scale += 0.3;
		tower.upgradeLevel = 2;
		tower.effects.push('TowerEffectMedium');
	},
	(tower) => {
		tower.stats.health += 30;
		tower.stats.speed += 0.3;
		tower.scale += 0.3;
		tower.upgradeLevel = 3;
		tower.effects.push('TowerEffectRingHigh');
	}
];

export const spendUpgradePoints = (tower) => {
	entityManager.throne.stats.health -= 20;
	entityManager.throne.scale -= 0.2;

	entityManager.spawnLoot('upgradePoint', entityManager.throne, tower);
};

export const upgradeTower = (tower) => {
	const upgrade = towerUpgrades[tower.upgradeLevel];
	if (upgrade) {
		upgrade(tower);
	}
};
