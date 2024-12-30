<script>
	import * as Animations from './Animations';

	const { name, entity } = $props();

	// let AnimationComponent = $derived(Animations[name]);
	let AnimationComponent = $derived(Animations[name]);

	if (!AnimationComponent) {
		throw new Error(`Animation with name ${name} not found for entity ${entity.name}`);
	}
</script>

<AnimationComponent {entity} />
