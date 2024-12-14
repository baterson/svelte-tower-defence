import { TOWER_POSITIONS } from '$utils/towerPositions';
import { CollisionManager } from './CollisionManager.svelte';
import { Entity, initEntity } from './Entity.svelte';
import { TimeManager } from './TimeManager.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_CD = 200;
const CLEANUP_INTERVAL = 10;

export class EntityManager {
	entities = $state<Entity[]>([]);
	timeManager = $state<TimeManager>();

	collisionManager = $state<CollisionManager>();
	// Derived state
	livingEntities = $derived(this.entities.filter((entity) => entity.isInteractable));
	towers = $derived(this.livingEntities.filter((entity) => entity.type === 'tower'));
	builtTowers = $derived(
		this.towers.filter((tower) => tower.state.currentState.name !== 'NotBuilt')
	);
	enemies = $derived(this.livingEntities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.livingEntities.filter((entity) => entity.type === 'projectile'));
	throne = $derived(this.livingEntities.find((entity) => entity.type === 'throne'));

	constructor() {
		this.initializeTowers();
		this.spawnThrone();

		this.collisionManager = new CollisionManager();
		this.timeManager = new TimeManager();

		this.timeManager.setTimer(this.spawnEnemy, SPAWN_CD, true);
		this.timeManager.setTimer(this.cleanupEntities, CLEANUP_INTERVAL, true);
	}

	update = (deltaTime: number) => {
		this.timeManager.update(deltaTime);
		this.entities.forEach((entity) => entity.update(deltaTime, this));
		this.collisionManager.update(this.livingEntities);
		this.cleanupEntities();
	};

	// resolveCollisions() {
	// 	for (const enemy of this.enemies) {
	// 		if (enemy.isDestroyed) continue;

	// 		if (enemy.collider.checkCollision(this.throne.collider)) {
	// 			enemy.collider.resolveCollision(this.throne.collider);
	// 			this.throne.collider.resolveCollision(enemy.collider);
	// 		}

	// 		for (const projectile of this.projectiles) {
	// 			if (projectile.isDestroyed) continue;

	// 			if (enemy.collider.checkCollision(projectile.collider)) {
	// 				enemy.collider.resolveCollision(projectile.collider);
	// 				projectile.collider.resolveCollision(enemy.collider);
	// 			}
	// 		}

	// 		for (const tower of this.towers) {
	// 			if (tower.isDestroyed) continue;

	// 			if (enemy.collider.checkCollision(tower.collider)) {
	// 				enemy.collider.resolveCollision(tower.collider);
	// 				tower.collider.resolveCollision(enemy.collider);
	// 			}
	// 		}
	// 	}

	// 	for (const tower of this.builtTowers) {
	// 		if (tower.isDestroyed) continue;

	// 		for (const projectile of this.projectiles) {
	// 			if (projectile.isDestroyed) continue;

	// 			if (tower.collider.checkCollision(projectile.collider)) {
	// 				tower.collider.resolveCollision(projectile.collider);
	// 				projectile.collider.resolveCollision(tower.collider);
	// 			}
	// 		}
	// 	}
	// }

	private initializeTowers() {
		[...TOWER_POSITIONS.left, ...TOWER_POSITIONS.right].forEach(({ x, y }) => {
			this.spawnTower(x, y);
		});

		// this.spawnTower(383, 162);
	}

	spawnEnemy = () => {
		const names = ['enemy1', 'enemy2', 'enemy3'];
		const randomName = names[Math.floor(Math.random() * names.length)];
		const spawnAreas = [70, 100, 130, 160, 190, 220, 250, 280, 310, 340];
		const area = spawnAreas[Math.floor(Math.random() * spawnAreas.length)];
		const enemy = initEntity(randomName, new Vector2(area, 5));
		this.add(enemy);
	};

	spawnTower = (x: number, y: number, name = 'blueTower') => {
		const tower = initEntity(name, new Vector2(x, y));
		this.add(tower);
	};

	spawnProjectile = (spawner: Entity, target: Entity) => {
		const projectile = initEntity('projectile', spawner.position, { spawner, target });
		this.add(projectile);
	};

	private spawnThrone = () => {
		const throne = initEntity('throne', new Vector2(80, 600));
		this.add(throne);
	};

	add = (entity: Entity) => {
		this.entities.push(entity);
	};

	remove = (entityId: number) => {
		this.entities = this.entities.filter((entity) => entity.id !== entityId);
	};

	getById = (entityId: number): Entity | undefined => {
		return this.entities.find((entity) => entity.id === entityId);
	};

	getByType = (type: string): Entity[] => {
		return this.livingEntities.filter((entity) => entity.type === type);
	};

	getNearestEntityOfType = (
		position: Vector2,
		type: string,
		maxRange?: number
	): Entity | undefined => {
		const entities = this.getByType(type);
		let nearest: Entity | undefined;
		let minDistance = maxRange ?? Infinity;

		for (const entity of entities) {
			const distance = position.distance(entity.position);
			if (distance < minDistance) {
				minDistance = distance;
				nearest = entity;
			}
		}
		return nearest;
	};

	getEntitiesInRadius = (position: Vector2, radius: number, type?: string): Entity[] => {
		return this.entities.filter((entity) => {
			if (type && entity.type !== type) return false;
			return position.distance(entity.position) <= radius;
		});
	};

	private cleanupEntities = () => {
		this.entities = this.entities.filter((entity) => !entity.toDestroy);
	};

	getEntityCount = (type: string): number => {
		return this.getByType(type).length;
	};

	clearEntitiesByType = (type: string) => {
		this.entities = this.entities.filter((entity) => entity.type !== type);
	};

	clearAllEntities = () => {
		this.entities = [];
	};
}

export const entityManager = new EntityManager();
