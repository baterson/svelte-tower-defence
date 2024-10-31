import { BaseState } from './BaseState.svelte';

export class Shoot extends BaseState {
	update(deltaTime: any, owner: any): void {
		this.sprite.update(deltaTime);
		if (this.sprite.isAnimationComplete) {
			owner.state.setState('run');
		}
	}
}
