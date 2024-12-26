/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import type { Entity } from '$store/Entity.svelte';
import { sprites } from '../sprites';
import { enemyCollider } from '../collisionHandlers';
import { Vector2 } from '$store/Vector2.svelte';

type Stats = {
	health?: number;
	speed?: number;
	damage?: number;
	attackRange?: number;
	attackSpeed?: number;
	scale?: number;
	projectileNumber?: number;
	projectileType?: string;
};

export interface EntityConfig {
	type: 'enemy' | 'tower' | 'projectile' | 'throne' | 'loot';
	width: number;
	height: number;
	initialState: string;
	states: string[];
	effects?: string[];
	spriteSheet?: string;
	sprites?: any[];
	upgrades?: string[];
	onCollide?: (entity: Entity, target: Entity) => void;
	stats: Stats;
}

export const enemies: Record<string, EntityConfig> = {
	enemy1: {
		type: 'enemy',
		width: 30,
		height: 40,
		initialState: 'FollowTarget',

		states: ['FollowTarget', 'Die'],
		stateToSprite: {
			FollowTarget: {
				spritesheet: sprites.enemy1.spritesheet,
				animation: sprites.enemy1.animations.Follow
			},
			Die: { spritesheet: sprites.enemy1.spritesheet, animation: sprites.enemy1.animations.Die }
		},

		stats: {
			health: 300,
			speed: 0.06,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy2: {
		type: 'enemy',
		width: 30,
		height: 40,
		initialState: 'FollowTarget',
		states: ['FollowTarget', 'Die'],
		stateToSprite: {
			FollowTarget: {
				spritesheet: sprites.enemy2.spritesheet,
				animation: sprites.enemy2.animations.Follow
			},
			Die: {
				spritesheet: sprites.enemy2.spritesheet,
				animation: sprites.enemy2.animations.Die
			}
		},
		stats: {
			health: 1,
			speed: 0.07,
			damage: 10
		},
		onCollide: enemyCollider
	},
	stunner: {
		type: 'enemy',
		width: 30,
		height: 40,
		initialState: 'FollowPoint',
		effects: [],
		states: ['FollowPoint', 'StunAllTowers', 'Die'],
		stateToSprite: {
			FollowPoint: {
				spritesheet: sprites.enemy1.spritesheet,
				animation: sprites.enemy1.animations.Follow
			},
			StunAllTowers: {
				spritesheet: sprites.enemy1.spritesheet,
				animation: sprites.enemy1.animations.StunAllTowers
			},
			Die: { spritesheet: sprites.enemy1.spritesheet, animation: sprites.enemy1.animations.Die }
		},
		context: {
			targetPoint: new Vector2(200, 200)
		},

		stats: {
			health: 9999,
			damage: 2,
			speed: 0.05
		},
		onCollide: enemyCollider
	}
};
