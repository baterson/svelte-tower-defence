<script>
	const { entity } = $props();
	let currentFrameId = $derived(`frame_${entity.animation.currentFrame}`);
</script>

<svg width="100%" height="103%">
	<defs>
		<!-- mask 1 -->
		<filter id="iceCrystal" x="-50%" y="-50%" width="200%" height="200%">
			<feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
			<feSpecularLighting
				in="turbulence"
				surfaceScale="5"
				specularConstant="1"
				specularExponent="20"
				result="light"
			>
				<fePointLight x="50%" y="50%" z="100" />
			</feSpecularLighting>
			<feComposite in="light" in2="SourceGraphic" operator="in" />
		</filter>
		<!-- mask 2 -->
		<!-- <filter id="frostPattern" x="-50%" y="-50%" width="200%" height="200%">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.08"
				numOctaves="2"
				seed="2"
				result="noise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="noise"
				scale="10"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
			<feComposite in2="SourceGraphic" operator="in" />
		</filter> -->
		<!-- mask 3 -->
		<!-- <filter id="frostGlow" x="0" y="0" width="100%" height="100%">
			<feGaussianBlur stdDeviation="10" in="SourceAlpha" result="blur" />
			<feSpecularLighting
				in="blur"
				surfaceScale="5"
				specularConstant="1"
				specularExponent="20"
				lighting-color="#00fff0"
				result="specOut"
			>
				<fePointLight x="50%" y="50%" z="200" />
			</feSpecularLighting>

			<feComposite in="specOut" in2="SourceGraphic" operator="in" />
		</filter> -->

		<filter id="iceGlow" x="-50%" y="-50%" width="200%" height="200%">
			<feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thick" />
			<feMorphology operator="dilate" radius="0.5" in="SourceAlpha" result="thin" />

			<feComposite operator="out" in="thick" in2="thin" result="outline" />

			<feGaussianBlur stdDeviation="1" in="outline" result="blur" />

			<feFlood flood-color="#00fff0" flood-opacity="1" result="color" />

			<feComposite operator="in" in="color" in2="blur" result="glow" />

			<feMerge>
				<feMergeNode in="glow" />
				<feMergeNode in="glow" />
				<feMergeNode in="glow" />
				<feMergeNode in="glow" />
			</feMerge>
		</filter>
		<mask id="spriteMask">
			<use href={`#${currentFrameId}`} fill="white" />
		</mask>
	</defs>
	{#if entity.isInteractable}
		<use href={`#${currentFrameId}`} filter="url(#iceCrystal)" mask="url(#spriteMask)" />

		<use href={`#${currentFrameId}`} filter="url(#iceGlow)" />
	{/if}
</svg>

<style>
	svg {
		position: absolute;
		inset: 0;
		pointer-events: none;
		mix-blend-mode: screen;
	}
</style>
