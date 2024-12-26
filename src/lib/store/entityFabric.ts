import { getConfig } from '$lib/config/';
import { Entity } from './Entity.svelte';

export const initEntity = (name, position, stateContext = {}) => {
	// State from config
	const { context = {}, ...config } = getConfig(name);
	// State Context overrides
	const { initialState, ...restContext } = stateContext;

	if (initialState) {
		config.initialState = initialState;
	}

	const entity = new Entity(name, position.clone(), config, { ...context, ...restContext });
	return entity;
};
