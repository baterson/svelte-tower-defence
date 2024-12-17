import { BaseState } from '../BaseState.svelte';
import type { Entity } from '$store/Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { radToDeg } from '$utils/math';

export class Fly extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.time = 0;
		this.amplitude = 20;
		this.frequency = 0.003;
		this.baseX = this.entity.position.x;
		this.direction = Vector2.Down();
	}

	update(deltaTime: number, enemy: Entity) {
		this.time += deltaTime;
		const speed = enemy.stats.speed * deltaTime;

		const xOffset = Math.sin(this.time * this.frequency) * this.amplitude;
		enemy.position.x = this.baseX + xOffset;

		const movement = new Vector2(xOffset, this.direction.y * speed);
		enemy.position = enemy.position.add(movement);

		const angle = Math.atan2(movement.y, movement.x);
		enemy.rotation = radToDeg(angle);
	}
}
