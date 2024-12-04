/**
 * math.ts
 * Mathematical and trigonometric utility functions for the tower defense game
 */

import { Vector2 } from '../store/Vector2.svelte';

/**
 * Calculate distance between two points
 */
export function distance(point1: Vector2, point2: Vector2): number {
	const dx = point2.x - point1.x;
	const dy = point2.y - point1.y;
	return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Calculate angle between two points in radians
 */
export function angleBetweenPoints(point1: Vector2, point2: Vector2): number {
	return Math.atan2(point2.y - point1.y, point2.x - point1.x);
}

/**
 * Get direction vector from angle
 */
export function getDirectionFromAngle(angle: number): Vector2 {
	return new Vector2(Math.cos(angle), Math.sin(angle));
}

/**
 * Linear interpolation between two numbers
 */
export function lerp(start: number, end: number, t: number): number {
	return start + (end - start) * t;
}

/**
 * Find nearest entity from a list based on position
 */
export function findNearestEntity<T extends { position: Vector2 }>(
	source: Vector2,
	entities: T[]
): T | null {
	if (!entities.length) return null;

	let nearest = entities[0];
	let minDistance = distance(source, nearest.position);

	for (const entity of entities) {
		const dist = distance(source, entity.position);
		if (dist < minDistance) {
			minDistance = dist;
			nearest = entity;
		}
	}

	return nearest;
}

export function calculateLaserEndPoint(start: any, end: any, maxLength: number): any {
	const currentDistance = distance(start, end);
	const angle = angleBetweenPoints(start, end);

	// If distance is less than maxLength, return actual end point
	if (currentDistance <= maxLength) {
		return end;
	}

	// Calculate point at maxLength distance
	return {
		x: start.x + Math.cos(angle) * maxLength,
		y: start.y + Math.sin(angle) * maxLength
	};
}

export function radiansToDegrees(radians: number): number {
	return radians * (180 / Math.PI);
}

export function degreesToRadians(degrees: number): number {
	return degrees * (Math.PI / 180);
}

export function getNextWaypoint(
	currentPos: Vector2,
	path: Vector2[],
	threshold: number = 10
): Vector2 | null {
	for (const point of path) {
		if (distance(currentPos, point) > threshold) {
			return point;
		}
	}
	return null;
}

/**
 * Get direction to target
 */
export function getDirectionToTarget(current: Vector2, target: Vector2): Vector2 {
	const dx = target.x - current.x;
	const dy = target.y - current.y;
	const magnitude = Math.sqrt(dx * dx + dy * dy);

	if (magnitude === 0) return new Vector2(0, 0);

	return new Vector2(dx / magnitude, dy / magnitude);
}

/**
 * Check if point reached target within threshold
 */
export function hasReachedTarget(
	current: Vector2,
	target: Vector2,
	threshold: number = 10
): boolean {
	return distance(current, target) <= threshold;
}

/**
 * Get random spawn position
 */
export function getRandomSpawnPosition(spawnPoints: Vector2[]): Vector2 {
	const randomIndex = Math.floor(Math.random() * spawnPoints.length);
	const spawn = spawnPoints[randomIndex];
	return new Vector2(spawn.x, spawn.y);
}

/**
 * Math utilities for game calculations
 * @module math
 */
export function follow(entity: Vector2, target: Vector2): Vector2 {
	const dx = target.x - entity.x;
	const dy = target.y - entity.y;
	const distance = Math.sqrt(dx * dx + dy * dy);

	if (distance === 0) return new Vector2(0, 0);

	return new Vector2(dx / distance, dy / distance);
}

/**
 * Check collision with invisible wall
 */
export function checkWallCollision(position: Vector2, wall: Wall): boolean {
	return (
		position.x >= wall.x &&
		position.x <= wall.x + wall.width &&
		position.y >= wall.y &&
		position.y <= wall.y + wall.height
	);
}

/**
 * Reflect entity movement based on wall collision
 * Изменяет направление движения при столкновении со стеной
 */
export function reflectMovement(position: Vector2, currentDirection: Vector2, wall: Wall): Vector2 {
	// Базовое отражение - просто разворачиваем по X в зависимости от стороны стены
	const reflectedDirection = new Vector2(
		wall.side === 'left' ? Math.abs(currentDirection.x) : -Math.abs(currentDirection.x),
		currentDirection.y
	);

	return reflectedDirection;
}
