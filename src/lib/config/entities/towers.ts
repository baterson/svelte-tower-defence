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
		width: 64,
		height: 100,
		stats: {
			health: 100,
			damage: 999,
			speed: 0,
			scale: 1.5
		},
		states: ['Idle'],
		stateToAnimation: {
			Idle: animations.TowerIdle
		},
		initialState: 'Idle',
		onCollide: throneCollider
	},
	fireTower: {
		type: 'tower',
		width: 60,
		height: 96,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.TowerBuild,
			Guard: animations.TowerIdle,
			Shoot: animations.TowerShoot,
			NotBuilt: animations.TowerBase
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 1,
			scale: 1,
			projectileType: 'fireball'
		},
		onCollide: towerCollider,
		upgrades: fireTowerUpgrades
	},

	windTower: {
		type: 'tower',
		width: 48,
		height: 48,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.Boba,
			Guard: animations.Boba,
			Shoot: animations.Boba,
			NotBuilt: animations.Boba
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2,
			projectileType: 'projectile4'
		},
		onCollide: towerCollider,
		upgrades: windTowerUpgrades
	},

	earthTower: {
		type: 'tower',
		width: 48,
		height: 48,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.Boba,
			Guard: animations.Boba,
			Shoot: animations.Boba,
			NotBuilt: animations.Boba
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2,
			projectileType: 'projectile3'
		},
		onCollide: towerCollider,
		upgrades: earthTowerUpgrades
	},

	iceTower: {
		type: 'tower',
		width: 48,
		height: 48,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.Boba,
			Guard: animations.Boba,
			Shoot: animations.Boba,
			NotBuilt: animations.Boba
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 800,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2,
			projectileType: 'projectile2'
		},
		onCollide: towerCollider,
		upgrades: iceTowerUpgrades
	}
};
