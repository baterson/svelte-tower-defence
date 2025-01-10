<script>
	import { onMount } from 'svelte';
	import { cursor } from '$lib/store/Cursor.svelte';

	// let mounted = false;

	// // Ensure the body cursor updates reactively
	// $effect(() => {
	// 	if (mounted) {
	// 		document.body.style.cursor = `url('${cursor.image}'), auto`;
	// 		console.log('cursor.image', cursor.image);
	// 	}
	// });

	// onMount(() => {
	// 	mounted = true;
	// 	document.body.style.cursor = `url('${cursor.image}'), auto`;
	// });
	$effect(() => {
		console.log('var(--cursor-image)', cursor.image);

		document.body.style.cursor = `url('${cursor.image}'), auto`;
	});
</script>

<style>
	:global(body) {
		cursor: var(--cursor-image, url('/cursor-arrow.svg'), auto) !important;
	}
</style>
