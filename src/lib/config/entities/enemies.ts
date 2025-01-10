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
	// Commons

	PurpleCommon: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.6,
		stateToAnimation: {
			FollowThrone: 'PurpleCommonFollow',
			Die: 'PurpleCommonDie'
		},
		stats: {
			health: 20,
			speed: 0.03,
			damage: 5
		},
		onCollide: enemyCollider
	},
	YellowCommon: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.8,
		stateToAnimation: {
			FollowThrone: 'YellowCommonFollow',
			Die: 'YellowCommonDie'
		},
		stats: {
			health: 15,
			speed: 0.025,
			damage: 4
		},
		onCollide: enemyCollider
	},
	BlueCommon: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.7,
		stateToAnimation: {
			FollowThrone: 'BlueCommonFollow',
			Die: 'BlueCommonDie'
		},
		stats: {
			health: 25,
			speed: 0.02,
			damage: 8
		},
		onCollide: enemyCollider
	},

	// Elites

	GreenCircleElite: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 1,
		stateToAnimation: {
			FollowThrone: 'GreenCircleEliteFollow',
			Die: 'GreenCircleEliteDie'
		},
		stats: {
			health: 80,
			speed: 0.01,
			damage: 15
		},
		onCollide: enemyCollider
	},

	RedBlobElite: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 0.8,
		stateToAnimation: {
			FollowThrone: 'RedBlobEliteFollow',
			Die: 'RedBlobEliteDie'
		},
		stats: {
			health: 30,
			speed: 0.015,
			damage: 10
		},
		onCollide: enemyCollider
	},
	BlueBlobElite: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 1,
		stateToAnimation: {
			FollowThrone: 'BlueBlobEliteFollow',
			Die: 'BlueBlobEliteDie'
		},
		stats: {
			health: 60,
			speed: 0.04,
			damage: 8
		},
		onCollide: enemyCollider
	},
	BlueCircleElite: {
		type: 'enemy',
		initialState: 'FollowThrone',
		vfx: [],
		scale: 1,
		stateToAnimation: {
			FollowThrone: 'BlueCircleEliteFollow',
			Die: 'BlueCircleEliteDie'
		},
		stats: {
			health: 70,
			speed: 0.02,
			damage: 10
		},
		onCollide: enemyCollider
	}
};
