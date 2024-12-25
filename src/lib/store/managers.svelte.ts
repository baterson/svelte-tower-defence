export class Managers {
	managers = $state({});

	init = (managers: any) => {
		this.managers = managers;
	};

	update = (deltaTime: number) => {
		this.managers.uiManager.update();
		this.managers.background.update(deltaTime);
		this.managers.stageManager.update(deltaTime);
		this.managers.entityManager.update(deltaTime);
		this.managers.collisionManager.update();
	};

	getManager = (name: string) => {
		return this.managers[name];
	};
}

export const managers = new Managers();
