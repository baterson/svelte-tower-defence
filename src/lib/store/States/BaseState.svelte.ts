export class BaseState {
	context = $state();
	stateMachine = $state();

	constructor(stateMachine, context = {}) {
		this.stateMachine = stateMachine;
		this.context = context;
	}

	update(deltaTime: number, entity, entityManager) {}

	get name() {
		return this.constructor.name;
	}
}
