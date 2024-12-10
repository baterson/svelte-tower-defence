import { TOWER_POSITIONS } from '$utils/towerPositions';
import { CollisionManager } from './CollisionManager.svelte';
import { Entity, initEntity } from './Entity.svelte';
import { TimeManager } from './TimeManager.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_CD = 1000;
const CLEANUP_INTERVAL = 1000;

export class EntityManager {
	entities = $state<Entity[]>([]);
	livingEntities = $derived(this.entities.filter((entity) => !entity.isDestroyed));
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	collisionManager = $state<CollisionManager>();
	timeManager = $state<TimeManager>();

	constructor() {
		this.collisionManager = new CollisionManager();
		this.initializeTowers();
		this.spawnThrone();

		this.timeManager = new TimeManager();

		this.timeManager.setTimer(this.spawnEnemy, SPAWN_CD, true);
		this.timeManager.setTimer(this.cleanupEntities, CLEANUP_INTERVAL, true);
	}

	update = (deltaTime: number) => {
		this.timeManager.update(deltaTime);
		this.entities.forEach((entity) => entity.beforeUpdate(deltaTime, this));
		this.entities.forEach((entity) => entity.update(deltaTime, this));

		// const walls = this.collisionManager.detectWallCollisions(this.entities);
		// const collisions = this.collisionManager.detectEntityCollisions(this.entities);

		// this.collisionManager.resolveWallCollisions(walls);
		this.collisionManager.resolveEntityCollisions(this.entities);
		this.cleanupEntities();
	};

	private initializeTowers() {
		[...TOWER_POSITIONS.left, ...TOWER_POSITIONS.right].forEach(({ x, y }) => {
			this.spawnTower(x, y);
		});
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

	spawnProjectile = (position: Vector2, target: Entity) => {
		const projectile = initEntity('projectile', position, { target });
		this.add(projectile);
	};

	private spawnThrone = () => {
		const throne = initEntity('throne', new Vector2(100, 600));
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
		this.entities = this.entities.filter((entity) => !entity.isDestroyed);
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
