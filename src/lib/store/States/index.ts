import * as EnemyStates from './Enemy/';
import * as TowerStates from './Tower/';
import * as BossStates from './Enemy/boss/';
import * as CommonStates from './Common/';
import * as ProjectileStates from './Projectiles/';
export const initState = (stateMachine, entityType, name, stateContext = {}) => {
	let States = CommonStates;

	if (entityType === 'enemy') {
		States = { ...CommonStates, ...EnemyStates, ...BossStates };
	} else if (entityType === 'tower') {
		States = { ...CommonStates, ...TowerStates };
	} else if (entityType === 'projectile') {
		States = { ...CommonStates, ...ProjectileStates };
	}

	const State = States[name];

	if (!State) {
		throw new Error(`Invalid entity type: ${entityType} with name ${name}`);
	}

	return new State(stateMachine, stateContext);
};
