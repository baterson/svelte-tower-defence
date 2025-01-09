import { boundingBoxFromPoint, checkRectCollision } from '$lib/utils/math';
import { screen } from '$lib/store/Screen.svelte';
import type { Entity } from './Entity.svelte';
import type { Vector2 } from './Vector2.svelte';

export class EntityManager {
	entities = $state.raw<Entity[]>([]);

	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	livingEnemies = $derived(this.enemies.filter((entity) => entity.isInteractable));

	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	topTowers = $derived(this.towers.filter((tower, index) => index <= 1));
	bottomTowers = $derived(this.towers.filter((tower, index) => index >= 2));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));

	livingProjectiles = $derived(this.projectiles.filter((entity) => entity.isInteractable));
	throne = $derived(this.entities.find((entity) => entity.type === 'throne'));

	loot = $derived(this.entities.filter((entity) => entity.type === 'loot'));
	livingLoot = $derived(this.loot.filter((entity) => entity.isInteractable));

	update = (deltaTime: number) => {
		this.entities.forEach((entity) => entity.update(deltaTime));
	};

	reset = () => {
		this.entities = [];
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
		const validTargets = targets.filter(
			(target) => target.isInteractable
			// (target) => target.isInteractable && screen.isEntityInScreen(target)
		);

		if (validTargets.length === 0) return undefined;

		const distances = validTargets.map((target) => source.position.distance(target.position));
		const minDistance = Math.min(...distances);
		const index = distances.indexOf(minDistance);

		return validTargets[index];
	}
	findNearestEntities(source: Entity, targets: Entity[], count: number = 3): Entity[] | undefined {
		const validTargets = targets.filter((target) => target.isInteractable);

		if (validTargets.length === 0) return undefined;

		const targetWithDistances = validTargets.map((target) => ({
			target,
			distance: source.position.distance(target.position)
		}));
		targetWithDistances.sort((a, b) => a.distance - b.distance);
		const neartstCount = Math.min(count, targetWithDistances.length);

		return targetWithDistances.slice(0, neartstCount).map((target) => target.target);
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
