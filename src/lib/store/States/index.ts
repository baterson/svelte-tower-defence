import * as EnemyStates from './Enemy/';
import * as TowerStates from './Tower/';
import * as ProjectileStates from './Projectiles/';
import * as ThroneStates from './Throne/';

export const initState = (stateMachine, entityType, name, stateContext = {}) => {
	let States = {};

	if (entityType === 'enemy') {
		States = EnemyStates;
	} else if (entityType === 'tower') {
		States = TowerStates;
	} else if (entityType === 'projectile') {
		States = ProjectileStates;
	} else if (entityType === 'throne') {
		States = ThroneStates;
	}

	const State = States[name];

	if (!State) {
		throw new Error(`Invalid entity type: ${entityType} with name ${name}`);
	}

	return new State(stateMachine, stateContext);
};
