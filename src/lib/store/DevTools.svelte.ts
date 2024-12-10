export class DevTools {
	isWallsVisible = $state(false);

	toggleWalls = () => {
		this.isWallsVisible = !this.isWallsVisible;
	};
}

export const devTools = new DevTools();
