export class Screen {
	width = $state(0);
	height = $state(0);
	gameAreaWidth = $state(0);
	gameAreaHeight = $state(0);
	gameXOffset = $state(0);
	gameYOffset = $state(0);
	isMobile = $derived(this.width < 768);

	get screenBounds() {
		return {
			x1: 0,
			y1: 0,
			x2: this.width,
			y2: this.height
		};
	}

	get gameBoundingBox() {
		return {
			x1: this.gameXOffset,
			y1: this.gameYOffset,
			x2: this.width,
			y2: this.height
		};
	}
}

export const screen = new Screen();
