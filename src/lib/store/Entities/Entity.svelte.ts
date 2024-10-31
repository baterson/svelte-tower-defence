import { entities } from '$lib/entitiesConfig';
import { Sprite } from '$lib/store/Sprite.svelte';
import { Collider } from '$lib/store/Collider.svelte';
import type { Vector2 } from '$lib/store/Vector2.svelte';
import { StateMachine } from '../StateMachine.svelte';

export class Entity {
	static lastId = 0;
	id = $state(Entity.lastId++);
	name = $state();
	width = $state();
	height = $state();
	sprite = $state<Sprite>();
	// collider = $state<Collider>();
	position = $state<Vector2>();
	state = $state();
	stats = $state();
	rotation = $state(0);

	constructor(name, position) {
		const { width, height, states, defaultState, stats } = entities[name];
		this.name = name;
		this.width = width;
		this.height = height;
		this.position = position;
		this.state = new StateMachine(this, states, defaultState);
		// this.collider = new Collider({});
	}

	update = (deltaTime) => {
		this.state.update(deltaTime);
	};

	shoot = () => {
		this.state.setState('shoot');
	};
}
