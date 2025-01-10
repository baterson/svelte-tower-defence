import type { Entity } from '$lib/store/Entity.svelte';
import { lootTracker } from '$lib/store/LootTracker.svelte';
import { managers } from '$lib/store/managers.svelte';

export const enemyCollider = (entity: Entity, other: Entity) => {
	entity.takeDamage(other.stats.damage);
};

export const fireballCollider = (fireball, other) => {
	fireball.state.setState('Explode');
};

export const projectileCollider = (projectile, other) => {
	if (other === 'OUT_OF_BOUNDS') {
		projectile.stopInteractions();
		managers.get('entityManager').destroy(entity.id);
	} else {
		projectile.state.setState('Explode');
	}

	return;
};

export const throneCollider = (entity, other) => {
	if (other.type === 'loot') {
		lootTracker.receiveLoot(2);
		managers.get('soundManager').play('pickUp');
	} else if (other.type === 'enemy') {
		entity.takeDamage(other.stats.damage);
	}

	return;
};

export const lootCollider = (entity, other) => {
	entity.stopInteractions();
	managers.get('entityManager').destroy(entity.id);
};
