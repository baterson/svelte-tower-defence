import { boundingBoxFromPoint, checkRectCollision } from '$lib/utils/math';
import type { Entity } from './Entity.svelte';
import type { Vector2 } from './Vector2.svelte';

export class EntityManager {
	entities = $state<Entity[]>([]);

	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	throne = $derived(this.entities.find((entity) => entity.type === 'throne'));
	loot = $derived(this.entities.filter((entity) => entity.type === 'loot'));

	update = (deltaTime: number) => {
		this.entities.forEach((entity) => entity.update(deltaTime));
	};

	filterByName(name: string | string[]): Entity[] {
		return this.entities.filter((entity) => {
			if (Array.isArray(name)) {
				return name.includes(entity.name);
			}
			return entity.name === name;
		});
	}

	findNearestEntity(source: Entity, targets: Entity[]): Entity | undefined {
		const distances = targets
			.filter((target) => target.isInteractable)
			.map((target) => {
				return source.position.distance(target.position);
			});
		const minDistance = Math.min(...distances);
		const index = distances.indexOf(minDistance);
		console.log('index:', index);

		return targets[index];
	}

	findByPosition(position: Vector2): Entity[] | [] {
		const boundingBox = boundingBoxFromPoint(position, 100, 100);

		return this.entities.filter((entity) => checkRectCollision(entity.boundingBox, boundingBox));
	}

	add = (entity: Entity | Entity[]) => {
		this.entities = [...this.entities, ...(Array.isArray(entity) ? entity : [entity])];
	};

	destroy = (entityId: number) => {
		this.entities = this.entities.filter((entity) => entity.id !== entityId);
	};

	getByName = (name: string): Entity | undefined => {
		return this.entities.find((entity) => entity.name === name);
	};

	getById = (entityId: number): Entity | undefined => {
		return this.entities.find((entity) => entity.id === entityId);
	};
}
