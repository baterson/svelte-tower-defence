import type { Entity } from './Entities/Entity.svelte';
import { Vector2 } from './Vector2.svelte';

interface Bounds {
	left: number;
	right: number;
	top: number;
	bottom: number;
}

export class Collider {
	private entity: Entity;

	constructor(entity: Entity) {
		this.entity = entity;
	}

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

	getBounds(): Bounds {
		const position = this.entity.position;
		const width = this.entity.width;
		const height = this.entity.height;

		return {
			left: position.x,
			right: position.x + width,
			top: position.y,
			bottom: position.y + height
		};
	}

	containsPoint(point: Vector2): boolean {
		const bounds = this.getBounds();
		return (
			point.x >= bounds.left &&
			point.x <= bounds.right &&
			point.y >= bounds.top &&
			point.y <= bounds.bottom
		);
	}

	isInRange(other: Collider, range: number): boolean {
		const centerA = new Vector2(
			this.entity.position.x + this.entity.width / 2,
			this.entity.position.y + this.entity.height / 2
		);

		const centerB = new Vector2(
			other.entity.position.x + other.entity.width / 2,
			other.entity.position.y + other.entity.height / 2
		);

		return centerA.distance(centerB) <= range;
	}
}
