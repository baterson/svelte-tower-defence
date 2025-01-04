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
		height: 252,
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
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: 'FireTower',
			Guard: 'FireTower',
			Shoot: 'FireTower',
			NotBuilt: 'FireTower'
		},
		effects: [],
		stats: {
			health: 50,
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
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: 'ThunderTower',
			Guard: 'ThunderTower',
			Shoot: 'ThunderTower',
			NotBuilt: 'ThunderTower'
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 2000,
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
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: 'PoisonTower',
			Guard: 'PoisonTower',
			Shoot: 'PoisonTower',
			NotBuilt: 'PoisonTower'
		},
		effects: [],
		stats: {
			health: 50,
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
			Build: 'IceTower',
			Guard: 'IceTower',
			Shoot: 'IceTower',
			NotBuilt: 'IceTower'
		},
		effects: [],
		stats: {
			health: 50,
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
