import type { Entity } from '$lib/store/Entity.svelte';

export const onFire = (entity: Entity) => {
	entity.takeDamage(1);
};
