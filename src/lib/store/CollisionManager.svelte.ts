/**
 * Collision System Documentation
 *
 * This system uses Separating Axis Theorem (SAT) for collision detection
 * between rotated rectangular shapes. Here's how it works:
 *
 * Example 1: Rotated Tower and Enemy
 * ```
 * Tower (static)         Enemy (moving)
 *    /‾‾‾\                  /‾‾‾\
 *   |     |     -->        |     |
 *    \___/                  \___/
 *
 * 1. Get vertices of both shapes considering rotation
 * 2. Get normals (perpendicular vectors) from the edges
 * 3. Project vertices onto each normal
 * 4. If there's a gap in ANY projection, no collision
 * ```
 *
 * Example 2: Projectile and Target
 * ```
 * Projectile    Target
 *   -->[]      |¯¯¯¯|
 *              |    |
 *              |____|
 *
 * 1. Only check collision if projectile.target.type matches target.type
 * 2. Use SAT for precise collision even with rotation
 * ```
 */

// math.ts
import { Vector2 } from './Vector2.svelte';

/**
 * Get vertices of a rotated rectangle
 * @example
 * const entity = { width: 50, height: 30, rotation: Math.PI/4 }
 * const vertices = getRotatedRectVertices(entity)
 * // Returns 4 Vector2 points of rotated rectangle corners
 */
export function getRotatedRectVertices(
	position: Vector2,
	width: number,
	height: number,
	rotation: number
): Vector2[] {
	const halfWidth = width / 2;
	const halfHeight = height / 2;

	// Start with vertices at origin
	const vertices = [
		new Vector2(-halfWidth, -halfHeight),
		new Vector2(halfWidth, -halfHeight),
		new Vector2(halfWidth, halfHeight),
		new Vector2(-halfWidth, halfHeight)
	];

	// Rotate and translate vertices
	return vertices.map((vertex) => {
		const rotated = new Vector2(
			vertex.x * Math.cos(rotation) - vertex.y * Math.sin(rotation),
			vertex.x * Math.sin(rotation) + vertex.y * Math.cos(rotation)
		);
		return rotated.add(position);
	});
}

/**
 * Get normal vectors for rectangle edges
 * @example
 * const normals = getNormals(vertices)
 * // Returns array of Vector2 normals perpendicular to each edge
 */
export function getNormals(vertices: Vector2[]): Vector2[] {
	const normals: Vector2[] = [];

	for (let i = 0; i < vertices.length; i++) {
		const current = vertices[i];
		const next = vertices[(i + 1) % vertices.length];
		const edge = next.subtract(current);
		normals.push(new Vector2(-edge.y, edge.x).normalize());
	}

	return normals;
}

/**
 * Project vertices onto an axis using dot product
 * @example
 * const axis = new Vector2(1, 0)  // Project onto x-axis
 * const projection = projectOntoAxis(vertices, axis)
 * // Returns { min: lowest projection, max: highest projection }
 */
export function projectOntoAxis(vertices: Vector2[], axis: Vector2): { min: number; max: number } {
	const dots = vertices.map((vertex) => vertex.dot(axis));
	return {
		min: Math.min(...dots),
		max: Math.max(...dots)
	};
}

// CollisionManager.ts
interface CollisionGroup {
	type: string;
	canCollideWith: string[];
}

export class CollisionManager {
	private collisionGroups: CollisionGroup[] = [
		{ type: 'tower', canCollideWith: ['enemy', 'projectile'] },
		{ type: 'enemy', canCollideWith: ['tower', 'projectile'] },
		{ type: 'projectile', canCollideWith: ['tower', 'enemy'] }
	];

	/**
	 * Check if two entities can collide based on their types
	 * @example
	 * // Tower projectile hitting enemy
	 * canCollide(projectile, enemy) // true if projectile.target.type === 'enemy'
	 *
	 * // Enemy projectile hitting tower
	 * canCollide(projectile, tower) // true if projectile.target.type === 'tower'
	 */
	private canCollide(entity1: Entity, entity2: Entity): boolean {
		if (entity1.type === 'projectile') {
			return entity2.type === entity1.target?.type;
		}
		if (entity2.type === 'projectile') {
			return entity1.type === entity2.target?.type;
		}

		const group = this.collisionGroups.find((g) => g.type === entity1.type);
		return group?.canCollideWith.includes(entity2.type) ?? false;
	}

	/**
	 * Check collision between two entities using SAT
	 * @example
	 * // Check if enemy hits tower
	 * checkCollision(enemy, tower)
	 * // Returns true if shapes overlap, considering rotation
	 */
	checkCollision(entity1: Entity, entity2: Entity): boolean {
		// if (!this.canCollide(entity1, entity2)) return false;

		const box1 = entity1.getBoundingBox();
		const box2 = entity2.getBoundingBox();

		const vertices1 = getRotatedRectVertices(
			new Vector2(box1.x, box1.y),
			box1.width,
			box1.height,
			box1.rotation
		);

		const vertices2 = getRotatedRectVertices(
			new Vector2(box2.x, box2.y),
			box2.width,
			box2.height,
			box2.rotation
		);

		const normals = [...getNormals(vertices1), ...getNormals(vertices2)];

		for (const normal of normals) {
			const projection1 = projectOntoAxis(vertices1, normal);
			const projection2 = projectOntoAxis(vertices2, normal);

			if (projection1.max < projection2.min || projection2.max < projection1.min) {
				return false;
			}
		}

		return true;
	}

	/**
	 * Update all collisions in the game
	 * @example
	 * // In game loop:
	 * collisionManager.update(entities)
	 * // Checks all valid entity pairs for collisions
	 */
	update(entities: Entity[]): void {
		const dynamicEntities = entities.filter((e) => e.type !== 'tower');
		const allEntities = entities;

		for (const entity1 of dynamicEntities) {
			for (const entity2 of allEntities) {
				if (entity1 === entity2) continue;
				if (this.checkCollision(entity1, entity2)) {
					entity1.onCollide(entity2);
					entity2.onCollide(entity1);
				}
			}
		}
	}
}
