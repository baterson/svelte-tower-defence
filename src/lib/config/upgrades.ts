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
		// tower.scale += 0.1;
		tower.stats.projectileNumber += 1;
	},
	(tower) => {
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
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.2;
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
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.2;
	}
];

export const IceTower = [
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale += 0.3;
		managers.get('soundManager').play('lvlUp');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;

		tower.stateToAnimation.Guard = 'IceTowerUpgradeOne';
		tower.setAnimation(tower.state.currentState.name);

		managers.get('soundManager').play('lvlUp');
	},
	(tower) => {
		tower.stats.damage += 10;
		tower.stats.attackSpeed -= 220;
		tower.stats.attackRange += 50;
		// tower.scale = 0.2;
		tower.stateToAnimation.Guard = 'IceTowerUpgradeTwo';
		tower.setAnimation(tower.state.currentState.name);
		managers.get('soundManager').play('lvlUp');
	}
];
