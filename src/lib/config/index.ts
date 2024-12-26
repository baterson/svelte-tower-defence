import type { EntityConfig } from './entities';
import { entities } from './entities';

export const getConfig = (name: string): EntityConfig => {
	if (!entities[name]) throw new Error(`Entity config not found for: ${name}`);
	return entities[name];
};
