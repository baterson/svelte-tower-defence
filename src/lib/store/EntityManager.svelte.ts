import { CollisionManager } from './CollisionManager.svelte';
import { Entity, initEntity } from './Entity.svelte';
import { gameLoop } from './GameLoop.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_CD = 1000;

export class EntityManager {
	entities = $state<Entity[]>([]);
	collisionManager = $state<CollisionManager>();

	livingEntities = $derived(
		this.entities.filter((entity) => entity.state?.currentState.name !== 'Die')
	);
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	loot = $derived(this.entities.filter((entity) => entity.type === 'loot'));
	throne = $derived(this.entities.find((entity) => entity.type === 'throne'));

	spawnCDId = gameLoop.setCD(SPAWN_CD, true);

	constructor() {
		this.initializeTowers();
		this.spawnThrone();
		this.collisionManager = new CollisionManager(this);

		this.spawnEnemy('stunner', { targetPosition: new Vector2(250, 250) });
	}

	update = (deltaTime: number) => {
		this.entities.forEach((entity) => entity.update(deltaTime));
		this.collisionManager.update();

		if (gameLoop.isCDReady(this.spawnCDId)) {
			this.spawnEnemy();
		}
	};

	initializeTowers() {
		[0, 1, 2, 3].forEach((i) => {
			this.spawnTower('moon');
		});
	}

	spawnEnemy = (name = 'enemy1', context = {}) => {
		const spawnAreas = [70, 100, 130, 160, 190, 220, 250, 280, 310, 340];

		const area = spawnAreas[Math.floor(Math.random() * spawnAreas.length)];
		const enemy = initEntity(name, new Vector2(area, 5), context);
		this.add(enemy);
	};

	spawnTower = (name = 'moon') => {
		const tower = initEntity(name, new Vector2(0, 0));
		this.add(tower);
	};

	spawnProjectile = (name, spawner: Entity, target: Entity) => {
		const projectile = initEntity(name, spawner.position, { spawner, target });

		this.add(projectile);
	};

	private spawnThrone = () => {
		const throne = initEntity('throne', new Vector2(200, 600));
		this.add(throne);
	};

	spawnLoot = (lootName: string, spawner: Entity, target: Entity) => {
		const loot = initEntity(lootName, spawner.position, { target, spawner });
		this.add(loot);
	};

	spawnUpgradePoints = (towerTarget: Entity) => {
		const upgradePoints = initEntity('upgradePoint', this.throne.position, { target: towerTarget });
		this.add(upgradePoints);
	};

	add = (entity: Entity) => {
		this.entities.push(entity);
	};

	destroy = (entityId: number) => {
		this.entities = this.entities.filter((entity) => entity.id !== entityId);
	};

	getById = (entityId: number): Entity | undefined => {
		return this.entities.find((entity) => entity.id === entityId);
	};

	getNearestEntityOfType = (
		position: Vector2,
		type: 'enemies' | 'projectiles' | 'towers' | 'throne' | 'loot',
		maxRange?: number
	): Entity | undefined => {
		let nearest: Entity | undefined;
		let minDistance = maxRange ?? Infinity;

		for (const entity of this[type]) {
			const distance = position.distance(entity.position);

			if (distance < minDistance) {
				minDistance = distance;
				nearest = entity;
			}
		}
		return nearest;
	};

	getNearestTowerLiving = (position: Vector2, maxRange?: number): Entity | undefined => {
		let nearest: Entity | undefined;
		let minDistance = Infinity;

		for (const entity of this.livingEntities.filter((entity) => entity.type === 'tower')) {
			const distance = position.distance(entity.position);

			if (distance < minDistance) {
				minDistance = distance;
				nearest = entity;
			}
		}
		return nearest;
	};

	getEntitiesInRadius = (position: Vector2, radius: number): Entity[] => {
		return this.entities.filter((entity) => position.distance(entity.position) <= radius);
	};
}

export const entityManager = new EntityManager();
