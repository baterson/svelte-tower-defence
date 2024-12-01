import type { Entity } from './Entities/Entity.svelte';

export class CollisionManager {
	checkCollisions(entities: Entity[]) {
		for (let i = 0; i < entities.length; i++) {
			for (let j = i + 1; j < entities.length; j++) {
				const entityA = entities[i];
				const entityB = entities[j];

				if (entityA.collider.checkCollision(entityB.collider)) {
					this.handleCollision(entityA, entityB);
				}
			}
		}
	}

	private handleCollision(entityA: Entity, entityB: Entity) {
		// Handle specific collision cases based on entity types
		if (entityA.type === 'projectile' && entityB.type === 'enemy') {
			this.handleProjectileEnemyCollision(entityA, entityB);
		} else if (entityA.type === 'enemy' && entityB.type === 'projectile') {
			this.handleProjectileEnemyCollision(entityB, entityA);
		}
	}

	private handleProjectileEnemyCollision(projectile: Entity, enemy: Entity) {
		enemy.takeDamage(projectile.stats.damage);
		projectile.destroy();
	}
}
