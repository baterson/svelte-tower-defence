/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import type { Entity } from '$store/Entity.svelte';
import { animations } from './animations';
import { enemyCollider, projectileCollider, throneCollider, towerCollider } from './colliders';

export interface EntityConfig {
	name: string;
	type: 'enemy' | 'tower' | 'projectile' | 'throne';
	width: number;
	height: number;
	spriteSheet: string;
	defaultState: string;
	states: string[];
	animations: any[];
	collider?: (entity: Entity, target: Entity) => void;
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
		name: 'enemy1',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/1st_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy1,
		stats: {
			health: 1,
			speed: 0.05,
			damage: 10
		},
		collider: enemyCollider
	},
	enemy2: {
		name: 'enemy2',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/2nd_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy2,
		stats: {
			health: 1,
			speed: 0.07,
			damage: 10
		},
		collider: enemyCollider
	},
	enemy3: {
		name: 'enemy3',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/3rd_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		animations: animations.enemy3,
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		collider: enemyCollider
	},
	blueTower: {
		name: 'blueTower',
		type: 'tower',
		width: 36,
		height: 64,
		spriteSheet: '/blueTower.png',
		defaultState: 'NotBuilt',
		states: ['Build', 'Idle', 'Shoot', 'NotBuilt'],
		animations: animations.blueTower,
		stats: {
			health: 200,
			attackRange: 150,
			attackSpeed: 0.5,
			damage: 20
		},
		collider: towerCollider
	},
	projectile: {
		name: 'projectile',
		type: 'projectile',
		width: 20,
		height: 20,
		spriteSheet: '/projectile.sprite.png',
		defaultState: 'Fly',
		states: ['Fly', 'Hit'],
		animations: animations.projectile,
		stats: {
			health: 1,
			speed: 0.5,
			damage: 20
		},
		collider: projectileCollider
	},
	laser: {
		name: 'laser',
		type: 'projectile',
		width: 20,
		height: 20,
		spriteSheet: '/projectile.sprite.png',
		defaultState: 'Laser',
		states: ['Laser', 'Impact'],
		animations: animations.laser,
		stats: {
			health: 0,
			speed: 0.5,
			damage: 20
		},
		collider: projectileCollider
	},
	throne: {
		type: 'throne',
		width: 250,
		height: 50,
		stats: {
			health: 1000,
			damage: 0,
			speed: 0,
			range: 40
		},
		states: ['Idle'],
		animations: animations.enemy1,
		spriteSheet: '/1st_enemy_run.png',
		defaultState: 'Idle',
		collider: throneCollider
	}
};

export type Wall = {
	type: 'wall';
	x: number;
	y: number;
	width: number;
	height: number;
};

const wall = (x: number, y: number, width: number, height: number): Wall => ({
	type: 'wall',
	x,
	y,
	width,
	height
});

export const Walls = [
	wall(0, 100, 80, 80),
	wall(373, 100, 80, 80),
	wall(0, 170, 93, 600),
	wall(363, 170, 93, 600),
	wall(95, 685, 280, 100)
];

export const getConfig = (name: string): EntityConfig => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);
	return entities[name];
};
