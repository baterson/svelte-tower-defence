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
		width: 10,
		height: 16,
		stats: {
			health: 100,
			damage: 999,
			speed: 0,
			scale: 8
		},
		states: ['Idle'],
		stateToAnimation: {
			Idle: animations.Fireball
		},
		initialState: 'Idle',
		onCollide: throneCollider
	},
	fireTower: {
		type: 'tower',
		width: 10,
		height: 16,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToAnimation: {
			Build: animations.Fireball,
			Guard: animations.Fireball,
			Shoot: animations.Fireball,
			NotBuilt: animations.Fireball
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 1,
			scale: 4,
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
