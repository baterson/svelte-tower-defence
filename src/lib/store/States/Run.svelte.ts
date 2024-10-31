import { BaseState } from './BaseState.svelte';

export class Run extends BaseState {
	update(deltaTime, owner) {
		this.sprite.update(deltaTime);
		owner.position.y += 1;
	}
}
