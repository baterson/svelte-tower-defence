import { CollisionManager } from './CollisionManager.svelte';
import { Entity, initEntity } from './Entity.svelte';
import { gameLoop } from './GameLoop.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_CD = 1000;

export class EntityManager {
	entities = $state<Entity[]>([]);
	collisionManager = $state<CollisionManager>();

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

	filterProjectiles(ownerType: string): Entity[] {
		return this.livingProjectiles.filter((p) => p.state?.context?.spawner?.type === ownerType);
	}

	findNearestEntity(source: Entity, targets: Entity[]): Entity | undefined {
		const distances = targets.map((target) => {
			return source.position.distance(target.position);
		});
		const minDistance = Math.min(...distances);
		const index = distances.indexOf(minDistance);

		return targets[index];
	}

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
		const projectile = initEntity(name, spawner.position.clone(), { spawner, target });
		this.add(projectile);
	};

	spawnThrone = () => {
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

	// getEntitiesInRadius = (position: Vector2, radius: number): Entity[] => {
	// 	return this.entities.filter((entity) => position.distance(entity.position) <= radius);
	// };
}

export const entityManager = new EntityManager();
