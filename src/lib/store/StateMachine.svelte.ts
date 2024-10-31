import { initState } from '$lib/store/States';

export class StateMachine {
	states = $state({});
	currentState = $state();

	constructor(owner, states, initialState) {
		this.owner = owner;
		this.states = states;
		this.currentState = initState(initialState, this.states[initialState]);
	}

	update(deltaTime) {
		this.currentState.update(deltaTime, this.owner);
	}

	setState(name) {
		this.currentState = initState(name, this.states[name]);
	}
}
