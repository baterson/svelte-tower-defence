<script>
	const { entity } = $props();
	let currentFrameId = $derived(`frame_${entity.animation.currentFrame}`);
</script>

<svg width="100%" height="103%">
	<defs>
		<!-- mask 1 -->
		<!-- 1. Ядро пламени (бело-жёлтое) -->
		<filter id="innerFlame" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blurAlpha" />

			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.1"
				numOctaves="3"
				seed="123"
				result="noise"
			/>

			<feDisplacementMap
				in="blurAlpha"
				in2="noise"
				scale="10"
				xChannelSelector="R"
				yChannelSelector="G"
				result="displaced"
			/>

			<!-- Окрашиваем в почти бело-жёлтый -->
			<feColorMatrix
				in="displaced"
				type="matrix"
				values="
                1  0.5 0   0   0
                1  0.8 0   0   0
                0.8 0.6 0   0   0
                0   0   0   1   0
              "
				result="coloredCore"
			/>

			<feMerge>
				<feMergeNode in="coloredCore" />
				<!-- Можно вернуть исходный спрайт, если хотим его смешать 
                   в рамках одного и того же use, но обычно оставляем 
                   только эффект -->
			</feMerge>
		</filter>

		<!-- 2) ВНЕШНИЕ ЯЗЫКИ ПЛАМЕНИ -->
		<filter id="flameTongues" x="-50%" y="-50%" width="200%" height="200%">
			<feMorphology operator="dilate" radius="1.5" in="SourceAlpha" result="thickAlpha" />

			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.07"
				numOctaves="4"
				seed="999"
				result="bigNoise"
			/>

			<feDisplacementMap
				in="thickAlpha"
				in2="bigNoise"
				scale="25"
				xChannelSelector="R"
				yChannelSelector="G"
				result="tonguesShape"
			/>

			<feColorMatrix
				in="tonguesShape"
				type="matrix"
				values="
                1   0.3  0   0   0
                0.7 0.2  0   0   0
                0.1 0    0   0   0
                0   0    0   1   0
              "
				result="coloredTongues"
			/>

			<feGaussianBlur stdDeviation="1" in="coloredTongues" result="blurredTongues" />

			<feMerge>
				<feMergeNode in="blurredTongues" />
			</feMerge>
		</filter>

		<!-- 3. Общее свечение (Glare / Glow) -->
		<filter id="fireGlow" x="-50%" y="-50%" width="200%" height="200%">
			<feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thickAlpha" />
			<feGaussianBlur stdDeviation="4" in="thickAlpha" result="blurGlow" />

			<feFlood flood-color="#ff8000" flood-opacity="0.8" result="floodColor" />
			<feComposite in="floodColor" in2="blurGlow" operator="in" result="glowColor" />

			<!-- Затем объединяем с исходной графикой, чтобы спрайт был виден внутри -->
			<feMerge>
				<feMergeNode in="glowColor" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>

		<!-- 4) (ОПЦИОНАЛЬНО) ИСКАЖЕНИЕ ВОЗДУХА (HEAT HAZE) -->
		<filter id="heatHaze" x="-50%" y="-50%" width="200%" height="200%">
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.08"
				numOctaves="2"
				seed="333"
				result="hazeNoise"
			/>
			<feDisplacementMap
				in="SourceGraphic"
				in2="hazeNoise"
				scale="10"
				xChannelSelector="R"
				yChannelSelector="G"
			/>
		</filter>

		<filter id="smoke" x="-50%" y="-50%" width="200%" height="200%">
			<!-- Создаём шум для дыма -->
			<feTurbulence
				type="fractalNoise"
				baseFrequency="0.05"
				numOctaves="3"
				seed="10"
				result="noise"
			/>

			<!-- Смещаем наше исходное изображение этим шумом, как «клубы дыма» -->
			<feDisplacementMap
				in="SourceAlpha"
				in2="noise"
				scale="10"
				xChannelSelector="R"
				yChannelSelector="G"
				result="distorted"
			/>

			<!-- Слегка размываем, чтобы дым был мягче -->
			<feGaussianBlur in="distorted" stdDeviation="3" result="blurredSmoke" />

			<!-- Красим в полупрозрачный серый -->
			<feColorMatrix
				in="blurredSmoke"
				type="matrix"
				values="
			0.5 0.5 0.5 0   0
			0.5 0.5 0.5 0   0
			0.5 0.5 0.5 0   0
			0   0   0   0.5 0
		"
				result="smokeColor"
			/>

			<!-- Итоговый мердж (при желании можно соединить с исходной графикой) -->
			<feMerge>
				<feMergeNode in="smokeColor" />
			</feMerge>
		</filter>

		<filter id="iceGlow" x="-50%" y="-50%" width="200%" height="200%">
			<feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thick" />
			<feMorphology operator="dilate" radius="0.5" in="SourceAlpha" result="thin" />

			<feComposite operator="out" in="thick" in2="thin" result="outline" />

			<feGaussianBlur stdDeviation="1" in="outline" result="blur" />

			<feFlood flood-color="#ff7100" flood-opacity="1" result="color" />

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
		<!-- <use href={`#${currentFrameId}`} filter="url(#heatHaze)" /> -->
		<!-- 1) Ядро пламени (сверху) -->
		<use href={`#${currentFrameId}`} filter="url(#innerFlame)" />

		<!-- 2) Языки пламени поверх ядра -->
		<use href={`#${currentFrameId}`} filter="url(#flameTongues)" />

		<!-- 3) Огненное свечение -->
		<use href={`#${currentFrameId}`} filter="url(#fireGlow)" />

		<!-- <use href={`#${currentFrameId}`} filter="url(#iceGlow)" /> -->
		<use href="#yourFrameId" filter="url(#heatHaze)" />
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
