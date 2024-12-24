/**
 * Entity configurations for all game entities
 * @module entityConfig
 */

import type { Entity } from '$store/Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { sprites } from './sprites';
import {
	enemyCollider,
	lootCollider,
	projectileCollider,
	throneCollider,
	towerCollider
} from './collisionHandlers';
import {
	earthTowerUpgrades,
	fireTowerUpgrades,
	iceTowerUpgrades,
	windTowerUpgrades
} from './upgradesConfig';

type Stats = {
	health?: number;
	speed?: number;
	damage?: number;
	attackRange?: number;
	attackSpeed?: number;
	scale?: number;
	projectileNumber?: number;
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

const entities: Record<string, EntityConfig> = {
	enemy1: {
		type: 'enemy',
		width: 30,
		height: 40,
		initialState: 'Run',

		states: ['Run', 'Shoot', 'Die'],
		// sprites: [sprites.enemy1],
		effects: ['EssenseLoot'],

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
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		effects: ['EssenseLoot'],
		// sprites: [sprites.enemy2],
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
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		effects: ['EssenseLoot'],
		// sprites: [sprites.enemy3],
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy4: {
		type: 'enemy',
		width: 30,
		height: 64,
		initialState: 'Fly',
		states: ['Fly', 'Shoot', 'Die'],
		effects: ['EssenseLoot'],
		// sprites: [sprites.enemy4],
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		onCollide: enemyCollider
	},
	enemy5: {
		type: 'enemy',
		width: 30,
		height: 64,
		spriteSheet: '/5rd_сar_enemy.png',
		initialState: 'Run',
		states: ['Run', 'Shoot', 'Die'],
		sprites: [sprites.enemy5],
		stats: {
			health: 10,
			speed: 0.09,
			damage: 10
		},
		onCollide: enemyCollider
	},

	// boss: {
	// 	type: 'enemy',
	// 	width: 180,
	// 	height: 160,
	// 	initialState: 'Walk',
	// 	states: ['Walk', 'RangeAttack', 'Charge', 'MeleAttack'],
	// 	sprites: [sprites.boss],
	// 	stats: {
	// 		health: 20,
	// 		speed: 0.09,
	// 		damage: 0.01
	// 	},
	// 	onCollide: enemyCollider
	// },

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

		width: 12,
		height: 12,
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

		effects: ['Effect5'],

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
			speed: 0
		},
		states: ['Idle'],
		sprites: [sprites.enemy1],
		initialState: 'Idle',
		onCollide: throneCollider
	},
	loot: {
		type: 'loot',

		effects: ['EssenseLoot'],

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

		effects: ['Effect1'],

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
		initialState: 'StunAllTowers',
		// effects: ['ParcticalEffect'],
		states: ['RunToPoint', 'StunAllTowers'],
		sprites: [sprites.enemy1],
		context: {
			targetPoint: new Vector2(200, 200)
		},

		stats: {
			health: 9999,
			damage: 2,
			speed: 0.05
		},
		onCollide: enemyCollider
	},

	thronePower: {
		type: 'projectile',
		width: 600,
		height: 100,
		initialState: 'Fly',
		states: ['Fly', 'Die'],
		effects: ['ThronePowerProjectile'],
		stats: {
			health: 1,
			damage: 999,
			speed: 0.2
		},
		onCollide: projectileCollider
	},

	// TOWERS
	fireTower: {
		type: 'tower',
		width: 48,
		height: 48,
		initialState: 'Guard',
		states: ['Build', 'Guard', 'Shoot', 'NotBuilt'],
		sprites: [sprites.moon],
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 3,
			scale: 1.2
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
		sprites: [sprites.moon],
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2
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
		sprites: [sprites.moon],
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2
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
		sprites: [sprites.moon],
		effects: [],
		stats: {
			health: 50,
			attackRange: Infinity,
			attackSpeed: 1000,
			damage: 20,
			projectileNumber: 1,
			scale: 1.2
		},
		onCollide: towerCollider,
		upgrades: iceTowerUpgrades
	}
};

export const getConfig = (name: string): EntityConfig => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);
	return entities[name];
};
