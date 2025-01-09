import { managers } from './managers.svelte';
import type { Entity } from './Entity.svelte';
import { screen } from '$lib/store/Screen.svelte';
import { checkRectCollision, type Rect2D } from '$lib/utils/math';

export class CollisionManager {
	update() {
		const entityManager = managers.get('entityManager');

		this.handleEnemyCollisions(
			entityManager.livingEnemies,
			entityManager.livingProjectiles,
			entityManager.throne
		);

		this.handleProjectileCollisions(entityManager.livingProjectiles);

		this.handleLootCollisions(entityManager.livingLoot, entityManager.throne);
	}

	handleEnemyCollisions(enemies: Entity[], projectiles: Entity[], throne: Entity): void {
		for (const enemy of enemies) {
			for (const projectile of projectiles) {
				if (this.checkCollision(projectile, enemy)) {
					projectile.onCollide(enemy);
					enemy.onCollide(projectile);
				}
			}

			if (this.checkCollision(enemy, throne)) {
				enemy.onCollide(throne);
				throne.onCollide(enemy);
			}
		}
	}

	handleProjectileCollisions(projectiles: Entity[]): void {
		for (const projectile of projectiles) {
			if (!this.checkScreenBounds(projectile)) {
				projectile.onCollide('OUT_OF_BOUNDS');
				continue;
			}
		}
	}

	handleLootCollisions(lootEntities, throne): void {
		lootEntities.forEach((loot) => {
			if (this.checkCollision(loot, throne)) {
				loot.onCollide(throne);
				throne.onCollide(loot);
			}
		});
	}

	checkCollision(entity1: Entity, entity2: Entity): boolean {
		return checkRectCollision(entity1.boundingBox, entity2.boundingBox);

		// if (entity1.rotation === 0 && entity2.rotation === 0) {
		// 	return checkRectCollision(entity1.boundingBox, entity2.boundingBox);
		// }

		// return checkRotatedRectIntersection(
		// 	entity1.boundingBox,
		// 	entity1.rotation,
		// 	entity2.boundingBox,
		// 	entity2.rotation
		// );
	}

	filterEnemiesByBounds = (bounds) => {
		const entityManager = managers.get('entityManager');

		return entityManager.livingEnemies.filter((entity) =>
			checkRectCollision(entity.boundingBox, bounds)
		);
	};

	checkBounds(entity: Entity, boundsRect: Rect2D): boolean {
		return checkRectCollision(entity.boundingBox, boundsRect);
	}

	checkScreenBounds(entity: Entity): boolean {
		return checkRectCollision(entity.boundingBox, screen.screenBounds);
	}

	checkGameBounds(entity: Entity): boolean {
		return checkRectCollision(entity.boundingBox, screen.gameBoundingBox);
	}
}
