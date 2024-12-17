/**
 * Math utilities for game calculations
 * @module math
 */

import { Vector2 } from '$lib/store/Vector2.svelte';
// import type { Rect2D } from '$lib/types/collision';
// type Rect2D = {}

export interface Rect2D {
	x: number;
	y: number;
	width: number;
	height: number;
}

// export function distance(point1: Vector2, point2: Vector2): number {
// 	const dx = point2.x - point1.x;
// 	const dy = point2.y - point1.y;
// 	return Math.sqrt(dx * dx + dy * dy);
// }

export function calculateAngle(source: Vector2, target: Vector2): number {
	return Math.atan2(target.y - source.y, target.x - source.x);
}

export function normalizeVector(current: Vector2, target: Vector2): Vector2 {
	const dx = target.x - current.x;
	const dy = target.y - current.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance ? new Vector2(dx / distance, dy / distance) : Vector2.Zero();
}

export function checkRectCollision(rect1: Rect2D, rect2: Rect2D): boolean {
	return (
		rect1.x < rect2.x + rect2.width &&
		rect1.x + rect1.width > rect2.x &&
		rect1.y < rect2.y + rect2.height &&
		rect1.y + rect1.height > rect2.y
	);
}

export function checkCircleCollision(point: Vector2, center: Vector2, radius: number): boolean {
	return distance(point, center) <= radius;
}
/**
 * Calculate distance between two points
 * @example
 * // Check if enemy is in tower range
 * const dist = distance(towerPos, enemyPos);
 * if (dist <= towerRange) {
 *   // Attack enemy
 * }
 */
export function distance(point1: Vector2, point2: Vector2): number {
	const dx = point2.x - point1.x;
	const dy = point2.y - point1.y;
	return Math.sqrt(dx * dx + dy * dy);
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
 * Check if point is in radius
 * @example
 * // Check if enemy is in tower attack range
 * if (isInRadius(enemyPos, towerPos, towerRange)) {
 *   tower.attack(enemy);
 * }
 */
export function isInRadius(point: Vector2, center: Vector2, radius: number): boolean {
	return distance(point, center) <= radius;
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

/**
 * Get direction vector towards target
 * @example
 * // Move enemy towards throne
 * const direction = follow(enemyPos, thronePos);
 * enemy.position = enemy.position.add(direction.multiply(speed));
 */
export function follow(current: Vector2, target: Vector2): Vector2 {
	const dx = target.x - current.x;
	const dy = target.y - current.y;
	const distance = Math.sqrt(dx * dx + dy * dy);
	return distance ? new Vector2(dx / distance, dy / distance) : Vector2.Zero();
}

/**
 * Check collision with wall
 * @example
 * // Check if enemy hits wall
 * if (checkWallCollision(enemy.position, wall)) {
 *   // Change direction
 * }
 */
export function checkWallCollision(position: Vector2, wall: Rect2D): boolean {
	return (
		position.x >= wall.x &&
		position.x <= wall.x + wall.width &&
		position.y >= wall.y &&
		position.y <= wall.y + wall.height
	);
}

/**
 * Calculate reflection vector for wall collision
 * @example
 * // Reflect enemy movement off wall
 * if (checkWallCollision(enemy.position, wall)) {
 *   enemy.direction = reflectMovement(enemy.position, enemy.direction, wall);
 * }
 */
export function reflectMovement(position: Vector2, direction: Vector2, wall: Rect2D): Vector2 {
	const normal = getNormalToWall(position, wall);
	const dot = direction.x * normal.x + direction.y * normal.y;
	return new Vector2(direction.x - 2 * dot * normal.x, direction.y - 2 * dot * normal.y);
}

/**
 * Get normal vector to wall surface
 * Used for reflection calculations
 */
function getNormalToWall(position: Vector2, wall: Rect2D): Vector2 {
	const centerX = wall.x + wall.width / 2;
	const centerY = wall.y + wall.height / 2;

	const dx = position.x - centerX;
	const dy = position.y - centerY;

	if (Math.abs(dx) >= Math.abs(dy)) {
		return new Vector2(Math.sign(dx), 0);
	} else {
		return new Vector2(0, Math.sign(dy));
	}
}

/**
 * Convert radians to degrees
 * @example
 * // Convert rotation for UI display
 * const displayAngle = radToDeg(entity.rotation);
 */
export function radToDeg(rad: number): number {
	return (rad * 180) / Math.PI;
}

/**
 * Convert degrees to radians
 * @example
 * // Convert input angle to radians
 * const rotationRad = degToRad(45); // 45 degrees to radians
 */
export function degToRad(deg: number): number {
	return (deg * Math.PI) / 180;
}

/**
 * Calculate velocity vector from speed and direction
 * @example
 * // Set entity velocity
 * const speed = 5;
 * const direction = getDirectionFromAngle(angle);
 * const velocity = calculateVelocity(speed, direction);
 */
export function calculateVelocity(speed: number, direction: Vector2): Vector2 {
	return direction.multiply(speed);
}

/**
 * Calculate movement vector for seeking behavior
 * @example
 * // Implement enemy seeking behavior
 * const seekForce = seek(enemy.position, enemy.velocity, target.position, maxSpeed);
 * enemy.velocity = enemy.velocity.add(seekForce);
 */
export function seek(
	position: Vector2,
	currentVelocity: Vector2,
	targetPosition: Vector2,
	maxSpeed: number
): Vector2 {
	const desired = targetPosition.subtract(position).normalize().multiply(maxSpeed);
	return desired.subtract(currentVelocity);
}

/**
 * Calculate bezier curve point
 * @example
 * // Create curved projectile path
 * const t = timeElapsed / duration;
 * const curvePoint = bezierPoint(startPos, controlPoint, endPos, t);
 */
export function bezierPoint(start: Vector2, control: Vector2, end: Vector2, t: number): Vector2 {
	const oneMinusT = 1 - t;
	return new Vector2(
		oneMinusT * oneMinusT * start.x + 2 * oneMinusT * t * control.x + t * t * end.x,
		oneMinusT * oneMinusT * start.y + 2 * oneMinusT * t * control.y + t * t * end.y
	);
}

/**
 * Генерирует случайное число в диапазоне [min, max]
 * @param {number} min - Минимальное значение
 * @param {number} max - Максимальное значение
 * @returns {number} Случайное число
 */
export function random(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
