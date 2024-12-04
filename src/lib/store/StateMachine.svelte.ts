import { initState } from '$lib/store/States';

export class StateMachine {
	states = $state([]);
	currentState = $state();

	constructor(owner, states, initialState, onEnter) {
		this.owner = owner;
		this.states = states;
		this.currentState = initState(owner.type, initialState, this.states[initialState]);
		this.onEnter = onEnter;

		this.onEnter(initialState);
	}

	update(deltaTime, entityPool) {
		this.currentState.update(deltaTime, this.owner, entityPool);
	}

	setState(name) {
		if (name === this.currentState.name) return;

		this.onEnter(name);
		this.currentState = initState(this.owner.type, name);
	}
}
