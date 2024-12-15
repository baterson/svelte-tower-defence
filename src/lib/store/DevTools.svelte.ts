export class DevTools {
	isWallsVisible = $state(false);
	debugEntity = $state(null);

	toggleWalls = () => {
		this.isWallsVisible = !this.isWallsVisible;
	};

	inspectEntity = (entity) => {
		this.debugEntity = entity;
	};
}

export const devTools = new DevTools();
