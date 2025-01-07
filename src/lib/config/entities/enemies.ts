/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import type { Entity } from '$lib/store/Entity.svelte';

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
	effects?: string[];
	spriteSheet?: string;
	sprites?: any[];
	upgrades?: string[];
	onCollide?: (entity: Entity, target: Entity) => void;
	stats: Stats;
}

export const enemies: Record<string, EntityConfig> = {
	PurpleBlobEnemy: {
		type: 'enemy',
		width: 88,
		height: 58,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.6,
		stateToAnimation: {
			FollowThrone: 'PurpleBlobEnemyFollow',
			Die: 'PurpleBlobEnemyDie'
		},
		stats: {
			health: 10,
			speed: 0.02,
			damage: 5
		},
		onCollide: enemyCollider
	},
	GreenFlatEnemy: {
		type: 'enemy',
		width: 162,
		height: 230,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 1,
		stateToAnimation: {
			FollowThrone: 'GreenFlatEnemyFollow',
			Die: 'GreenFlatEnemyDie'
		},
		stats: {
			health: 40,
			speed: 0.01,
			damage: 15
		},
		onCollide: enemyCollider
	},
	RedBlobEnemy: {
		type: 'enemy',
		width: 120,
		height: 180,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.8,
		stateToAnimation: {
			FollowThrone: 'RedBlobEnemyFollow',
			Die: 'RedBlobEnemyDie'
		},
		stats: {
			health: 30,
			speed: 0.015,
			damage: 10
		},
		onCollide: enemyCollider
	},
	GreyBlobEnemy: {
		type: 'enemy',
		width: 100,
		height: 160,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 1,
		stateToAnimation: {
			FollowThrone: 'GreyBlobEnemyFollow',
			Die: 'GreyBlobEnemyDie'
		},
		stats: {
			health: 5,
			speed: 0.04,
			damage: 8
		},
		onCollide: enemyCollider
	},
	YellowBlobEnemy: {
		type: 'enemy',
		width: 70,
		height: 62,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.8,
		stateToAnimation: {
			FollowThrone: 'YellowBlobEnemyFollow',
			Die: 'YellowBlobEnemyDie'
		},
		stats: {
			health: 8,
			speed: 0.02,
			damage: 5
		},
		onCollide: enemyCollider
	},
	BlueBlobEnemy: {
		type: 'enemy',
		width: 95,
		height: 75,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.7,
		stateToAnimation: {
			FollowThrone: 'BlueBlobEnemyFollow',
			Die: 'BlueBlobEnemyDie'
		},
		stats: {
			health: 15,
			speed: 0.02,
			damage: 10
		},
		onCollide: enemyCollider
	},
	GreyCircleEnemy: {
		type: 'enemy',
		width: 150,
		height: 160,
		initialState: 'FollowThrone',
		vfx: [],
		scale: 1,
		stateToAnimation: {
			FollowThrone: 'GreyCircleEnemyFollow',
			Die: 'GreyCircleEnemyDie'
		},
		stats: {
			health: 20,
			speed: 0.02,
			damage: 10
		},
		onCollide: enemyCollider
	}
};
