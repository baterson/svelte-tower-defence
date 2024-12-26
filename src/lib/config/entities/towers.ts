import { throneCollider, towerCollider } from '../collisionHandlers';
import { sprites } from '../sprites';
import {
	earthTowerUpgrades,
	fireTowerUpgrades,
	iceTowerUpgrades,
	windTowerUpgrades
} from '../upgrades';

export const towers = {
	throne: {
		type: 'throne',
		width: 30,
		height: 40,
		stats: {
			health: 100,
			damage: 999,
			speed: 0,
			scale: 2
		},
		states: ['Idle'],
		stateToSprite: {
			Idle: { spritesheet: sprites.moon.spritesheet, animation: sprites.moon.animations.Guard }
		},
		initialState: 'Idle',
		onCollide: throneCollider
	},
	fireTower: {
		type: 'tower',
		width: 48,
		height: 48,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		stateToSprite: {
			Guard: { spritesheet: sprites.moon.spritesheet, animation: sprites.moon.animations.Guard }
		},
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 500,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2,
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
		stateToSprite: {
			Guard: { spritesheet: sprites.moon.spritesheet, animation: sprites.moon.animations.Guard }
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
		stateToSprite: {
			Guard: { spritesheet: sprites.moon.spritesheet, animation: sprites.moon.animations.Guard }
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
		stateToSprite: {
			Guard: { spritesheet: sprites.moon.spritesheet, animation: sprites.moon.animations.Guard }
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
