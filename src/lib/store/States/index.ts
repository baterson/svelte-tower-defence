import * as EnemyStates from './Enemy/';
import * as TowerStates from './Tower/';
import * as ProjectileStates from './Projectile';
import * as ThroneStates from './Throne/';
import * as LootStates from './Loot/';
import * as BossStates from './Enemy/boss/';
import * as DebugStates from './Debug/index';

export const initState = (stateMachine, entityType, name, stateContext = {}) => {
	let State;

	if (entityType === 'enemy') {
		State = { ...EnemyStates, ...BossStates }[name];
	} else if (entityType === 'tower') {
		State = TowerStates[name];
	} else if (entityType === 'projectile') {
		State = ProjectileStates[name];
	} else if (entityType === 'throne') {
		State = ThroneStates[name];
	} else if (entityType === 'loot') {
		State = LootStates[name];
	} else if (entityType === 'debug') {
		State = DebugStates[name];
	}

	if (!State) {
		throw new Error(
			`Invalid entity type: ${entityType} with name ${name}. Check if Initial state is defined`
		);
	}

	return new State(stateMachine, stateContext);
};
