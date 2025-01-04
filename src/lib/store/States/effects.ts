import { Vector2 } from '$lib/store/Vector2.svelte';

// todo: find a better place for this
export const handleScreenChange = (node, entity) => {
	if (!node) return;
	if (node.offsetLeft === entity.position.x && node.offsetTop === entity.position.y) return;

	entity.position = new Vector2(node.offsetLeft, node.offsetTop);
};
