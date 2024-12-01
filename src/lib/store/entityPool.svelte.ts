import { TOWER_POSITIONS } from '$utils/towerPositions';
import { CollisionManager } from './CollisionManager.svelte';
import { Enemy } from './Entities/Enemy.svelte';
import { Entity } from './Entities/Entity.svelte';
import { Projectile } from './Entities/Projectile.svelte';
import { Tower } from './Entities/Tower.svelte';
import { Vector2 } from './Vector2.svelte';

export class EntityPool {
	entities = $state([]);
	towers = $derived(this.entities.filter((entity) => entity.type === 'tower'));
	enemies = $derived(this.entities.filter((entity) => entity.type === 'enemy'));
	projectiles = $derived(this.entities.filter((entity) => entity.type === 'projectile'));
	private collisionManager = new CollisionManager();
	lastSpawn = $state(new Date().getTime());
	private SPAWN_CD = 1000;

	constructor() {
		this.spawnEnemy();
		TOWER_POSITIONS.left.forEach((element) => {
			this.spawnTower(element.x, element.y);
		});
		TOWER_POSITIONS.right.forEach((element) => {
			this.spawnTower(element.x, element.y);
		});

		// this.spawnTower(300, 300);
	}

	update = (deltaTime: number) => {
		// Update all entities
		this.entities.forEach((entity) => entity.update(deltaTime, this));
		// Check collisions
		// this.collisionManager.checkCollisions(this.entities);

		// Handle spawning
		const currentTime = new Date().getTime();
		if (this.lastSpawn + this.SPAWN_CD < currentTime) {
			this.spawnEnemy();
			this.lastSpawn = currentTime;
		}

		// Clean up destroyed entities
		// this.entities = this.entities.filter((entity) => !entity.isDestroyed);
	};

	spawnEnemy = (name = 'enemy1') => {
		const names = ['enemy1', 'enemy2', 'enemy3'];
		const randomName = names[Math.floor(Math.random() * names.length)];
		const spawnAreas = [70, 100, 130, 160, 190, 220, 250, 280, 310, 340];
		const area = spawnAreas[Math.floor(Math.random() * spawnAreas.length)];
		const enemy = new Enemy(randomName, new Vector2(area, 5));
		this.add(enemy);
	};

	spawnTower = (x, y, name = 'blueTower') => {
		const tower = new Tower(name, new Vector2(x, y));
		this.add(tower);
	};

	spawnProjectile = (position, target, damage) => {
		const projectile = new Projectile('projectile', position, target, damage);
		this.add(projectile);
	};

	add = (entity: Entity) => {
		this.entities.push(entity);
	};

	remove = (entityId: number) => {
		this.entities = this.entities.filter((entity) => entity.id !== entityId);
	};
}
