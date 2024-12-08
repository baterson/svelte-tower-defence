/**
 * Entity Manager
 * Manages all game entities lifecycle and updates
 * @module EntityManager
 */
import { TOWER_POSITIONS } from '$utils/towerPositions';
import { CollisionManager } from './CollisionManager.svelte';
import { Entity, initEntity } from './Entity.svelte';
import { TimeManager } from './TimeManager.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_CD = 1000; // 1 second cooldown between enemy spawns
const CLEANUP_INTERVAL = 1000; // 1 second interval for cleanup

export class EntityManager {
	// State declarations for Svelte reactivity
	entities = $state<Entity[]>([]);
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	collisionManager = $state<CollisionManager>();
	timeManager = $state<TimeManager>();

	/**
	 * Initialize EntityManager
	 * @example
	 * const entityManager = new EntityManager();
	 */
	constructor() {
		this.collisionManager = new CollisionManager();
		this.initializeTowers();
		this.spawnThrone();

		this.timeManager = new TimeManager();

		this.timeManager.setTimer(this.spawnEnemy, SPAWN_CD, true);
		this.timeManager.setTimer(this.cleanupEntities, CLEANUP_INTERVAL, true);
	}

	/**
	 * Main update loop for entities
	 * @example
	 * gameLoop() {
	 *   entityManager.update(deltaTime);
	 * }
	 */
	update = (deltaTime: number) => {
		// Update timers
		this.timeManager.update(deltaTime);

		this.entities.forEach((entity) => entity.beforeUpdate(deltaTime, this));
		this.entities.forEach((entity) => entity.update(deltaTime, this));

		// Handle collisions
		const collisions = this.collisionManager.detectCollisions(this.entities);
		this.collisionManager.resolveCollisions(collisions);
	};

	/**
	 * Initialize tower positions from config
	 * @private
	 */
	private initializeTowers() {
		[...TOWER_POSITIONS.left, ...TOWER_POSITIONS.right].forEach(({ x, y }) => {
			this.spawnTower(x, y);
		});
	}

	/**
	 * Spawn new enemy
	 * @example
	 * entityManager.spawnEnemy();
	 */
	spawnEnemy = () => {
		const names = ['enemy1', 'enemy2', 'enemy3'];
		const randomName = names[Math.floor(Math.random() * names.length)];

		// Spawn areas along top of screen
		const spawnAreas = [70, 100, 130, 160, 190, 220, 250, 280, 310, 340];
		const area = spawnAreas[Math.floor(Math.random() * spawnAreas.length)];

		const enemy = initEntity(randomName, new Vector2(area, 5));
		this.add(enemy);
	};

	/**
	 * Spawn tower at position
	 * @example
	 * entityManager.spawnTower(100, 200, 'blueTower');
	 */
	spawnTower = (x: number, y: number, name = 'blueTower') => {
		const tower = initEntity(name, new Vector2(x, y));
		this.add(tower);
	};

	/**
	 * Spawn projectile targeting specific entity
	 * @example
	 * entityManager.spawnProjectile(towerPos, targetEnemy);
	 */
	spawnProjectile = (position: Vector2, target: Entity) => {
		const projectile = initEntity('projectile', position, { target });
		this.add(projectile);
	};

	/**
	 * Spawn throne at position
	 * @private
	 */
	private spawnThrone = () => {
		const throne = initEntity('throne', new Vector2(100, 500));
		this.add(throne);
	};

	/**
	 * Add entity to manager
	 * @example
	 * entityManager.add(newEntity);
	 */
	add = (entity: Entity) => {
		this.entities.push(entity);
	};

	/**
	 * Remove entity by ID
	 * @example
	 * entityManager.remove(entity.id);
	 */
	remove = (entityId: number) => {
		this.entities = this.entities.filter((entity) => entity.id !== entityId);
	};

	/**
	 * Get entity by ID
	 * @example
	 * const entity = entityManager.getById(5);
	 */
	getById = (entityId: number): Entity | undefined => {
		return this.entities.find((entity) => entity.id === entityId);
	};

	/**
	 * Get entities by type
	 * @example
	 * const enemies = entityManager.getByType('enemy');
	 */
	getByType = (type: string): Entity[] => {
		return this.entities.filter((entity) => entity.type === type);
	};

	/**
	 * Get nearest entity of type to position
	 * @example
	 * const nearestEnemy = entityManager.getNearestEntityOfType(towerPos, 'enemy', 200);
	 */
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

	/**
	 * Get entities in radius of position
	 * @example
	 * const nearbyEnemies = entityManager.getEntitiesInRadius(towerPos, 100, 'enemy');
	 */
	getEntitiesInRadius = (position: Vector2, radius: number, type?: string): Entity[] => {
		return this.entities.filter((entity) => {
			if (type && entity.type !== type) return false;
			return position.distance(entity.position) <= radius;
		});
	};

	/**
	 * Clean up destroyed entities
	 * @private
	 */
	private cleanupEntities = () => {
		this.entities = this.entities.filter((entity) => !entity.isDestroyed);
	};

	/**
	 * Get total count of entities by type
	 * @example
	 * const enemyCount = entityManager.getEntityCount('enemy');
	 */
	getEntityCount = (type: string): number => {
		return this.getByType(type).length;
	};

	/**
	 * Clear all entities of specific type
	 * @example
	 * entityManager.clearEntitiesByType('projectile');
	 */
	clearEntitiesByType = (type: string) => {
		this.entities = this.entities.filter((entity) => entity.type !== type);
	};

	/**
	 * Clear all entities
	 * @example
	 * entityManager.clearAllEntities();
	 */
	clearAllEntities = () => {
		this.entities = [];
	};
}
