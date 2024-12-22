// Fly.svelte.ts
import { BaseState } from '../BaseState.svelte';
import { Vector2 } from '$store/Vector2.svelte';
import { angleToTarget, getDirectionFromAngle } from '$utils/math';

export class Fly extends BaseState {
	private direction: Vector2;
	private time: number;
	private amplitude: number;
	private frequency: number;
	private baseX: number;

	constructor(stateMachine) {
		super(stateMachine);
		this.time = 0;
		this.amplitude = 20;
		this.frequency = 0.003;
		this.baseX = this.entity.position.x;
		this.direction = new Vector2(0, 1); // Движение вниз
	}

	update(deltaTime: number) {
		this.time += deltaTime;
		const speed = this.entity.stats.speed * deltaTime;

		// Синусоидальное движение по X
		const xOffset = Math.sin(this.time * this.frequency) * this.amplitude;

		// Создаем новый вектор движения
		const movement = new Vector2(xOffset, this.direction.y * speed);

		// Обновляем позицию
		this.entity.position = this.entity.position.add(movement);

		// Обновляем поворот сущности
		const angle = Math.atan2(movement.y, movement.x);
		this.entity.rotation = angle * (180 / Math.PI); // Конвертируем радианы в градусы
	}
}
