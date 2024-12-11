// src/lib/core/Collider.ts
/**
 * Entity collision detection and resolution
 * @module Collider
 */

import { Entity } from './Entity.svelte';
import { Vector2 } from './Vector2.svelte';

interface Bounds {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

type CollisionHandler = (entity: Entity, other: Entity) => boolean;

export class Collider {
	private entity: Entity;
	private onCollision: CollisionHandler;

	constructor(entity: Entity, onCollision: CollisionHandler) {
		this.entity = entity;
		this.onCollision = onCollision;
	}

	/**
	 * Resolve collision between two entities using collision handler
	 */
	resolveCollision(other: Collider): boolean {
		return this.onCollision(this.entity, other.entity);
	}

	/**
	 * Check for rectangular collision between two entities
	 */
	checkCollision(other: Collider): boolean {
		const bounds = this.getBounds();
		const otherBounds = other.getBounds();

		return (
			bounds.left < otherBounds.right &&
			bounds.right > otherBounds.left &&
			bounds.top < otherBounds.bottom &&
			bounds.bottom > otherBounds.top
		);
	}

	/**
	 * Get entity bounding box
	 */
	getBounds(): Bounds {
		const { position, width, height } = this.entity;

		return {
			left: position.x,
			right: position.x + width,
			top: position.y,
			bottom: position.y + height
		};
	}

	/**
	 * Check if point is inside entity bounds
	 */
	containsPoint(point: Vector2): boolean {
		const bounds = this.getBounds();
		return (
			point.x >= bounds.left &&
			point.x <= bounds.right &&
			point.y >= bounds.top &&
			point.y <= bounds.bottom
		);
	}

	/**
	 * Check if other entity is within specified range
	 */
	isInRange(other: Collider, range: number): boolean {
		const bounds = this.getBounds();
		const otherBounds = other.getBounds();

		const centerA = new Vector2(
			bounds.left + (bounds.right - bounds.left) / 2,
			bounds.top + (bounds.bottom - bounds.top) / 2
		);

		const centerB = new Vector2(
			otherBounds.left + (otherBounds.right - otherBounds.left) / 2,
			otherBounds.top + (otherBounds.bottom - otherBounds.top) / 2
		);

		return centerA.distance(centerB) <= range;
	}
}
