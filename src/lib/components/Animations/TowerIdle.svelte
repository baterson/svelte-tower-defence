<script>
	let { entity } = $props();
	// style:transform={`scale(${entity.stats.scale}) rotate(${entity.rotation}deg)`}
</script>

<svg fill="none" xmlns="http://www.w3.org/2000/svg">
	{#if entity.animation.currentFrame === 0}
		<g>
			<path
				d="M1 25.7129H47V86C47 90.9706 42.9706 95 38 95H10C5.02944 95 1 90.9706 1 86V25.7129Z"
				fill="#8384AA"
				stroke="#350F42"
				stroke-width="2"
			/>
			<path
				d="M10 1H38C42.9706 1 47 5.02944 47 10V31.8218C47 36.7923 42.9706 40.8218 38 40.8218H10C5.02944 40.8218 1 36.7923 1 31.8218V10C1 5.02944 5.02944 1 10 1Z"
				fill="url(#paint0_linear_2230_2167)"
				stroke="#350F42"
				stroke-width="2"
			/>
			<g filter="url(#filter0_d_2230_2167)">
				<circle cx="24.438" cy="55.4361" r="6.17239" fill="url(#paint1_linear_2230_2167)" />
				<circle cx="24.4413" cy="55.4452" r="3.89835" fill="#350F42" />
				<circle cx="24.4482" cy="55.4443" r="2.93254" fill="url(#paint2_linear_2230_2167)" />
				<circle cx="24.437" cy="55.437" r="1.48383" fill="#350F42" />
				<path
					d="M31.0585 55.4367C31.5086 55.4367 31.8781 55.0707 31.8289 54.6233C31.6448 52.9502 30.8969 51.3797 29.6953 50.1782C28.3006 48.7835 26.4091 48 24.4367 48C22.4644 48 20.5728 48.7835 19.1782 50.1782C17.9766 51.3797 17.2287 52.9502 17.0446 54.6233C16.9954 55.0707 17.3649 55.4367 17.815 55.4367V55.4367C18.2651 55.4367 18.6241 55.07 18.687 54.6244C18.8622 53.3845 19.4351 52.2264 20.3307 51.3307C21.4197 50.2417 22.8967 49.63 24.4367 49.63C25.9768 49.63 27.4537 50.2417 28.5427 51.3307C29.4384 52.2264 30.0112 53.3845 30.1864 54.6244C30.2494 55.07 30.6084 55.4367 31.0585 55.4367V55.4367Z"
					fill="#350F42"
				/>
				<circle cx="23.5303" cy="53.9502" r="0.913127" fill="white" />
				<circle cx="25.9254" cy="57.3414" r="0.421443" fill="white" />
			</g>
			<defs>
				<filter
					id="filter0_d_2230_2167"
					x="13.0391"
					y="46"
					width="22.793"
					height="21.6094"
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
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.207843 0 0 0 0 0.0588235 0 0 0 0 0.258824 0 0 0 1 0"
					/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2230_2167" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2230_2167"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2230_2167"
					x1="24"
					y1="0"
					x2="24"
					y2="41.8218"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#8F90BD" />
					<stop offset="1" stop-color="#A5A6CE" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2230_2167"
					x1="24.438"
					y1="49.2637"
					x2="24.438"
					y2="61.6085"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#EBD6EB" />
					<stop offset="0.9999" stop-color="white" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_2230_2167"
					x1="24.4482"
					y1="52.5117"
					x2="24.4482"
					y2="58.3768"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#853085" />
					<stop offset="1" stop-color="#9D4A9D" />
				</linearGradient>
			</defs>
		</g>
	{/if}

	{#if entity.animation.currentFrame === 1}
		<g>
			<path
				d="M1 21.7129H47V82C47 86.9706 42.9706 91 38 91H10C5.02944 91 1 86.9706 1 82V21.7129Z"
				fill="#8384AA"
				stroke="#350F42"
				stroke-width="2"
			/>
			<path
				d="M10 1H38C42.9706 1 47 5.02944 47 10V31.8218C47 36.7923 42.9706 40.8218 38 40.8218H10C5.02944 40.8218 1 36.7923 1 31.8218V10C1 5.02944 5.02944 1 10 1Z"
				fill="url(#paint0_linear_2230_2178)"
				stroke="#350F42"
				stroke-width="2"
			/>
			<ellipse cx="24.1724" cy="51.8682" rx="6.17239" ry="1.86816" fill="#350F42" />
			<defs>
				<linearGradient
					id="paint0_linear_2230_2178"
					x1="24"
					y1="0"
					x2="24"
					y2="41.8218"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#8F90BD" />
					<stop offset="1" stop-color="#A5A6CE" />
				</linearGradient>
			</defs>
		</g>
	{/if}

	{#if entity.animation.currentFrame === 2}
		<g>
			<path
				d="M1 15.7129H47V76C47 80.9706 42.9706 85 38 85H10C5.02944 85 1 80.9706 1 76V15.7129Z"
				fill="#8384AA"
				stroke="#350F42"
				stroke-width="2"
			/>
			<path
				d="M10 1H38C42.9706 1 47 5.02944 47 10V31.8218C47 36.7923 42.9706 40.8218 38 40.8218H10C5.02944 40.8218 1 36.7923 1 31.8218V10C1 5.02944 5.02944 1 10 1Z"
				fill="url(#paint0_linear_2230_2156)"
				stroke="#350F42"
				stroke-width="2"
			/>
			<g filter="url(#filter0_d_2230_2156)">
				<circle cx="24.438" cy="51.4361" r="6.17239" fill="url(#paint1_linear_2230_2156)" />
				<circle cx="24.4413" cy="51.4452" r="3.89835" fill="#350F42" />
				<circle cx="24.4482" cy="51.4443" r="2.93254" fill="url(#paint2_linear_2230_2156)" />
				<circle cx="24.437" cy="51.437" r="1.48383" fill="#350F42" />
				<path
					d="M31.0585 51.4367C31.5086 51.4367 31.8781 51.0707 31.8289 50.6233C31.6448 48.9502 30.8969 47.3797 29.6953 46.1782C28.3006 44.7835 26.4091 44 24.4367 44C22.4644 44 20.5728 44.7835 19.1782 46.1782C17.9766 47.3797 17.2287 48.9502 17.0446 50.6233C16.9954 51.0707 17.3649 51.4367 17.815 51.4367V51.4367C18.2651 51.4367 18.6241 51.07 18.687 50.6244C18.8622 49.3845 19.4351 48.2264 20.3307 47.3307C21.4197 46.2417 22.8967 45.63 24.4367 45.63C25.9768 45.63 27.4537 46.2417 28.5427 47.3307C29.4384 48.2264 30.0112 49.3845 30.1864 50.6244C30.2494 51.07 30.6084 51.4367 31.0585 51.4367V51.4367Z"
					fill="#350F42"
				/>
				<circle cx="23.5303" cy="49.9502" r="0.913127" fill="white" />
				<circle cx="25.9254" cy="53.3414" r="0.421443" fill="white" />
			</g>
			<defs>
				<filter
					id="filter0_d_2230_2156"
					x="13.0391"
					y="42"
					width="22.793"
					height="21.6094"
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
					<feOffset dy="2" />
					<feGaussianBlur stdDeviation="2" />
					<feComposite in2="hardAlpha" operator="out" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.207843 0 0 0 0 0.0588235 0 0 0 0 0.258824 0 0 0 1 0"
					/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2230_2156" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2230_2156"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2230_2156"
					x1="24"
					y1="0"
					x2="24"
					y2="41.8218"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#8F90BD" />
					<stop offset="1" stop-color="#A5A6CE" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2230_2156"
					x1="24.438"
					y1="45.2637"
					x2="24.438"
					y2="57.6085"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#EBD6EB" />
					<stop offset="0.9999" stop-color="white" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_2230_2156"
					x1="24.4482"
					y1="48.5117"
					x2="24.4482"
					y2="54.3768"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#853085" />
					<stop offset="1" stop-color="#9D4A9D" />
				</linearGradient>
			</defs>
		</g>
	{/if}
</svg>

<style>
	svg {
		width: 100%;
		height: 100%;
	}
</style>
