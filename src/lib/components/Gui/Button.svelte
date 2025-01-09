<script>
	const { onclick, text = '' } = $props();
</script>

<button class="btn" {onclick}>{text}</button>

<style>
	.btn {
		position: relative;
		padding: 1rem 3rem;
		font-size: 1.3rem;
		color: #fff;
		background: #3b005f;
		border: 2px solid #ac82d4;
		border-radius: 10px;
		transition:
			background 0.3s ease,
			transform 0.3s ease;
		width: 100%;
		max-width: 300px;
		-webkit-tap-highlight-color: transparent;
		user-select: none;
		-webkit-touch-callout: none;
	}

	.btn:hover {
		background: #270139;
		transform: translateY(-2px);
	}

	@media (max-width: 768px) {
		.btn {
			padding: 0.8rem 2rem;
			font-size: 1.2rem;
		}
	}
</style>
