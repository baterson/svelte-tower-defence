<script>
	import { screen } from '$lib/store/Screen.svelte';
	import Entity from './Entity.svelte';
	import { Vector2 } from '$lib/store/Vector2.svelte';
	import HealthBar from '$lib/components/HealthBar.svelte';

	const { throne } = $props();

	$effect(() => {
		if (screen.isMobile) {
			throne.scale = 0.4;
		} else {
			throne.scale = 0.5;
		}
	});

	$effect(() => {
		const bottomMargin = screen.isMobile ? 250 : 300;

		const width = Number(screen.gameAreaWidth / 2 - throne.width / 2);
		const height = Number(screen.gameAreaHeight - bottomMargin);

		throne.position = new Vector2(width, height);
	});
</script>

<Entity entity={throne} --z-index={10}>
	<HealthBar entity={throne} />
</Entity>
