/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import { animations } from './animations';

export interface EntityConfig {
	name: string;
	type: 'enemy' | 'tower' | 'projectile';
	width: number;
	height: number;
	spriteSheet: string;
	defaultState: string;
	states: string[];
	sprites: any[]; // Consider creating a proper type for sprites
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
		sprites: animations.enemy1,
		stats: {
			health: 1,
			speed: 0.05,
			damage: 10
		}
	},
	enemy2: {
		name: 'enemy2',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/2nd_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		sprites: animations.enemy2,
		stats: {
			health: 1,
			speed: 0.07,
			damage: 10
		}
	},
	enemy3: {
		name: 'enemy3',
		type: 'enemy',
		width: 30,
		height: 40,
		spriteSheet: '/3rd_enemy_run.png',
		defaultState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		sprites: animations.enemy3,
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		}
	},
	blueTower: {
		name: 'blueTower',
		type: 'tower',
		width: 36,
		height: 64,
		spriteSheet: '/blueTower.png',
		defaultState: 'NotBuilt',
		states: ['Build', 'Idle', 'Shoot', 'NotBuilt'],
		sprites: animations.blueTower,
		stats: {
			health: 200,
			attackRange: 150,
			attackSpeed: 0.5,
			damage: 20
		}
	},
	projectile: {
		name: 'projectile',
		type: 'projectile',
		width: 20,
		height: 20,
		spriteSheet: '/projectile.sprite.png',
		defaultState: 'Fly',
		states: ['Fly', 'Hit'],
		sprites: animations.projectile,
		stats: {
			health: 1,
			speed: 0.5,
			damage: 20
		}
	},
	laser: {
		name: 'laser',
		type: 'projectile',
		width: 20,
		height: 20,
		spriteSheet: '/projectile.sprite.png',
		defaultState: 'Laser',
		states: ['Laser', 'Impact'],
		sprites: animations.laser,
		stats: {
			health: 0,
			speed: 0.5,
			damage: 20
		}
	},
	throne: {
		type: 'throne',
		width: 250,
		height: 200,
		stats: {
			health: 1000,
			damage: 0,
			speed: 0,
			range: 40
		},
		states: ['Idle'],
		sprites: animations.enemy1,
		spriteSheet: '/1st_enemy_run.png',
		defaultState: 'Idle'
	}
};

export const Walls = [
	// Левая стенка
	{
		x: 0,
		y: 0,
		width: 50, // Ширина невидимой стены
		height: 400 // Высота игровой области
	},
	// Правая стенка
	{
		x: 350,
		y: 0,
		width: 50,
		height: 400
	}
];

export const getConfig = (name: string): EntityConfig => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);
	return entities[name];
};
