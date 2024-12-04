/**
 * Run state for enemies
 * @module Run
 */

import { BaseState } from '../BaseState.svelte';
import type { Entity } from '$store/Entity.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';
import { Walls } from '$lib/config/entitiyConfig';
import { follow, checkWallCollision, reflectMovement, distance } from '$utils/math';
import { Vector2 } from '$store/Vector2.svelte';

export class Run extends BaseState {
	private currentDirection: Vector2;

	constructor() {
		super();
		this.currentDirection = new Vector2(0, 1); // Начальное движение вниз
	}

	update(deltaTime: number, enemy: Entity, entityPool: EntityPool) {
		// debugger;

		const throne = entityPool.entities.find((e) => e.type === 'throne');
		if (!throne) return;

		// Проверяем столкновение с троном
		if (distance(enemy.position, throne.position) <= throne.stats.range) {
			throne.stats.health -= enemy.stats.damage;
			enemy.state.setState('Die');
			return;
		}

		// Проверяем столкновение со стенами
		for (const wall of Walls) {
			if (checkWallCollision(enemy.position, wall)) {
				// Получаем новое направление движения после отражения
				this.currentDirection = reflectMovement(enemy.position, this.currentDirection, wall);
				break;
			}
		}

		// Если нет столкновения со стенами, двигаемся к трону
		if (!Walls.some((wall) => checkWallCollision(enemy.position, wall))) {
			this.currentDirection = follow(enemy.position, throne.position);
		}

		const speed = enemy.stats.speed * deltaTime;

		// Обновляем позицию
		enemy.position.x += this.currentDirection.x * speed;
		enemy.position.y += this.currentDirection.y * speed;

		// Обновляем поворот в направлении движения
		enemy.rotation = Math.atan2(this.currentDirection.y, this.currentDirection.x);
	}
}
