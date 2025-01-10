import { managers } from '$lib/store/managers.svelte';
import { BaseState } from '$lib/store/States/BaseState.svelte';

export class Die extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);

		managers.get('stageManager').gameOver('lose');
	}
}
