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
	effect?: string;
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
		width: 200,
		height: 160,
		spriteSheet: '/boss_test.png',
		initialState: 'Walk',
		states: ['Walk', 'RangeAttack'],
		animations: animations.boss,
		stats: {
			health: 100,
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
		effect: 'effect1',
		type: 'projectile',
		width: 18,
		height: 18,
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
		effect: 'effect2',
		type: 'projectile',
		width: 18,
		height: 18,
		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 1
		},
		onCollide: projectileCollider
	},
	projectile5: {
		effect: 'effect5',
		type: 'projectile',
		width: 18,
		height: 18,
		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 100
		},
		onCollide: projectileCollider
	},
	projectile6: {
		effect: 'effect6',
		type: 'projectile',
		width: 18,
		height: 18,
		initialState: 'Fly',
		states: ['Fly', 'Hit'],
		stats: {
			health: 1,
			speed: 0.5,
			damage: 1
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
		effect: 'effect4',
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
		effect: 'effect2',
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
	}
};

export const getConfig = (name: string): EntityConfig => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);
	return entities[name];
};
