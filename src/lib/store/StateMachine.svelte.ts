import { initState } from '$lib/store/States';

export class StateMachine {
	currentState = $state();
	context = $state();

	constructor({ owner, initialState, onEnter, context = {} }) {
		this.owner = owner;
		this.onEnter = onEnter;
		this.context = context;

		this.currentState = initState(this, owner.type, initialState, context);
		this.onEnter(initialState);
	}

	update(deltaTime, entityManager) {
		this.currentState.update(deltaTime, this.owner, entityManager);
	}

	setState(name, stateContext = {}) {
		if (name === this.currentState.name) return;

		this.onEnter(name);
		this.context = { ...this.context, ...stateContext };
		this.currentState = initState(this, this.owner.type, name, stateContext);
	}
}
