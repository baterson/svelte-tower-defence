import { BaseState } from '../BaseState.svelte';
import { Vector2 } from '$store/Vector2.svelte';

// todo rewrite using velocity, Vecto2 and math
export class Fly extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.time = 0;
		this.amplitude = 20;
		this.frequency = 0.003;
		this.baseX = this.entity.position.x;
		this.direction = Vector2.Down();
	}

	update(deltaTime: number) {
		this.time += deltaTime;
		const speed = this.entity.stats.speed * deltaTime;

		const xOffset = Math.sin(this.time * this.frequency) * this.amplitude;
		this.entity.position = this.entity.position.add(new Vector2(xOffset, 0));

		const movement = new Vector2(xOffset, this.direction.y * speed);
		this.entity.position = this.entity.position.add(movement);

		const angle = Math.atan2(movement.y, movement.x);
		this.entity.rotation = radToDeg(angle);
	}
}
