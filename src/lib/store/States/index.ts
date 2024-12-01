import { Idle } from './_old/Idle.svelte';
import { Run } from './_old/Run.svelte';
import { Shoot } from './_old/Shoot.svelte';
import * as EnemyStates from './EnemyStates.svelte';
import * as TowerStates from './TowerStates.svelte';
import * as ProjectileStates from './ProjectileStates.svelte';

export const states = {
	idle: Idle,
	run: Run,
	shoot: Shoot
};

export const initState = (entityType, name) => {
	let State;
	console.log(entityType, name);

	if (entityType === 'enemy') {
		State = EnemyStates[name];
	} else if (entityType === 'tower') {
		State = TowerStates[name];
	} else if (entityType === 'projectile') {
		State = ProjectileStates[name];
	}

	return new State();
};
