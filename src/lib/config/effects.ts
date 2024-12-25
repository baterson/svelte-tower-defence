import type { Entity } from '$store/Entity.svelte';

export const onFire = (entity: Entity) => {
	entity.takeDamage(1);
};
