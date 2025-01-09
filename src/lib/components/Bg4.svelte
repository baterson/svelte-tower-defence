<div class="bg-container">
	<div class="quantum-base"></div>
	<div class="energy-fields"></div>
	<div class="quantum-grid"></div>
	<div class="stars"></div>
</div>

<style>
	.bg-container {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: radial-gradient(circle, rgba(0, 20, 40, 0.8), rgba(0, 5, 15, 1));
		z-index: 0;
	}

	.quantum-base {
		position: absolute;
		inset: 0;
		background: radial-gradient(circle at center, #200030 0%, #100020 50%, #0a0014 100%);
		z-index: 1;
	}

	.energy-fields {
		position: absolute;
		inset: 0;
		z-index: 2;
		background: repeating-radial-gradient(
			circle at 50% 50%,
			rgba(255, 0, 255, 0.1) 0%,
			transparent 10%,
			rgba(255, 0, 255, 0.1) 20%
		);
		filter: blur(10px);
	}

	.quantum-grid {
		position: absolute;
		inset: 0;
		z-index: 3;
		background-image: linear-gradient(rgba(157, 0, 255, 0.1) 1px, transparent 1px),
			linear-gradient(90deg, rgba(157, 0, 255, 0.1) 1px, transparent 1px);
		background-size: 40px 40px;
		opacity: 0.3;
		animation: grid-drift 20s linear infinite;
	}

	.stars {
		position: absolute;
		inset: 0;
		z-index: 4;
		background-image: radial-gradient(2px 2px at 10% 20%, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0)),
			radial-gradient(2px 2px at 40% 70%, rgba(255, 255, 255, 0.9), rgba(0, 0, 0, 0)),
			radial-gradient(1.5px 1.5px at 50% 40%, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
			radial-gradient(1.5px 1.5px at 80% 30%, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 20% 80%, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 70% 50%, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0)),
			radial-gradient(1px 1px at 90% 90%, rgba(255, 255, 255, 0.7), rgba(0, 0, 0, 0));
		background-repeat: repeat;
		background-size:
			200px 200px,
			250px 250px,
			150px 150px;
		animation: twinkle 4s ease-in-out infinite alternate;
	}

	@keyframes grid-drift {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 40px 40px;
		}
	}

	@keyframes twinkle {
		0% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.8;
		}
	}
</style>
