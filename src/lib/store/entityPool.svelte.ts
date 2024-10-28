import { Entity } from './entity.svelte';

const SPAWN_AREAS = [10, 40, 70, 100, 130];
const SPAWN_CD = 1000;

const randomPick = (array) => {
	return array[Math.floor(Math.random() * array.length)];
};

export class EntityPool {
	entities = $state([]);
	lastSpawn = $state(new Date().getTime());

	constructor() {
		this.spawn();
		this.spawn();
		// this.spawn();
	}

	update = (deltaTime) => {
		this.entities.forEach((obj) => obj.update(deltaTime));
		const next = new Date().getTime();

		if (this.lastSpawn + SPAWN_CD < next) {
			console.log('SPAWN');

			this.spawn();
			this.lastSpawn = next;
		}
	};

	spawn = () => {
		const area = randomPick(SPAWN_AREAS);
		// $inspect(this.entities);
		console.log('area', this.entities.length);

		this.entities.push(new Entity('gun', { x: area, y: 0 }));
		// this.entities = [...this.entities, new Entity('blade', { x: area, y: 0 })];
	};

	add = (object) => {
		this.entities.push(object);
	};

	remove = (objectId) => {
		this.entities = this.objects.filter((obj) => obj.id !== objectId);
	};
}
