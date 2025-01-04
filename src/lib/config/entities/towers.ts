import { throneCollider, towerCollider } from '../collisionHandlers';
import {
	earthTowerUpgrades,
	fireTowerUpgrades,
	iceTowerUpgrades,
	windTowerUpgrades
} from '../upgrades';

export const towers = {
	Throne: {
		type: 'throne',
		width: 256,
		height: 212,
		stats: {
			health: 100,
			damage: 999,
			speed: 0
		},
		scale: 0.5,
		states: ['Idle'],
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
		initialState: 'NotBuilt',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
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
			projectileNumber: 1,
			projectileType: 'Fireball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: fireTowerUpgrades
	},

	ThunderTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'NotBuilt',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
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
		upgrades: windTowerUpgrades
	},

	PoisonTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'NotBuilt',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
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
		upgrades: earthTowerUpgrades
	},

	IceTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
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
		upgrades: iceTowerUpgrades
	}
};
