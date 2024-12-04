export { Run } from './Run.svelte';
export { Shoot } from './Shoot.svelte';
export { Die } from './Die.svelte';
export { Idle } from './Idle.svelte';

const resolveCollision = (enemy, other) => {
	enemy.stats.health -= 30;
	if (enemy.stats.health < 0) {
		enemy.state.setState('Die');
	}
};
