<script>
	// Здесь можно добавить пропсы, если хотите, например,
</script>

<div class="synthwave-grid"></div>

<style>
	.synthwave-grid {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(transparent 0%, rgba(255, 0, 128, 0.6) 2%, transparent 3%),
			linear-gradient(90deg, transparent 0%, rgba(255, 0, 128, 0.6) 2%, transparent 3%);
		background-size: 30px 30px;
		transform: perspective(500px) rotateX(60deg);
		transform-origin: top center;

		animation: grid-move 10s linear infinite;
	}

	@keyframes grid-move {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 0 40px;
		}
	}
</style>
