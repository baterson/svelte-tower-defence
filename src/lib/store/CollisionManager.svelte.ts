import type { Entity } from './Entity.svelte';
import { checkCircleCollision, checkRectCollision } from '$utils/math';
import { Walls } from '$lib/config/entitiyConfig';
import type { Wall } from '$lib/config/entitiyConfig';
import type { Rect2D } from '$utils/math';

export type CollisionPair = {
	entity1: Entity;
	entity2: Entity | Wall;
};

export enum CollisionLayer {
	ENEMY = 'enemy',
	TOWER = 'tower',
	PROJECTILE = 'projectile',
	THRONE = 'throne',
	WALL = 'wall'
}

export type CollisionMatrix = {
	[key in CollisionLayer]: CollisionLayer[];
};

// DO NOT COLLIDE DEAD ENTITIES

export class CollisionManager {
	private collisionMatrix: CollisionMatrix = {
		[CollisionLayer.ENEMY]: [CollisionLayer.THRONE, CollisionLayer.PROJECTILE, CollisionLayer.WALL],
		[CollisionLayer.TOWER]: [],
		[CollisionLayer.PROJECTILE]: [CollisionLayer.ENEMY],
		[CollisionLayer.THRONE]: [CollisionLayer.ENEMY],
		[CollisionLayer.WALL]: [CollisionLayer.ENEMY]
	};

	getBoundingBox(entity: Entity): Rect2D {
		return {
			x: entity.position.x - entity.width / 2,
			y: entity.position.y - entity.height / 2,
			width: entity.width,
			height: entity.height
		};
	}

	private checkProjectileCollision(entity1: Entity, entity2: Entity): boolean {
		return checkCircleCollision(entity1.position, entity2.position, 10);
	}

	private checkRectangleCollision(entity1: Entity, entity2: Entity | Wall): boolean {
		const bounds1 = this.getBoundingBox(entity1);
		const bounds2 =
			'type' in entity2 && entity2.type !== 'wall' ? this.getBoundingBox(entity2) : entity2;
		return checkRectCollision(bounds1, bounds2);
	}

	private checkCollision(entity1: Entity, entity2: Entity | Wall): boolean {
		if (entity1.type === 'projectile' || ('type' in entity2 && entity2.type === 'projectile')) {
			return this.checkProjectileCollision(
				entity1.type === 'projectile' ? entity1 : (entity2 as Entity),
				entity1.type === 'projectile' ? (entity2 as Entity) : entity1
			);
		}
		return this.checkRectangleCollision(entity1, entity2);
	}

	detectEntityCollisions(entities: Entity[]): CollisionPair[] {
		const collisions: CollisionPair[] = [];

		for (let i = 0; i < entities.length; i++) {
			const entity1 = entities[i];
			const allowedCollisions = this.collisionMatrix[entity1.type as CollisionLayer];
			if (!allowedCollisions) continue;

			for (let j = i + 1; j < entities.length; j++) {
				const entity2 = entities[j];
				if (!allowedCollisions.includes(entity2.type as CollisionLayer)) continue;

				if (this.checkCollision(entity1, entity2)) {
					collisions.push({ entity1, entity2 });
				}
			}
		}

		return collisions;
	}

	detectWallCollisions(entities: Entity[]): CollisionPair[] {
		const collisions: CollisionPair[] = [];
		for (const entity of entities) {
			for (const wall of Walls) {
				if (this.checkCollision(entity, wall)) {
					collisions.push({ entity1: entity, entity2: wall });
					break;
				}
			}
		}
		return collisions;
	}

	resolveWallCollisions(entities: Entity[]) {
		const wallCollisions = this.detectWallCollisions(entities);
		wallCollisions.forEach(({ entity1, entity2 }) => {
			entity1.resolveCollision(entity2);
		});
	}

	resolveEntityCollisions(entities: Entity[]) {
		const entityCollisions = this.detectEntityCollisions(entities);
		entityCollisions.forEach(({ entity1, entity2 }) => {
			entity1.resolveCollision(entity2);
			entity2.resolveCollision(entity1);
		});
	}
}
