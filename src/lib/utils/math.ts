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
