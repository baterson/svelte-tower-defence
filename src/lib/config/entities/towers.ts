import { throneCollider } from '../collisionHandlers';
import * as upgrades from '../upgrades';

export const towers = {
	Throne: {
		type: 'throne',
		width: 256,
		height: 252,
		stats: {
			health: 500,
			damage: 999,
			speed: 0
		},
		scale: 0.5,
		stateToAnimation: {
			Idle: 'Throne'
		},
		initialState: 'Idle',
		onCollide: throneCollider
	},
	FireTower: {
		type: 'tower',
		width: 68,
		height: 72,
		initialState: 'NotBuilt',
		stateToAnimation: {
			Guard: 'FireTowerBase0',
			Shoot: 'FireTowerBase0',
			NotBuilt: 'TowerBase',
			Upgrade: 'FireTowerUpgrade0'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: 650,
			attackSpeed: 500,
			damage: 15,
			projectileNumber: 1,
			projectileType: 'Fireball'
		},
		scale: 0.5,
		upgrades: upgrades.FireTower
	},

	ThunderTower: {
		type: 'tower',
		width: 68,
		height: 72,
		initialState: 'NotBuilt',
		stateToAnimation: {
			Guard: 'ThunderTowerBase0',
			Shoot: 'ThunderTowerBase0',
			NotBuilt: 'TowerBase',
			Upgrade: 'ThunderTowerUpgrade0'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: 700,
			attackSpeed: 950,
			damage: 15,
			projectileNumber: 1,
			projectileType: 'Thunderbolt'
		},
		scale: 1,
		upgrades: upgrades.ThunderTower
	},

	PoisonTower: {
		type: 'tower',
		width: 68,
		height: 72,
		initialState: 'NotBuilt',
		stateToAnimation: {
			Guard: 'PoisonTowerBase0',
			Shoot: 'PoisonTowerBase0',
			NotBuilt: 'TowerBase',
			Upgrade: 'PoisonTowerUpgrade0'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: 650,
			attackSpeed: 750,
			damage: 15,
			projectileNumber: 1,
			projectileType: 'Poisonball'
		},
		scale: 1,
		upgrades: upgrades.PoisonTower
	},

	IceTower: {
		type: 'tower',
		width: 68,
		height: 72,
		initialState: 'NotBuilt',
		stateToAnimation: {
			Guard: 'IceTowerBase0',
			Shoot: 'IceTowerBase0',
			NotBuilt: 'TowerBase',
			Upgrade: 'IceTowerUpgrade0'
		},
		effects: [],
		stats: {
			health: 1000,
			attackRange: 650,
			attackSpeed: 850,
			damage: 15,
			projectileNumber: 1,
			projectileType: 'Icebolt'
		},
		scale: 1,
		upgrades: upgrades.IceTower
	}
};
