export class Collider {
	height = $state();
	width = $state();
	position = $state();

	constructor({ height, width, position }) {
		this.height = height;
		this.width = width;
		this.position = position;
	}

	checkCollision(other): boolean {
		const bounds = this.getBoundingBox();
		const otherBounds = other.getBoundingBox();

		return (
			bounds.left < otherBounds.right &&
			bounds.right > otherBounds.left &&
			bounds.top < otherBounds.bottom &&
			bounds.bottom > otherBounds.top
		);
	}

	getBoundingBox() {
		return {
			left: this.position.x,
			right: this.position.x + this.width,
			top: this.position.y,
			bottom: this.position.y + this.height
		};
	}
}
