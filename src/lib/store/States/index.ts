import * as EnemyStates from './Enemy/';
import * as TowerStates from './Tower/';
import * as ProjectileStates from './Projectile';
import * as ThroneStates from './Throne/';

export const initState = (entityType, name) => {
	let State;

	if (entityType === 'enemy') {
		State = EnemyStates[name];
	} else if (entityType === 'tower') {
		State = TowerStates[name];
	} else if (entityType === 'projectile') {
		State = ProjectileStates[name];
	} else if (entityType === 'throne') {
		State = ThroneStates[name];
	}

	return new State();
};
