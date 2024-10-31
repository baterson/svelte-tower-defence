import { randomPick } from '$lib/utils/helpers';
import { Entity } from './Entities/Entity.svelte';
import { Tower } from './Entities/Tower.svelte';
import { Vector2 } from './Vector2.svelte';

const SPAWN_AREAS = [10, 40, 70, 100, 130];
const SPAWN_CD = 3000;

// todo: refactor. Make it proffessional
export class EntityPool {
	entities = $state([]);
	towers = $state([]);
	lastSpawn = $state(new Date().getTime());

	constructor() {
		this.spawn();
		// this.towers.push(new Tower('tower1', new Vector2({ x: 0, y: 0 })));
	}

	update = (deltaTime) => {
		this.entities.forEach((obj) => obj.update(deltaTime));
		const next = new Date().getTime();

		if (this.lastSpawn + SPAWN_CD < next) {
			this.entities.forEach((obj) => obj.shoot(deltaTime));
			this.spawn();
			this.lastSpawn = next;
		}
	};

	spawn = () => {
		const area = randomPick(SPAWN_AREAS);
		this.entities.push(new Entity('archer', new Vector2(area, 5)));
	};

	add = (object) => {
		this.entities.push(object);
	};

	remove = (objectId) => {
		this.entities = this.objects.filter((obj) => obj.id !== objectId);
	};
}
