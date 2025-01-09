export class Managers {
	managers = $state({});

	setup = (managers: any) => {
		this.managers = managers;
	};

	update = (deltaTime: number) => {
		this.managers.uiManager.update();
		this.managers.background.update(deltaTime);
		this.managers.stageManager.update(deltaTime);
		this.managers.entityManager.update(deltaTime);
		this.managers.collisionManager.update();
	};

	get = (name: string | string[]) => {
		if (typeof name === 'string') {
			return this.managers[name];
		}
		return name.reduce((acc, n) => {
			acc[n] = this.managers[n];
			return acc;
		}, {});
	};
}

export const managers = new Managers();
