import { animations } from '../animations';
import { throneCollider, towerCollider } from '../collisionHandlers';
import {
	earthTowerUpgrades,
	fireTowerUpgrades,
	iceTowerUpgrades,
	windTowerUpgrades
} from '../upgrades';

export const towers = {
	throne: {
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
			Idle: animations.Base
		},
		initialState: 'Idle',
		onCollide: throneCollider
	},
	fireTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.FireTower,
			Guard: animations.FireTower,
			Shoot: animations.FireTower,
			NotBuilt: animations.TowerBase
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'fireball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: fireTowerUpgrades
	},

	windTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'NotBuilt',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.WindTower,
			Guard: animations.WindTower,
			Shoot: animations.WindTower,
			NotBuilt: animations.TowerBase
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'windball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: windTowerUpgrades
	},

	poisonTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'NotBuilt',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.PoisonTower,
			Guard: animations.PoisonTower,
			Shoot: animations.PoisonTower,
			NotBuilt: animations.TowerBase
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'poisonball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: earthTowerUpgrades
	},

	iceTower: {
		type: 'tower',
		width: 68,
		height: 107,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.IceTower,
			Guard: animations.IceTower,
			Shoot: animations.IceTower,
			NotBuilt: animations.TowerBase
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			projectileType: 'iceball'
		},
		scale: 1,
		onCollide: towerCollider,
		upgrades: iceTowerUpgrades
	}
};
