/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import type { Entity } from '$store/Entity.svelte';
import { animations } from './animations';
import {
	enemyCollider,
	lootCollider,
	projectileCollider,
	throneCollider,
	towerCollider
} from './collisionHandlers';
import { upgradeTower } from './upgrades';

export interface EntityConfig {
	type: 'enemy' | 'tower' | 'projectile' | 'throne' | 'loot';
	width: number;
	height: number;
	initialState: string;
	states: string[];
	effects?: string[];
	spriteSheet?: string;
	animations?: any[];
	onCollide?: (entity: Entity, target: Entity) => void;
	stats: {
		health?: number;
		speed?: number;
		damage?: number;
		attackRange?: number;
		attackSpeed?: number;
	};
}

const entities: Record<string, EntityConfig> = {
	enemy1: {
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/1st_enemy_run.png',
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy1,
		stats: {
			health: 1,
			speed: 0.06,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy2: {
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/2nd_enemy_run.png',
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy2,
		stats: {
			health: 1,
			speed: 0.07,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy3: {
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/3rd_enemy_run.png',
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy3,
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy4: {
		name: 'enemy4',
		type: 'enemy',
		width: 30,
		height: 64,
		spriteSheet: '/4rd_flying_enemy.png',
		initialState: 'Fly',
		states: ['Fly', 'Shoot', 'Die'],
		animations: animations.enemy4,
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy5: {
		name: 'enemy5',
		type: 'enemy',
		width: 30,
		height: 64,
		spriteSheet: '/5rd_сar_enemy.png',
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy5,
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		onCollide: enemyCollider
	},
	boss: {
		name: 'boss',
		type: 'enemy',
		width: 180,
		height: 160,
		spriteSheet: '/boss_test.png',
		initialState: 'Walk',
		states: ['Walk', 'RangeAttack', 'Charge', 'MeleAttack'],
		animations: animations.boss,
		stats: {
			health: 20,
			speed: 0.09,
			damage: 0.01
		},
		onCollide: enemyCollider
	},
	blueTower: {
		type: 'tower',
		width: 36,
		height: 64,
		spriteSheet: '/blueTower.png',
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		animations: animations.blueTower,
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 0.5,
			damage: 20
		},
		scale: 1.2,
		onCollide: towerCollider,
		onUpgrade: upgradeTower
	},
	moon: {
		type: 'tower',
		width: 48,
		height: 48,
		spriteSheet: '/Moon.sprite.png',
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		animations: animations.moon,
		effects: [],
		stats: {
			health: 10,
			attackRange: Infinity,
			attackSpeed: 0.5,
			damage: 20
		},
		scale: 1.2,
		onCollide: towerCollider,
		onUpgrade: upgradeTower
	},
	projectile1: {
		type: 'projectile',
		width: 18,
		height: 18,
		effects: ['Effect1'],
		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 100
		},
		onCollide: projectileCollider
	},
	projectile2: {
		type: 'projectile',
		width: 18,
		height: 18,
		effects: ['Effect2'],
		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 1
		},
		onCollide: projectileCollider
	},
	projectile3: {
		type: 'projectile',

		width: 24,
		height: 24,
		effects: ['Effect6'],

		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 100
		},
		onCollide: projectileCollider
	},

	projectileStun: {
		type: 'projectile',
		width: 24,
		height: 24,
		effects: ['effect5'],

		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,

			damage: 0.01
		},
		onCollide: projectileCollider
	},

	throne: {
		type: 'throne',
		width: 30,
		height: 40,
		stats: {
			health: 100,
			damage: 999,
			speed: 0,
			range: 40
		},
		scale: 2,
		states: ['Idle'],
		animations: animations.enemy1,
		spriteSheet: '/1st_enemy_run.png',
		initialState: 'Idle',
		onCollide: throneCollider
	},
	loot: {
		type: 'loot',

		effects: ['Effect4'],

		width: 15,
		height: 15,
		initialState: 'Fly',
		states: ['Fly', 'Die'],
		stats: {
			health: 1,
			damage: 0,
			speed: 0.2
		},
		onCollide: lootCollider
	},
	upgradePoint: {
		type: 'loot',

		effects: ['Effect4'],

		width: 15,
		height: 15,
		initialState: 'Fly',
		states: ['Fly', 'Die'],
		stats: {
			health: 1,
			damage: 0,
			speed: 0.9
		},
		onCollide: lootCollider
	},
	stunner: {
		type: 'enemy',
		width: 30,
		height: 40,
		initialState: 'RunToPoint',
		states: ['RunToPoint', 'StunAllTowers'],
		scale: 1.5,
		spriteSheet: '/1st_enemy_run.png',
		animations: animations.enemy1,

		stats: {
			health: 9999,
			damage: 2,
			speed: 0.05
		},
		onCollide: enemyCollider
	}
};

export const getConfig = (name: string): EntityConfig => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);
	return entities[name];
};
