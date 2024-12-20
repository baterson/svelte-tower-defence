export class Vector2 {
	x = $state(0);
	y = $state(0);

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	clone(): Vector2 {
		return new Vector2(this.x, this.y);
	}

	add(vector: Vector2): Vector2 {
		return new Vector2(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector: Vector2): Vector2 {
		return new Vector2(this.x - vector.x, this.y - vector.y);
	}

	multiply(scalar: number): Vector2 {
		return new Vector2(this.x * scalar, this.y * scalar);
	}

	magnitude(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	normalize(): Vector2 {
		const mag = this.magnitude();
		return mag ? new Vector2(this.x / mag, this.y / mag) : new Vector2();
	}

	distance(vector: Vector2): number {
		return this.subtract(vector).magnitude();
	}

	dot(vector: Vector2): number {
		return this.x * vector.x + this.y * vector.y;
	}

	rotate(angle: number): Vector2 {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);
		return new Vector2(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	}
}
