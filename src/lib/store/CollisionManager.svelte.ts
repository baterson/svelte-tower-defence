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
}
