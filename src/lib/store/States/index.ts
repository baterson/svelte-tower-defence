import { Idle } from './Idle.svelte';
import { Run } from './Run.svelte';
import { Shoot } from './Shoot.svelte';

export const states = {
	idle: Idle,
	run: Run,
	shoot: Shoot
};

export const initState = (name, config) => {
	const State = states[name];
	return new State(config);
};
