/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import type { Entity } from '$store/Entity.svelte';
import { animations } from '../animations';
import { enemyCollider } from '../collisionHandlers';

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
		width: 88,
		height: 58,
		initialState: 'FollowTarget',

		states: ['FollowTarget', 'Die'],
		stateToAnimation: {
			FollowTarget: animations.BarigaFollow,
			Die: animations.BarigaDie
		},
		stats: {
			scale: 1,
			health: 200,
			speed: 0.06,
			damage: 10
		},
		onCollide: enemyCollider
	}
};
