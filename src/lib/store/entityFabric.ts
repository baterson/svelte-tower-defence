import { getConfig } from '$lib/config/entitiyConfig';
import { Entity } from './Entity.svelte';

export const initEntity = (name, position, stateContext = {}) => {
	const { context = {}, ...config } = getConfig(name);

	const entity = new Entity(name, position.clone(), config, { ...stateContext, ...context });
	return entity;
};
