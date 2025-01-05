import { managers } from '$lib/store/managers.svelte';

export const FireTower = [
	(tower) => {
		tower.stats.damage += 50;
		tower.stats.attackSpeed -= 100;
		tower.stats.attackRange += 50;
		// tower.scale += 0.1;
		tower.stats.projectileNumber += 1;
	},
	(tower) => {
		tower.stats.damage += 50;
		tower.stats.attackSpeed -= 100;
		tower.stats.attackRange += 50;

		tower.width = 93;
		tower.height = 140;
		// tower.scale += 0.1;
		tower.stats.projectileNumber += 1;
	},
	(tower) => {
		tower.width = 122;
		tower.height = 176;

		tower.stats.damage += 50;
		tower.stats.attackSpeed -= 100;
		tower.stats.attackRange += 50;
		// tower.scale += 0.3;
		tower.stats.projectileNumber += 3;
	}
];

export const PoisonTower = [
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.3;
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.2;
		tower.width = 93;
		tower.height = 140;
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.2;
		tower.width = 122;
		tower.height = 176;
	}
];

export const ThunderTower = [
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.3;
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.2;
		tower.width = 93;
		tower.height = 140;
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.2;
		tower.width = 122;
		tower.height = 176;
	}
];

export const IceTower = [
	(tower) => {
		// tower.scale += 0.3;
		managers.get('soundManager').play('lvlUp');
	},
	(tower) => {
		tower.width = 93;
		tower.height = 140;

		tower.stats.projectileNumber += 1;
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 50;
		tower.stats.attackRange += 50;

		managers.get('soundManager').play('lvlUp');
	},
	(tower) => {
		tower.width = 122;
		tower.height = 176;

		tower.stats.projectileNumber += 1;
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 50;
		tower.stats.attackRange += 50;

		// tower.scale = 0.2;
		// tower.stateToAnimation.Guard = 'IceTowerUpgradeTwo';
		// tower.setAnimation(tower.state.currentState.name);
		managers.get('soundManager').play('lvlUp');
	}
];
