export const fireTowerUpgrades = [
	(tower) => {
		tower.stats.damage += 50;
		tower.stats.attackSpeed -= 100;
		tower.stats.attackRange += 50;
		tower.stats.scale += 0.1;
		tower.stats.projectileNumber += 1;
		tower.addEffect('TowerEffectMedium');
	},
	(tower) => {
		tower.stats.damage += 50;
		tower.stats.attackSpeed -= 100;
		tower.stats.attackRange += 50;
		tower.stats.scale += 0.1;
		tower.stats.projectileNumber += 1;
		tower.addEffect('TowerEffectsElectricLow');
	},
	(tower) => {
		tower.stats.damage += 50;
		tower.stats.attackSpeed -= 100;
		tower.stats.attackRange += 50;
		tower.stats.scale += 0.3;
		tower.stats.projectileNumber += 3;
		tower.addEffect('TowerEffectRingHigh');
	}
];

export const windTowerUpgrades = [
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.3;
		tower.addEffect('ToxicCloud');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.2;
		tower.addEffect('ParcticalEffect');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.2;
		tower.addEffect('BlinkingStar');
	}
];

export const earthTowerUpgrades = [
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.3;
		tower.addEffect('ToxicCloud');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.2;
		tower.addEffect('ParcticalEffect');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.2;
		tower.addEffect('BlinkingStar');
	}
];

export const iceTowerUpgrades = [
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.3;
		tower.addEffect('ToxicCloud');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.2;
		tower.addEffect('ParcticalEffect');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		tower.scale += 0.2;
		tower.addEffect('BlinkingStar');
	}
];
