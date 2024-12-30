<script>
	let { entity } = $props();
</script>

<div
	class="container"
	style:left="0px"
	style:top="0px"
	style:transform={`scale(3) rotate(${entity.rotation}deg)`}
>
	<svg fill="none" xmlns="http://www.w3.org/2000/svg">
		{#if entity.animation.currentFrame === 0}
			<!-- Frame 0 (first SVG snippet) -->
			<g>
				<rect
					x="640.154"
					y="888.59"
					width="323"
					height="904"
					rx="161.5"
					transform="rotate(45 640.154 888.59)"
					fill="#65CDCD"
				/>
				<path
					d="M564 360C564 161.177 725.178 0 924 0H1785C1983.82 0 2145 161.178 2145 360V2322.06C2145 2439.66 2049.66 2535 1932.06 2535C1827.12 2535 1737.83 2458.55 1721.66 2354.87L1703.2 2236.45C1641.14 1838.39 1067.86 1838.39 1005.8 2236.45L987.337 2354.87C971.17 2458.55 881.877 2535 776.94 2535C659.337 2535 564 2439.66 564 2322.06V360Z"
					fill="#95EAEA"
				/>
				<rect
					x="1763.54"
					y="1119.84"
					width="323"
					height="904"
					rx="161.5"
					transform="rotate(-45 1763.54 1119.84)"
					fill="#65CDCD"
				/>
				<g filter="url(#filter0_d_2223_2052)">
					<circle cx="1160" cy="638.998" r="303.776" fill="url(#paint0_linear_2223_2052)" />
					<circle cx="1160.43" cy="639.433" r="191.858" fill="#350F42" />
					<circle cx="1160.43" cy="639.427" r="144.326" fill="url(#paint1_linear_2223_2052)" />
					<circle cx="1160" cy="639" r="73.0272" fill="#350F42" />
					<path
						d="M1485.89 639C1508.04 639 1526.23 620.987 1523.81 598.968C1514.75 516.623 1477.94 439.335 1418.8 380.199C1350.16 311.561 1257.07 273 1160 273C1062.93 273 969.837 311.561 901.199 380.199C842.063 439.335 805.253 516.623 796.195 598.968C793.772 620.987 811.958 639 834.109 639C856.261 639 873.93 620.954 877.028 599.02C885.649 538.001 913.842 481.003 957.922 436.922C1011.52 383.328 1084.21 353.219 1160 353.219C1235.79 353.219 1308.48 383.328 1362.08 436.922C1406.16 481.003 1434.35 538.001 1442.97 599.02C1446.07 620.954 1463.74 639 1485.89 639Z"
						fill="#350F42"
					/>
					<circle cx="1115.49" cy="565.972" r="44.9406" fill="white" />
					<circle cx="1233.03" cy="732.769" r="20.7418" fill="white" />
				</g>
				<defs>
					<filter
						id="filter0_d_2223_2052"
						x="743.978"
						y="261"
						width="832.045"
						height="773.773"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feMorphology
							radius="4"
							operator="dilate"
							in="SourceAlpha"
							result="effect1_dropShadow_2223_2052"
						/>
						<feOffset dy="40" />
						<feGaussianBlur stdDeviation="24" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.396078 0 0 0 0 0.803922 0 0 0 0 0.803922 0 0 0 1 0"
						/>
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2223_2052" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_2223_2052"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_2223_2052"
						x1="1160"
						y1="335.223"
						x2="1160"
						y2="942.774"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2223_2052"
						x1="1160.43"
						y1="495.102"
						x2="1160.43"
						y2="783.753"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#853085" />
						<stop offset="1" stop-color="#9D4A9D" />
					</linearGradient>
				</defs>
			</g>
		{/if}

		{#if entity.animation.currentFrame === 1}
			<!-- Frame 1 (second SVG snippet) -->
			<g>
				<rect y="799" width="323" height="904" rx="161.5" fill="#65CDCD" />
				<path
					d="M98 360C98 161.178 259.178 0 458 0H1319C1517.82 0 1679 161.178 1679 360V2247.61C1679 2365.46 1583.46 2461 1465.61 2461C1360.81 2461 1271.53 2384.91 1254.91 2281.44L1236.17 2164.72C1172.72 1769.67 604.281 1769.67 540.835 2164.72L522.088 2281.45C505.47 2384.91 416.186 2461 311.394 2461C193.54 2461 98 2365.46 98 2247.61V360Z"
					fill="#95EAEA"
				/>
				<rect x="1454" y="799" width="323" height="904" rx="161.5" fill="#65CDCD" />
				<g filter="url(#filter0_d_2223_2067)">
					<circle cx="689" cy="626.998" r="303.776" fill="url(#paint0_linear_2223_2067)" />
					<circle cx="689.433" cy="627.433" r="191.858" fill="#350F42" />
					<circle cx="689.432" cy="627.427" r="144.326" fill="url(#paint1_linear_2223_2067)" />
					<circle cx="689" cy="627" r="73.0272" fill="#350F42" />
					<path
						d="M1014.89 627C1037.04 627 1055.23 608.987 1052.81 586.968C1043.75 504.623 1006.94 427.335 947.801 368.199C879.163 299.561 786.069 261 689 261C591.931 261 498.837 299.561 430.199 368.199C371.063 427.335 334.253 504.623 325.195 586.968C322.772 608.987 340.958 627 363.109 627C385.261 627 402.93 608.954 406.028 587.02C414.649 526.001 442.842 469.003 486.922 424.922C540.517 371.328 613.206 341.219 689 341.219C764.794 341.219 837.483 371.328 891.078 424.922C935.158 469.003 963.352 526.001 971.972 587.02C975.07 608.954 992.739 627 1014.89 627Z"
						fill="#350F42"
					/>
					<circle cx="644.493" cy="553.972" r="44.9406" fill="white" />
					<circle cx="762.028" cy="720.769" r="20.7418" fill="white" />
				</g>
				<defs>
					<filter
						id="filter0_d_2223_2067"
						x="272.978"
						y="249"
						width="832.045"
						height="773.773"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feMorphology
							radius="4"
							operator="dilate"
							in="SourceAlpha"
							result="effect1_dropShadow_2223_2067"
						/>
						<feOffset dy="40" />
						<feGaussianBlur stdDeviation="24" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.396078 0 0 0 0 0.803922 0 0 0 0 0.803922 0 0 0 1 0"
						/>
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2223_2067" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_2223_2067"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_2223_2067"
						x1="689"
						y1="323.223"
						x2="689"
						y2="930.774"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2223_2067"
						x1="689.432"
						y1="483.102"
						x2="689.432"
						y2="771.753"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#853085" />
						<stop offset="1" stop-color="#9D4A9D" />
					</linearGradient>
				</defs>
			</g>
		{/if}

		{#if entity.animation.currentFrame === 2}
			<!-- Frame 2 (third SVG snippet) -->
			<g>
				<rect
					y="1119.39"
					width="323"
					height="904"
					rx="161.5"
					transform="rotate(-45 0 1119.39)"
					fill="#65CDCD"
				/>
				<path
					d="M220.071 360C220.071 161.177 381.249 0 580.071 0H1441.07C1639.89 0 1801.07 161.178 1801.07 360V2322.06C1801.07 2439.66 1705.74 2535 1588.13 2535C1483.19 2535 1393.9 2458.55 1377.74 2354.87L1359.27 2236.45C1297.21 1838.39 723.934 1838.39 661.87 2236.45L643.407 2354.87C627.241 2458.55 537.948 2535 433.01 2535C315.407 2535 220.071 2439.66 220.071 2322.06V360Z"
					fill="#95EAEA"
				/>
				<rect
					x="1650.22"
					y="891.441"
					width="323"
					height="904"
					rx="161.5"
					transform="rotate(45 1650.22 891.441)"
					fill="#65CDCD"
				/>
				<g filter="url(#filter0_d_2223_2081)">
					<circle cx="816.072" cy="638.998" r="303.776" fill="url(#paint0_linear_2223_2081)" />
					<circle cx="816.504" cy="639.433" r="191.858" fill="#350F42" />
					<circle cx="816.504" cy="639.427" r="144.326" fill="url(#paint1_linear_2223_2081)" />
					<circle cx="816.071" cy="639" r="73.0272" fill="#350F42" />
					<path
						d="M1141.96 639C1164.11 639 1182.3 620.987 1179.88 598.968C1170.82 516.623 1134.01 439.335 1074.87 380.199C1006.23 311.561 913.141 273 816.071 273C719.002 273 625.909 311.561 557.27 380.199C498.134 439.335 461.325 516.623 452.266 598.968C449.844 620.987 468.029 639 490.181 639C512.333 639 530.001 620.954 533.1 599.02C541.72 538.001 569.913 481.003 613.994 436.922C667.588 383.328 740.277 353.219 816.071 353.219C891.865 353.219 964.555 383.328 1018.15 436.922C1062.23 481.003 1090.42 538.001 1099.04 599.02C1102.14 620.954 1119.81 639 1141.96 639Z"
						fill="#350F42"
					/>
					<circle cx="771.565" cy="565.972" r="44.9406" fill="white" />
					<circle cx="889.099" cy="732.769" r="20.7418" fill="white" />
				</g>
				<defs>
					<filter
						id="filter0_d_2223_2081"
						x="400.049"
						y="261"
						width="832.045"
						height="773.773"
						filterUnits="userSpaceOnUse"
						color-interpolation-filters="sRGB"
					>
						<feFlood flood-opacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feMorphology
							radius="4"
							operator="dilate"
							in="SourceAlpha"
							result="effect1_dropShadow_2223_2081"
						/>
						<feOffset dy="40" />
						<feGaussianBlur stdDeviation="24" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.396078 0 0 0 0 0.803922 0 0 0 0 0.803922 0 0 0 1 0"
						/>
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2223_2081" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_2223_2081"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_2223_2081"
						x1="816.072"
						y1="335.223"
						x2="816.072"
						y2="942.774"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2223_2081"
						x1="816.504"
						y1="495.102"
						x2="816.504"
						y2="783.753"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#853085" />
						<stop offset="1" stop-color="#9D4A9D" />
					</linearGradient>
				</defs>
			</g>
		{/if}
	</svg>
</div>

<style>
	.container {
		z-index: 11;
		width: 100%;
		height: 100%;

		position: absolute;
		transform-origin: top left;
	}
</style>
