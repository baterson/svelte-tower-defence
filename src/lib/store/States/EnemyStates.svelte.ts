/**
 * EnemyStates.ts
 * State classes for enemy behavior
 */

import { BaseState } from '$lib/store/States/BaseState.svelte';
import type { EntityPool } from '$lib/store/EntityPool.svelte';
import type { Enemy } from '$store/Entities/Enemy.svelte';
import { distance } from '$utils/math';

export class Run extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		const speed = enemy.stats.speed * deltaTime;
		enemy.position.y += speed;

		// Check if should transition to shoot state
		const towers = entityPool.entities.filter((entity) => entity.name.includes('tower'));
		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = distance(enemy.position, tower.position);
					const nearestDist = distance(enemy.position, nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		if (nearestTower) {
			const dist = distance(enemy.position, nearestTower.position);
			if (dist <= enemy.stats.range) {
				enemy.state.setState('Shoot');
			}
		}

		// Check health
		if (enemy.health <= 0) {
			enemy.state.setState('Death');
		}
	}
}

export class Shoot extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		// Check health first
		if (enemy.health <= 0) {
			enemy.state.setState('Death');
			return;
		}

		const currentTime = Date.now();
		const attackCooldown = 1000 / enemy.stats.attackSpeed;

		if (currentTime - enemy.lastAttack < attackCooldown) {
			return;
		}

		const towers = entityPool.towers;
		const nearestTower = towers.length
			? towers.reduce((nearest, tower) => {
					const currentDist = distance(enemy.position, tower.position);
					const nearestDist = distance(enemy.position, nearest.position);
					return currentDist < nearestDist ? tower : nearest;
				}, towers[0])
			: null;

		if (!nearestTower) {
			enemy.state.setState('Run');
			return;
		}

		const dist = distance(enemy.position, nearestTower.position);
		if (dist > enemy.stats.range) {
			enemy.state.setState('Run');
			return;
		}

		// Attack the tower
		enemy.lastAttack = currentTime;
		entityPool.spawnProjectile(enemy.position, nearestTower, enemy.stats.damage);
	}
}

export class Die extends BaseState {
	private deathDelay = 600; // Duration of death animation
	private startTime: number | null = null;

	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		if (this.startTime === null) {
			this.startTime = Date.now();
		}

		const elapsedTime = Date.now() - this.startTime;

		// Update opacity based on time
		enemy.opacity = Math.max(0, 1 - elapsedTime / this.deathDelay);

		if (elapsedTime >= this.deathDelay) {
			enemy.isDestroyed = true;
			entityPool.remove(enemy.id);
		}
	}
}

export class Idle extends BaseState {
	update(deltaTime: number, enemy: Enemy, entityPool: EntityPool) {
		// Check health
		if (enemy.health <= 0) {
			enemy.state.setState('Death');
			return;
		}

		// Transition to run after short delay
		setTimeout(() => {
			if (enemy.health > 0) {
				enemy.state.setState('Run');
			}
		}, 500);
	}
}
