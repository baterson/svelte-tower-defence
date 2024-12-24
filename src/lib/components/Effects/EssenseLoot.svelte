<script>
	import { entityManager } from '$store/EntityManager.svelte';
	let { entity } = $props();

	const { target } = entity.state.context;
</script>

<!-- svelte-ignore element_invalid_self_closing_tag a11y_click_events_have_key_events, a11y_no_static_element_interactions (because of reasons) -->
<div
	class="essence css-essence"
	style:--start-x="{entity.position.x}px"
	style:--start-y="{entity.position.y}px"
	style:--end-x="{entityManager.throne.position.x}px"
	style:--end-y="{entityManager.throne.position.y}px"
/>

<style>
	.essence {
		position: absolute;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		background: radial-gradient(
			circle at 30% 30%,
			rgba(255, 255, 255, 0.8),
			rgba(123, 200, 255, 0.6) 40%,
			rgba(80, 150, 255, 0.4) 70%
		);
		pointer-events: none;
		filter: blur(1px);
		box-shadow: 0 0 15px rgba(123, 200, 255, 0.4);
	}

	.css-essence {
		animation:
			float ease-in-out infinite alternate,
			move-to-target 1s ease-in-out forwards infinite;
	}

	@keyframes float {
		from {
			transform: translate(var(--start-x), var(--start-y)) scale(1);
		}
		to {
			transform: translate(var(--start-x), calc(var(--start-y) - 10px)) scale(1.1);
		}
	}

	@keyframes move-to-target {
		0% {
			transform: translate(var(--start-x), var(--start-y)) scale(1);
			opacity: 1;
		}
		100% {
			transform: translate(var(--end-x), var(--end-y)) scale(0.2);
			opacity: 0;
		}
	}
</style>
