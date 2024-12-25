export class Background {
	base = $state('/background/BlueNebula/Blue_Nebula_01.png');
	stars = $state('/Star_background.png');

	baseLayer1Position = $state(0);
	baseLayer2Position = $state(0);
	starLayer1Position = $state(0);
	starLayer2Position = $state(0);
	layerHeight = $state(0);

	starSpeed = $state(0.5);
	baseSpeed = $state(0.1); // Much slower than star speed

	constructor() {
		this.setBase('/background/BlueNebula/Blue_Nebula_01.png');
		this.setStars('/Star_background.png');
		this.setSpeed(0.5);
	}

	update(deltaTime: number) {
		// Update star layers
		this.starLayer1Position =
			(this.starLayer1Position + this.starSpeed * (deltaTime / 16)) % this.layerHeight;
		this.starLayer2Position =
			(this.starLayer2Position + this.starSpeed * (deltaTime / 16)) % this.layerHeight;

		// Update base layers
		this.baseLayer1Position =
			(this.baseLayer1Position + this.baseSpeed * (deltaTime / 16)) % this.layerHeight;
		this.baseLayer2Position =
			(this.baseLayer2Position + this.baseSpeed * (deltaTime / 16)) % this.layerHeight;

		// Reset star positions for infinite scroll
		if (this.starLayer1Position >= this.layerHeight) {
			this.starLayer1Position = this.starLayer2Position - this.layerHeight;
		}
		if (this.starLayer2Position >= this.layerHeight) {
			this.starLayer2Position = this.starLayer1Position - this.layerHeight;
		}

		// Reset base positions for infinite scroll
		if (this.baseLayer1Position >= this.layerHeight) {
			this.baseLayer1Position = this.baseLayer2Position - this.layerHeight;
		}
		if (this.baseLayer2Position >= this.layerHeight) {
			this.baseLayer2Position = this.baseLayer1Position - this.layerHeight;
		}
	}

	updateDimensions(width: number, height: number) {
		this.layerHeight = height * 2;

		// Reset all layer positions
		this.starLayer1Position = 0;
		this.starLayer2Position = -this.layerHeight;
		this.baseLayer1Position = 0;
		this.baseLayer2Position = -this.layerHeight;
	}

	setBase(base: string) {
		this.base = base;
	}

	setStars(stars: string) {
		this.stars = stars;
	}

	setSpeed(speed: number) {
		this.starSpeed = speed;
		this.baseSpeed = speed * 0.2; // Base moves at 20% of star speed
	}
}
