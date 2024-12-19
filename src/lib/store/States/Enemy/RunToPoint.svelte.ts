import { BaseState } from '../BaseState.svelte';
import type { Entity } from '$store/Entity.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { angleToTarget, checkRectCollision, getDirectionFromAngle } from '$utils/math';

export class RunToPoint extends BaseState {
	private currentDirection: Vector2;

	constructor(stateMachine, stateContext = {}) {
		super(stateMachine, stateContext);

		const { targetPosition } = this.stateMachine.context;
		const angle = angleToTarget(this.entity.position, targetPosition);
		this.currentDirection = getDirectionFromAngle(angle);

		this.entity.rotation = angle;
	}

	update(deltaTime: number, enemy: Entity) {
		const speed = enemy.stats.speed * deltaTime;
		const { targetPosition } = this.stateMachine.context;

		enemy.position.x += this.currentDirection.x * speed;
		enemy.position.y += this.currentDirection.y * speed;

		enemy.rotation = Math.atan2(this.currentDirection.y, this.currentDirection.x);

		if (
			checkRectCollision(
				{
					x: enemy.position.x,
					y: enemy.position.y,
					width: enemy.width,
					height: enemy.height
				},
				{
					x: targetPosition.x - enemy.width / 2,
					y: targetPosition.y - enemy.height / 2,
					width: enemy.width,
					height: enemy.height
				}
			)
		) {
			this.stateMachine.setState('StunAllTowers');
		}
	}
}
