import { throneCollider, towerCollider } from '../collisionHandlers';
import * as upgrades from '../upgrades';

export const towers = {
	Throne: {
		type: 'throne',
		width: 256,
		height: 252,
		stats: {
			health: 100,
			damage: 999,
			speed: 0
		},
		scale: 0.5,
		stateToAnimation: {
			Idle: 'Base'
		},
		initialState: 'Idle',
		onCollide: throneCollider
	},
	FireTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'Guard',
		stateToAnimation: {
			Build: 'Build',
			Guard: 'FireTower',
			Shoot: 'FireTower',
			NotBuilt: 'NotBuilt'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 3,
			projectileType: 'Fireball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: upgrades.FireTower
	},

	ThunderTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'NotBuilt',
		stateToAnimation: {
			Build: 'Build',
			Guard: 'ThunderTower',
			Shoot: 'ThunderTower',
			NotBuilt: 'NotBuilt'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'Thunderbolt'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: upgrades.ThunderTower
	},

	PoisonTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'NotBuilt',
		stateToAnimation: {
			Build: 'Build',
			Guard: 'PoisonTower',
			Shoot: 'PoisonTower',
			NotBuilt: 'NotBuilt'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'Poisonball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: upgrades.PoisonTower
	},

	IceTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'Guard',
		stateToAnimation: {
			Build: 'Build',
			Guard: 'IceTowerBase',
			Shoot: 'IceTowerBase',
			NotBuilt: 'NotBuilt',
			UpgradeOne: 'IceTowerUpgradeOne',
			UpgradeTwo: 'IceTowerUpgradeTwo'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'Icebolt'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: upgrades.IceTower
	}
};
