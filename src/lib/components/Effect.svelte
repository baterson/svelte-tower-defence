<script>
	import * as Effects from './Effects';

	const { name, entity } = $props();

	const EffectComponent = Effects[name];

	if (!EffectComponent) {
		throw new Error(`Effect with name ${name} not found for entity ${entity.name}`);
	}
</script>

<EffectComponent {entity} />
