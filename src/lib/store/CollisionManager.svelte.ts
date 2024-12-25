import { managers } from './managers.svelte';
import type { Entity } from './Entity.svelte';
import { screen } from '$lib/store/Screen.svelte';
import { checkRectCollision } from '$utils/math';

export class CollisionManager {
	update() {
		const entityManager = managers.get('entityManager');
		// Handle tower projectiles vs nearest enemies
		this.handleProjectileCollisions(
			[...entityManager.filterByOwnerType('tower'), ...entityManager.filterByOwnerType('throne')],
			entityManager.livingEnemies
		);

		// Handle enemy projectiles vs towers and throne
		this.handleProjectileCollisions(entityManager.filterByOwnerType('enemy'), [
			...entityManager.livingTowers,
			entityManager.livingThrone
		]);

		// Handle enemy collisions
		this.handleEnemyCollisions();
		this.handleLootCollisions();
	}

	handleProjectileCollisions(projectiles: Entity[], targets: Entity[]): void {
		for (const projectile of projectiles) {
			// Check if outside screen first
			if (!this.checkScreenBounds(projectile)) {
				projectile.onCollide('OUT_OF_BOUNDS');
				continue;
			}

			// Check collision against all targets instead of just the nearest one
			for (const target of targets) {
				if (this.checkCollision(projectile, target)) {
					projectile.onCollide(target);
					target.onCollide(projectile);
				}
			}
		}
	}

	private handleEnemyCollisions(): void {
		const entityManager = managers.get('entityManager');
		const targets = [...entityManager.livingTowers, entityManager.livingThrone].filter(Boolean);

		for (const enemy of entityManager.livingEnemies) {
			const nearestTarget = entityManager.findNearestEntity(enemy, targets);
			if (!nearestTarget) continue;

			if (this.checkCollision(enemy, nearestTarget)) {
				enemy.onCollide(nearestTarget);
				nearestTarget.onCollide(enemy);
			}
		}
	}

	handleLootCollisions(): void {
		const entityManager = managers.get('entityManager');
		const throne = entityManager.livingThrone;

		for (const loot of entityManager.livingLoot) {
			if (this.checkCollision(loot, throne)) {
				loot.onCollide(throne);
				throne.onCollide(loot);
			}

			for (const tower of entityManager.livingTowers) {
				if (this.checkCollision(loot, tower)) {
					loot.onCollide(tower);
					tower.onCollide(loot);
				}
			}
		}
	}

	checkCollision(entity1: Entity, entity2: Entity): boolean {
		return checkRectCollision(entity1.boundingBox, entity2.boundingBox);
	}

	checkScreenBounds(entity: Entity): boolean {
		return checkRectCollision(entity.boundingBox, screen.screenBounds);
	}

	checkGameBounds(entity: Entity): boolean {
		return checkRectCollision(entity.boundingBox, screen.gameBoundingBox);
	}
}
