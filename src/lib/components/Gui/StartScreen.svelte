<script>
	import { fade } from 'svelte/transition';
	import Button from './Button.svelte';
	import MenuLayout from './MenuLayout.svelte';

	const { onStart } = $props();
</script>

<MenuLayout>
	<div class="content" out:fade={{ duration: 300 }}>
		<div class="title">
			<h1>Welcome to the game!</h1>
		</div>
		<div class="buttons-container">
			<Button text="Start Game" onclick={onStart} />
		</div>
	</div>
</MenuLayout>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		height: 100%;
	}
	.title {
		color: #fff;
		font-size: 2rem;
		font-weight: bold;
		text-align: center;
	}
	@media (max-width: 768px) {
		.title {
			font-size: 1.5rem;
		}
	}
</style>
