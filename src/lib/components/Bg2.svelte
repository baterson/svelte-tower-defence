<div class="bg-container">
	<div class="gradient-bg"></div>
	<div class="aurora"></div>
	<div class="stars"></div>
</div>

<style>
	.bg-container {
		position: absolute;
		overflow: hidden;
		inset: 0;
		background: radial-gradient(circle, rgba(0, 20, 40, 0.8), rgba(0, 5, 15, 1));
		z-index: 0;
	}

	.gradient-bg {
		position: absolute;
		background: radial-gradient(circle at 50% 10%, #2a0066, #10013e 70%);
		inset: 0;
		z-index: 1;
	}

	.aurora {
		position: absolute;
		inset: 0;
		z-index: 2;
		opacity: 0.3;
		background: radial-gradient(circle at center, rgba(0, 255, 157, 0.3) 0%, transparent 50%),
			linear-gradient(90deg, transparent 0%, #00ff9d 30%, #00c3ff 70%, transparent 100%);
		filter: blur(60px);
		transform: translateY(40%);
		animation: aurora-waves 8s ease-in-out infinite;
	}
	.stars {
		position: absolute;
		inset: 0;
		z-index: 3;
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

	@keyframes aurora-waves {
		0%,
		100% {
			transform: translateY(40%) translateX(-10%);
		}
		50% {
			transform: translateY(40%) translateX(10%);
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
