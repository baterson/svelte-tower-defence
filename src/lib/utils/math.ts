/**
 * Math utilities for game calculations
 * @module math
 */

import { Vector2 } from '$lib/store/Vector2.svelte';
// import type { Rect2D } from '$lib/types/collision';
// type Rect2D = {}

export interface Rect2D {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

export function normalizeVector(current: Vector2, target: Vector2): Vector2 {
	const dx = target.x - current.x;
	const dy = target.y - current.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance ? new Vector2(dx / distance, dy / distance) : Vector2.Zero();
}

export function checkRectCollision(rect1: Rect2D, rect2: Rect2D): boolean {
	return (
		rect1.x1 <= rect2.x2 && rect1.x2 >= rect2.x1 && rect1.y1 <= rect2.y2 && rect1.y2 >= rect2.y1
	);
}

export function checkPointInRect(point: Vector2, rect: Rect2D): boolean {
	return point.x >= rect.x1 && point.x <= rect.x2 && point.y >= rect.y1 && point.y <= rect.y2;
}

/**
 * Calculate angle between two points in radians
 * @example
 * // Rotate tower towards enemy
 * tower.rotation = angleToTarget(tower.position, enemy.position);
 */
export function angleToTarget(source: Vector2, target: Vector2): number {
	return Math.atan2(target.y - source.y, target.x - source.x);
}

/**
 * Linear interpolation between two values
 * @example
 * // Smooth projectile movement
 * const t = 0.1; // interpolation factor
 * const smoothedPosition = lerp(startPos, targetPos, t);
 */
export function lerp(start: number, end: number, t: number): number {
	return start + (end - start) * t;
}

/**
 * Get direction vector from angle
 * @example
 * // Calculate projectile direction
 * const angle = angleToTarget(tower.position, enemy.position);
 * const direction = getDirectionFromAngle(angle);
 * projectile.velocity = direction.multiply(projectileSpeed);
 */
export function getDirectionFromAngle(angle: number): Vector2 {
	return new Vector2(Math.cos(angle), Math.sin(angle));
}

export function random(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
