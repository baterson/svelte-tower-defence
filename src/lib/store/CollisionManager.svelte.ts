import { Vector2 } from './Vector2.svelte';
import type { Entity } from './Entity.svelte';
import type { EntityManager } from './EntityManager.svelte';
import { screen } from '$lib/store/Screen.svelte';
import { checkRectCollision } from '$utils/math';

export class CollisionManager {
	private readonly COLLISION_RADIUS = 50;
	private entityManager: EntityManager;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
	}

	update() {
		// Handle tower projectiles vs nearest enemies
		this.handleProjectileCollisions(
			this.entityManager.filterProjectiles('tower'),
			this.entityManager.livingEnemies
		);

		// Handle enemy projectiles vs towers and throne
		this.handleProjectileCollisions(this.entityManager.filterProjectiles('enemy'), [
			...this.entityManager.livingTowers,
			this.entityManager.livingThrone
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

			const nearestTarget = this.entityManager.findNearestEntity(projectile, targets);
			if (!nearestTarget) continue;

			if (this.checkCollision(projectile, nearestTarget)) {
				projectile.onCollide(nearestTarget);
				nearestTarget.onCollide(projectile);
			}
		}
	}

	private handleEnemyCollisions(): void {
		const targets = [...this.entityManager.livingTowers, this.entityManager.livingThrone].filter(
			Boolean
		);

		for (const enemy of this.entityManager.livingEnemies) {
			const nearestTarget = this.entityManager.findNearestEntity(enemy, targets);
			if (!nearestTarget) continue;

			if (this.checkCollision(enemy, nearestTarget)) {
				enemy.onCollide(nearestTarget);
				nearestTarget.onCollide(enemy);
			}
		}
	}

	handleLootCollisions(): void {
		const throne = this.entityManager.livingThrone;

		for (const loot of this.entityManager.livingLoot) {
			if (this.checkCollision(loot, throne)) {
				loot.onCollide(throne);
				throne.onCollide(loot);
			}

			for (const tower of this.entityManager.livingTowers) {
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
		return checkRectCollision(entity.boundingBox, screen.gameBounds);
	}
}
