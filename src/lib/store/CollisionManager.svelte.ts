import { Vector2 } from './Vector2.svelte';
import type { Entity } from './Entity.svelte';
import type { EntityManager } from './EntityManager.svelte';

export class CollisionManager {
	private readonly COLLISION_RADIUS = 50;
	private entityManager: EntityManager;

	constructor(entityManager: EntityManager) {
		this.entityManager = entityManager;
	}

	update() {
		// Handle tower projectiles vs nearest enemies
		this.handleProjectileCollisions(
			this.filterProjectilesByOwner('tower'),
			this.entityManager.livingEntities.filter((entity) => entity.type === 'enemy')
		);

		// Handle enemy projectiles vs towers and throne
		this.handleProjectileCollisions(
			this.filterProjectilesByOwner('enemy'),
			this.entityManager.livingEntities.filter(
				(entity) => entity.type === 'tower' || entity.type === 'throne'
			)
		);

		// Handle enemy collisions
		this.handleEnemyCollisions();

		this.handleLootCollisions();
	}

	private filterProjectilesByOwner(ownerType: string): Entity[] {
		return this.entityManager.projectiles.filter(
			(p) => p.state?.context?.spawner?.type === ownerType
		);
	}

	private handleProjectileCollisions(projectiles: Entity[], targets: Entity[]): void {
		for (const projectile of projectiles) {
			if (!this.checkGameBounds(projectile)) {
				projectile.onCollide('OUT_OF_BOUNDS');

				continue;
			}

			const nearestTarget = this.findNearestEntity(projectile, targets);
			if (!nearestTarget) continue;

			if (this.checkCollision(projectile, nearestTarget)) {
				projectile.onCollide(nearestTarget);
				nearestTarget.onCollide(projectile);
			}
		}
	}

	private handleEnemyCollisions(): void {
		const targets = [...this.entityManager.towers, this.entityManager.throne].filter(Boolean);

		for (const enemy of this.entityManager.enemies) {
			const nearestTarget = this.findNearestEntity(enemy, targets);
			if (!nearestTarget) continue;

			if (this.checkCollision(enemy, nearestTarget)) {
				enemy.onCollide(nearestTarget);
				nearestTarget.onCollide(enemy);
			}
		}
	}

	private handleLootCollisions(): void {
		const throne = this.entityManager.throne;
		if (!throne?.onCollide) return;

		for (const loot of this.entityManager.livingEntities.filter((e) => e.type === 'loot')) {
			if (this.checkCollision(loot, throne)) {
				loot.onCollide(throne);
				throne.onCollide(loot);
			}

			for (const tower of this.entityManager.livingEntities.filter((e) => e.type === 'tower')) {
				if (this.checkCollision(loot, tower)) {
					loot.onCollide(tower);
					tower.onCollide(loot);
				}
			}
		}
	}

	private findNearestEntity(source: Entity, targets: Entity[]): Entity | undefined {
		let nearest: Entity | undefined;
		let minDistance = this.COLLISION_RADIUS;

		for (const target of targets) {
			const distance = this.getDistance(source.position, target.position);
			if (distance < minDistance) {
				minDistance = distance;
				nearest = target;
			}
		}

		return nearest;
	}

	private getDistance(pos1: Vector2, pos2: Vector2): number {
		const dx = pos2.x - pos1.x;
		const dy = pos2.y - pos1.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	private checkCollision(entity1: Entity, entity2: Entity): boolean {
		const box1 = entity1.boundingBox;
		const box2 = entity2.boundingBox;

		return (
			box1.x < box2.x + box2.width &&
			box1.x + box1.width > box2.x &&
			box1.y < box2.y + box2.height &&
			box1.y + box1.height > box2.y
		);
	}

	private checkGameBounds(entity: Entity): boolean {
		const bounds = {
			minX: 0,
			maxX: 440,
			minY: 0,
			maxY: 780
		};

		const box = entity.boundingBox;

		return !(
			box.x < bounds.minX ||
			box.x + box.width > bounds.maxX ||
			box.y < bounds.minY ||
			box.y + box.height > bounds.maxY
		);
	}
}
