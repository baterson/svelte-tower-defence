import { boundingBoxFromPoint, checkRectCollision } from '$utils/math';
import type { Entity } from './Entity.svelte';
import type { Vector2 } from './Vector2.svelte';

export class EntityManager {
	entities = $state<Entity[]>([]);

	// Derived states from entities which  interactive
	livingEntities = $derived(
		this.entities.filter((entity) => entity.state?.currentState.name !== 'Die')
	);
	livingTowers = $derived(this.livingEntities.filter((entity) => entity.type === 'tower'));
	livingEnemies = $derived(this.livingEntities.filter((entity) => entity.type === 'enemy'));
	livingProjectiles = $derived(
		this.livingEntities.filter((entity) => entity.type === 'projectile')
	);
	livingLoot = $derived(this.livingEntities.filter((entity) => entity.type === 'loot'));
	livingThrone = $derived(this.livingEntities.find((entity) => entity.type === 'throne'));

	// Derived states from entities which could be notInteractive
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	loot = $derived(this.entities.filter((entity) => entity.type === 'loot'));
	throne = $derived(this.entities.find((entity) => entity.type === 'throne'));

	update = (deltaTime: number) => {
		this.entities.forEach((entity) => entity.update(deltaTime));
	};

	filterByOwnerType(ownerType: string): Entity[] {
		return this.livingProjectiles.filter((p) => p.state?.context?.spawner?.type === ownerType);
	}

	filterByName(name: string | string[]): Entity[] {
		return this.entities.filter((entity) => {
			if (Array.isArray(name)) {
				return name.includes(entity.name);
			}
			return entity.name === name;
		});
	}

	findNearestEntity(source: Entity, targets: Entity[]): Entity | undefined {
		const distances = targets.map((target) => {
			return source.position.distance(target.position);
		});
		const minDistance = Math.min(...distances);
		const index = distances.indexOf(minDistance);

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
