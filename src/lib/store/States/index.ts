import * as EnemyStates from './Enemy/';
import * as TowerStates from './Tower/';
import * as ProjectileStates from './Projectile';
import * as ThroneStates from './Throne/';
import * as LootStates from './Loot/';

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
	} else if (entityType === 'loot') {
		State = LootStates[name];
	}

	if (!State) {
		throw new Error(`Invalid entity type: ${entityType} with name ${name}`);
	}

	return new State(stateMachine, stateContext);
};
