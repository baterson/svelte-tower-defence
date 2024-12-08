/**
 * Collision Manager
 * Handles collision detection and resolution between game entities
 * @module CollisionManager
 */
import type { Entity } from './Entity.svelte';
import { isInRadius } from '$utils/math';

/**
 * Represents a 2D rectangle for collision detection
 */
export interface Rect2D {
	x: number;
	y: number;
	width: number;
	height: number;
}

/**
 * Represents a pair of colliding entities
 */
export type CollisionPair = {
	entity1: Entity;
	entity2: Entity;
};

/**
 * Available collision layers
 */
export enum CollisionLayer {
	ENEMY = 'enemy',
	TOWER = 'tower',
	PROJECTILE = 'projectile',
	THRONE = 'throne',
	WALL = 'wall'
}

/**
 * Collision matrix defining which layers can collide with each other
 */
export type CollisionMatrix = {
	[key in CollisionLayer]: CollisionLayer[];
};

export class CollisionManager {
	/**
	 * Matrix defining which entity types can collide with each other
	 */
	private collisionMatrix: CollisionMatrix = {
		[CollisionLayer.ENEMY]: [CollisionLayer.THRONE, CollisionLayer.PROJECTILE, CollisionLayer.WALL],
		[CollisionLayer.TOWER]: [], // Towers don't collide with anything
		[CollisionLayer.PROJECTILE]: [CollisionLayer.ENEMY],
		[CollisionLayer.THRONE]: [CollisionLayer.ENEMY],
		[CollisionLayer.WALL]: [CollisionLayer.ENEMY]
	};

	// Grid size for spatial partitioning
	private readonly CELL_SIZE = 50;

	/**
	 * Get bounding box for an entity
	 * @example
	 * const box = collisionManager.getBoundingBox(enemy);
	 * // Use box for collision checks
	 */
	getBoundingBox(entity: Entity): Rect2D {
		return {
			x: entity.position.x - entity.width / 2,
			y: entity.position.y - entity.height / 2,
			width: entity.width,
			height: entity.height
		};
	}

	/**
	 * Check collision between two entities
	 * @example
	 * if (collisionManager.checkCollision(projectile, enemy)) {
	 *   // Handle collision
	 * }
	 */
	checkCollision(entity1: Entity, entity2: Entity): boolean {
		// Use radius check for projectiles
		if (entity1.type === 'projectile' || entity2.type === 'projectile') {
			return isInRadius(entity1.position, entity2.position, 10);
		}

		// Rectangle collision check for other entities
		const rect1 = this.getBoundingBox(entity1);
		const rect2 = this.getBoundingBox(entity2);

		return (
			rect1.x < rect2.x + rect2.width &&
			rect1.x + rect1.width > rect2.x &&
			rect1.y < rect2.y + rect2.height &&
			rect1.y + rect1.height > rect2.y
		);
	}

	/**
	 * Detect all collisions between entities using spatial partitioning
	 * @example
	 * const collisions = collisionManager.detectCollisions(entities);
	 * collisionManager.resolveCollisions(collisions);
	 */
	detectCollisions(entities: Entity[]): CollisionPair[] {
		const collisions: CollisionPair[] = [];
		const spatialGrid = this.createSpatialGrid(entities);

		entities.forEach((entity1, i) => {
			const allowedCollisions = this.collisionMatrix[entity1.type as CollisionLayer];
			if (!allowedCollisions) return;

			// Get potential collisions from spatial grid
			const potentialCollisions = this.getPotentialCollisions(entity1, spatialGrid);

			potentialCollisions.forEach((entity2) => {
				// Skip self-collision and already checked pairs
				if (entity1 === entity2 || entity2.id < entity1.id) return;

				// Check if collision is allowed between these types
				if (!allowedCollisions.includes(entity2.type as CollisionLayer)) return;

				// Check actual collision
				if (this.checkCollision(entity1, entity2)) {
					collisions.push({ entity1, entity2 });
				}
			});
		});

		return collisions;
	}

	/**
	 * Resolve detected collisions
	 * @example
	 * const collisions = collisionManager.detectCollisions(entities);
	 * collisionManager.resolveCollisions(collisions);
	 */
	resolveCollisions(collisions: CollisionPair[]) {
		collisions.forEach(({ entity1, entity2 }) => {
			entity1.resolveCollision(entity2);
			entity2.resolveCollision(entity1);
		});
	}

	/**
	 * Create spatial grid for broad-phase collision detection
	 * @private
	 */
	private createSpatialGrid(entities: Entity[]): Map<string, Set<Entity>> {
		const grid = new Map<string, Set<Entity>>();

		entities.forEach((entity) => {
			const box = this.getBoundingBox(entity);
			const minX = Math.floor(box.x / this.CELL_SIZE);
			const maxX = Math.floor((box.x + box.width) / this.CELL_SIZE);
			const minY = Math.floor(box.y / this.CELL_SIZE);
			const maxY = Math.floor((box.y + box.height) / this.CELL_SIZE);

			for (let x = minX; x <= maxX; x++) {
				for (let y = minY; y <= maxY; y++) {
					const key = `${x},${y}`;
					if (!grid.has(key)) {
						grid.set(key, new Set());
					}
					grid.get(key)!.add(entity);
				}
			}
		});

		return grid;
	}

	/**
	 * Get potential collisions from spatial grid
	 * @private
	 */
	private getPotentialCollisions(entity: Entity, grid: Map<string, Set<Entity>>): Set<Entity> {
		const box = this.getBoundingBox(entity);
		const minX = Math.floor(box.x / this.CELL_SIZE);
		const maxX = Math.floor((box.x + box.width) / this.CELL_SIZE);
		const minY = Math.floor(box.y / this.CELL_SIZE);
		const maxY = Math.floor((box.y + box.height) / this.CELL_SIZE);

		const potentialCollisions = new Set<Entity>();

		for (let x = minX; x <= maxX; x++) {
			for (let y = minY; y <= maxY; y++) {
				const key = `${x},${y}`;
				const cellEntities = grid.get(key);
				if (cellEntities) {
					cellEntities.forEach((other) => {
						if (other !== entity) {
							potentialCollisions.add(other);
						}
					});
				}
			}
		}

		return potentialCollisions;
	}

	/**
	 * Check if entity types can collide according to collision matrix
	 * @example
	 * if (collisionManager.canCollide('enemy', 'projectile')) {
	 *   // Check for actual collision
	 * }
	 */
	canCollide(type1: CollisionLayer, type2: CollisionLayer): boolean {
		const allowedCollisions = this.collisionMatrix[type1];
		return allowedCollisions ? allowedCollisions.includes(type2) : false;
	}

	/**
	 * Update collision matrix
	 * @example
	 * collisionManager.updateCollisionMatrix(CollisionLayer.ENEMY, [CollisionLayer.WALL]);
	 */
	updateCollisionMatrix(layer: CollisionLayer, collidesWith: CollisionLayer[]) {
		this.collisionMatrix[layer] = collidesWith;
	}
}
