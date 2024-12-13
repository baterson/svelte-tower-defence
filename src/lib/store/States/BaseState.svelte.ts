export class BaseState {
	stateMachine = $state();

	constructor(stateMachine) {
		this.stateMachine = stateMachine;
	}

	update(deltaTime: number, entity) {}

	get name() {
		return this.constructor.name;
	}

	get entity() {
		return this.stateMachine.owner;
	}
}
