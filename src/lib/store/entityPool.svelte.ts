/**
 * Entity pool manager
 * @module EntityPool
 */

import { TOWER_POSITIONS } from '$utils/towerPositions';
import { Entity, initEntity } from './Entity.svelte';
import { Vector2 } from './Vector2.svelte';
// import { isInRadius } from '$utils/math';

export class EntityPool {
	entities = $state([]);
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	lastSpawn = $state(new Date().getTime());
	private SPAWN_CD = 1000;

	constructor() {
		this.initializeTowers();
		this.spawnEnemy();
		this.spawnThrone();
	}

	private initializeTowers() {
		// this.spawnTower(TOWER_POSITIONS.left[3].x, TOWER_POSITIONS.left[3].y);
		[...TOWER_POSITIONS.left, ...TOWER_POSITIONS.right].forEach(({ x, y }) => {
			this.spawnTower(x, y);
		});
	}

	update = (deltaTime: number) => {
		// Update all entities
		this.entities.forEach((entity) => entity.update(deltaTime, this));

		// Check collisions
		// this.checkCollisions();

		// Handle spawning
		const currentTime = new Date().getTime();
		if (currentTime - this.lastSpawn >= this.SPAWN_CD) {
			this.spawnEnemy();
			this.lastSpawn = currentTime;
		}

		// // Clean up destroyed entities
		// this.entities = this.entities.filter((entity) => !entity.isDestroyed);
	};

	checkCollisions = () => {
		// Check projectiles hitting enemies
		this.projectiles.forEach((projectile) => {
			this.enemies.forEach((enemy) => {
				// if (isInRadius(projectile.position, enemy.position, 20)) {
				// 	// collision radius
				// 	enemy.resolveCollision();
				// 	projectile.resolveCollision();
				// }
			});
		});

		// Check enemies in tower range
		// this.towers.forEach((tower) => {
		// 	this.enemies.forEach((enemy) => {
		// 		if (isInRadius(enemy.position, tower.position, tower.range)) {
		// 			tower.setState('Attack', enemy);
		// 		}
		// 	});
		// });
	};

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

	spawnThrone = () => {
		const throne = initEntity('throne', new Vector2(100, 500));
		this.add(throne);
	};

	add = (entity: Entity) => {
		this.entities.push(entity);
	};

	remove = (entityId: number) => {
		this.entities = this.entities.filter((entity) => entity.id !== entityId);
	};
}
