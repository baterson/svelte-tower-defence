<!-- laser -->
<script>
	import { neonLightTransition } from '../../transitions.js';
	const { entity } = $props();
</script>

<div
	class="laser-container"
	in:neonLightTransition={{ duration: 300 }}
	out:neonLightTransition={{ duration: 300 }}
	style="
		width: {entity.width * 4}px;
		height: {entity.height}px;
		transform: rotate({entity.rotation - 90}deg);
	"
>
	<!-- Core laser beam -->
	<div class="laser-beam">
		<div class="core" />
		<div class="glow" />
	</div>
</div>

<style>
	.laser-container {
		position: absolute;
		z-index: 99;
		transform-origin: left center;
		pointer-events: none;
	}

	.laser-beam {
		position: relative;
		width: 150px;
		height: 4px;
	}

	.core {
		position: absolute;
		width: 100%;
		height: 2px;
		background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%);
		top: 50%;
		transform: translateY(-50%);
		animation: pulse 1s ease-in-out infinite;
	}

	.glow {
		position: absolute;
		width: 100%;
		height: 2px;
		top: 50%;
		transform: translateY(-50%);
		filter: blur(4px);
		background: linear-gradient(90deg, #ff00ff 0%, #00ffff 100%);
		box-shadow:
			0 0 10px #ff00ff,
			0 0 20px #00ffff,
			0 0 30px #ff00ff;
		opacity: 0.6;
		animation: glow 1.5s ease-in-out infinite alternate;
	}
</style>
