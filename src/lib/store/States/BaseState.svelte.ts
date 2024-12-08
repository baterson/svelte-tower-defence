import type { Entity } from '$store/Entity.svelte';
import type { EntityPool } from '$store/EntityPool.svelte';

export class BaseState {
	context = $state();
	stateMachine = $state();

	constructor(stateMachine, context = {}) {
		this.stateMachine = stateMachine;
		this.context = context;
	}

	update(deltaTime: number, entity: Entity, entityPool: EntityPool) {}
}
