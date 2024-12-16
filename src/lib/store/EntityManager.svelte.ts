import { TOWER_POSITIONS } from '$utils/towerPositions';
import { CollisionManager } from './CollisionManager.svelte';
import { Entity, initEntity } from './Entity.svelte';
import { gameLoop } from './GameLoop.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_CD = 300;
const CLEANUP_INTERVAL = 10;

export class EntityManager {
	entities = $state<Entity[]>([]);
	// builtTowers = $derived(
	// 	this.towers.filter((tower) => tower.state.currentState.name !== 'NotBuilt')
	// );

	collisionManager = $state<CollisionManager>();
	// Derived state
	// todo: refactor to have pending destoyed entities, so they don't lost in update
	// don't use pending destoyed entities in collisions
	livingEntities = $derived(this.entities.filter((entity) => entity.isInteractable));
	destroyedEntities = $derived(this.entities.filter((entity) => entity.toDestroy));
	towers = $derived(this.livingEntities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.livingEntities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.livingEntities.filter((entity) => entity.type === 'projectile'));
	loot = $derived(this.livingEntities.filter((entity) => entity.type === 'loot'));
	throne = $derived(this.livingEntities.find((entity) => entity.type === 'throne'));
	base = $derived([...this.towers, this.throne]);
	fxEntities = $derived(this.entities.filter((entity) => entity.effect));

	spawnCDId = gameLoop.setCD(SPAWN_CD, true);
	cleanupCDId = gameLoop.setCD(CLEANUP_INTERVAL, true);

	constructor() {
		this.initializeTowers();
		this.spawnThrone();

		this.collisionManager = new CollisionManager(this);
	}

	update = (deltaTime: number) => {
		this.entities.forEach((entity) => entity.update(deltaTime, this));
		this.collisionManager.update(this.livingEntities);

		if (gameLoop.isCDReady(this.spawnCDId)) {
			this.spawnEnemy();
		}

		if (gameLoop.isCDReady(this.cleanupCDId)) {
			this.cleanupEntities();
		}
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

	spawnProjectile = (spawner: Entity, target: Entity) => {
		const projectile = initEntity('projectile1', spawner.position, { spawner, target });
		this.add(projectile);
	};

	spawnThrone = () => {
		const throne = initEntity('throne', new Vector2(200, 600));
		this.add(throne);
	};

	spawnLoot = (spawner: Entity) => {
		const loot = initEntity('loot', spawner.position, { target: this.throne });
		this.add(loot);
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

	cleanupEntities = () => {
		this.entities = this.entities.filter((entity) => !entity.toDestroy);
	};

	getEntityCount = (type: string): number => {
		return this.getByType(type).length;
	};
}

export const entityManager = new EntityManager();
