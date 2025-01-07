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
			Idle: 'Base'
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
			Guard: 'FireTowerBase',
			Shoot: 'FireTowerBase',
			NotBuilt: 'NotBuilt',
			Upgrade: 'FireTowerUpgrade'
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
			Guard: 'ThunderTowerBase',
			Shoot: 'ThunderTowerBase',
			NotBuilt: 'NotBuilt',
			Upgrade: 'ThunderTowerUpgrade'
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
			Guard: 'PoisonTowerBase',
			Shoot: 'PoisonTowerBase',
			NotBuilt: 'NotBuilt',
			Upgrade: 'PoisonTowerUpgrade'
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
			Guard: 'IceTowerBase',
			Shoot: 'IceTowerBase',
			NotBuilt: 'NotBuilt',
			Upgrade: 'IceTowerUpgrade'
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
