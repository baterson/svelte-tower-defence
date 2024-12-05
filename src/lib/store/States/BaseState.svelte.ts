export class BaseState {
	context = $state();
	transitioning = $state(false);

	constructor(stateMachine, context = {}) {
		this.stateMachine = stateMachine;
		this.transitioning = false;
		this.context = context;
	}

	update(deltaTime) {}
}
