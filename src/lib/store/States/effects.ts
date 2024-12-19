import { Vector2 } from '$store/Vector2.svelte';

export const handleScreenChange = (node, entity) => {
	if (!node) return;
	if (node.offsetLeft === entity.position.x && node.offsetTop === entity.position.y) return;

	// console.log('node.offsetLeft', node.offsetLeft, node.offsetTop);

	// console.log('entity type', entity.type);
	// console.log('entity position', entity.position.x, entity.position.y);

	entity.position = new Vector2(node.offsetLeft, node.offsetTop);

	// console.log('entity position', entity.position.x, entity.position.y);
};
