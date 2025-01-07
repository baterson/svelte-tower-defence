import { Vector2 } from '$lib/store/Vector2.svelte';

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

// In math.ts, add only these new functions

function getRotatedRectVertices(rect: Rect2D, angleInDegrees: number): Vector2[] {
	const centerX = (rect.x1 + rect.x2) / 2;
	const centerY = (rect.y1 + rect.y2) / 2;
	const width = rect.x2 - rect.x1;
	const height = rect.y2 - rect.y1;

	// We already have angleToTarget for radians conversion
	const angle = angleToTarget(
		new Vector2(0, 0),
		new Vector2(
			Math.cos((angleInDegrees * Math.PI) / 180),
			Math.sin((angleInDegrees * Math.PI) / 180)
		)
	);

	// We already have getDirectionFromAngle
	const direction = getDirectionFromAngle(angle);

	// Calculate vertices using existing Vector2 class
	return [
		new Vector2(-width / 2, -height / 2),
		new Vector2(width / 2, -height / 2),
		new Vector2(width / 2, height / 2),
		new Vector2(-width / 2, height / 2)
	].map((v) => {
		// Rotate using direction vector
		return new Vector2(
			v.x * direction.x - v.y * direction.y + centerX,
			v.x * direction.y + v.y * direction.x + centerY
		);
	});
}

// Add SAT collision check function
export function checkRotatedRectIntersection(
	rect1: Rect2D,
	angle1: number,
	rect2: Rect2D,
	angle2: number
): boolean {
	const vertices1 = getRotatedRectVertices(rect1, angle1);
	const vertices2 = getRotatedRectVertices(rect2, angle2);

	// Get edges as vectors using existing Vector2
	const edges = [
		...vertices1.map((v, i) => vertices1[(i + 1) % 4].subtract(v)),
		...vertices2.map((v, i) => vertices2[(i + 1) % 4].subtract(v))
	];

	// Test projections
	for (const edge of edges) {
		// Use existing normalizeVector
		const normal = normalizeVector(new Vector2(0, 0), new Vector2(-edge.y, edge.x));

		// Use Vector2's dot product
		const proj1 = vertices1.map((v) => v.dot(normal));
		const proj2 = vertices2.map((v) => v.dot(normal));

		const min1 = Math.min(...proj1);
		const max1 = Math.max(...proj1);
		const min2 = Math.min(...proj2);
		const max2 = Math.max(...proj2);

		if (max1 < min2 || max2 < min1) {
			return false;
		}
	}

	return true;
}

export const boundingBoxFromPoint = (point: Vector2, width: number, height: number): Rect2D => {
	return {
		x1: point.x - width / 2,
		y1: point.y - height / 2,
		x2: point.x + width / 2,
		y2: point.y + height / 2,
		center: new Vector2(point.x, point.y),
		topMiddle: new Vector2(point.x + width / 2, point.y)
	};
};
