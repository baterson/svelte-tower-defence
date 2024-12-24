import { getConfig } from '$lib/config/entitiyConfig';
import { Entity } from './Entity.svelte';
import type { Vector2 } from './Vector2.svelte';

export const initEntity = (name: string, position: Vector2, stateContext = {}) => {
	const { context = {}, ...config } = getConfig(name);
	return new Entity(name, position.clone(), config, { ...stateContext, ...context });
};
