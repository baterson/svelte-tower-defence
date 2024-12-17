export class Background {
	base = $state('/background/BlueNebula/Blue_Nebula_01.png');
	stars = $state('/background/Starfields/Starfield_01.png');

	windowWidth = $state(0);
	windowHeight = $state(0);

	starLayer1Position = $state(0);
	starLayer2Position = $state(0);
	layerHeight = $state(0);

	starSpeed = $state(0.5);

	constructor(width: number, height: number) {
		this.updateDimensions(width, height);
		this.setBase('/background/BlueNebula/Blue_Nebula_01.png');
		this.setStars('/background/Starfields/Starfield_01.png');
		this.setSpeed(0.5);
	}

	updateDimensions(width: number, height: number) {
		this.windowWidth = width;
		this.windowHeight = height;
		this.layerHeight = height * 2; // Double the height for seamless scrolling

		// Reset positions with new dimensions
		this.starLayer1Position = 0;
		this.starLayer2Position = -this.layerHeight;
	}

	update(deltaTime: number) {
		// Calculate movement based on layer height
		this.starLayer1Position =
			(this.starLayer1Position + this.starSpeed * (deltaTime / 16)) % this.layerHeight;
		this.starLayer2Position =
			(this.starLayer2Position + this.starSpeed * (deltaTime / 16)) % this.layerHeight;

		// Reset positions for infinite scroll
		if (this.starLayer1Position >= this.layerHeight) {
			this.starLayer1Position = this.starLayer2Position - this.layerHeight;
		}
		if (this.starLayer2Position >= this.layerHeight) {
			this.starLayer2Position = this.starLayer1Position - this.layerHeight;
		}
	}

	setBase(base: string) {
		this.base = base;
	}

	setStars(stars: string) {
		this.stars = stars;
	}

	setSpeed(speed: number) {
		this.starSpeed = speed;
	}
}
