import { initState } from '$lib/store/States';

export class StateMachine {
	states = $state([]);
	currentState = $state();

	constructor(owner, states, initialState, onEnter, stateContext = {}) {
		this.owner = owner;
		this.states = states;
		this.currentState = initState(this, owner.type, initialState, stateContext);
		this.onEnter = onEnter;

		this.onEnter(initialState);
	}

	update(deltaTime, entityManager) {
		this.currentState.update(deltaTime, this.owner, entityManager);
	}

	setState(name, stateContext = {}) {
		if (name === this.currentState.name) return;

		this.onEnter(name);
		this.currentState = initState(this, this.owner.type, name, stateContext);
	}
}
