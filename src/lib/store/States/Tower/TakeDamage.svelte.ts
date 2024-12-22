import { BaseState } from '$lib/store/States/BaseState.svelte';
import { gameLoop } from '$store/GameLoop.svelte';

export class TakeDamage extends BaseState {
	constructor(stateMachine) {
		super(stateMachine);
		this.cdId = gameLoop.setCD(1000, true);

		this.entity.addEffect('TakeDamage');
	}
	update(deltaTime: number, entity: any): void {
		if (gameLoop.isCDReady(this.cdId)) {
			this.entity.removeEffect('TakeDamage');
			this.stateMachine.setState('Guard');
		}
	}
}
