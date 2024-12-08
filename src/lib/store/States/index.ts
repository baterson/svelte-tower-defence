import * as EnemyStates from './Enemy/';
import * as TowerStates from './Tower/';
import * as ProjectileStates from './Projectile';
import * as ThroneStates from './Throne/';

export const initState = (stateMachine, entityType, name, stateContext = {}) => {
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

	if (!State) {
		throw new Error(`Invalid entity type: ${entityType} with name ${name}`);
	}

	console.log('State', State);

	return new State(stateMachine, stateContext);
};
