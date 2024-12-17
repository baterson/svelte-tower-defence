import { entityManager } from '$store/EntityManager.svelte';

export const towerUpgrades = [
	(tower) => {
		tower.stats.health += 10;
		tower.stats.speed += 0.1;
		tower.scale += 0.3;
		tower.upgradeLevel = 1;
	},
	(tower) => {
		tower.stats.health += 20;
		tower.stats.speed += 0.2;
		tower.scale += 0.3;
		tower.upgradeLevel = 2;
	},
	(tower) => {
		tower.stats.health += 30;
		tower.stats.speed += 0.3;
		tower.scale += 0.3;
		tower.upgradeLevel = 3;
	}
];

export const spendUpgradePoints = (tower) => {
	const throne = entityManager.throne;

	throne.stats.health -= 20;
	throne.scale -= 0.2;

	entityManager.spawnLoot('upgradePoint', throne, tower);
};

export const upgradeTower = (tower, level) => {
	const upgrade = towerUpgrades[level];

	if (upgrade) {
		upgrade(tower);
		spendUpgradePoints(tower);
	}
};
