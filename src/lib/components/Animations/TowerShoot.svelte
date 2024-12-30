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
				fill="url(#paint0_linear_2230_2207)"
				stroke="#350F42"
				stroke-width="2"
			/>
			<g filter="url(#filter0_d_2230_2207)">
				<circle cx="24.438" cy="55.4361" r="6.17239" fill="url(#paint1_linear_2230_2207)" />
				<circle cx="24.4413" cy="55.4452" r="3.89835" fill="#350F42" />
				<circle cx="24.4482" cy="55.4443" r="2.93254" fill="url(#paint2_linear_2230_2207)" />
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
					id="filter0_d_2230_2207"
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
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2230_2207" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2230_2207"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2230_2207"
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
					id="paint1_linear_2230_2207"
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
					id="paint2_linear_2230_2207"
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
				d="M1 20H51V80C51 84.9706 46.9706 89 42 89H10C5.02944 89 1 84.9706 1 80V20Z"
				fill="#8384AA"
				stroke="#350F42"
				stroke-width="2"
			/>
			<path
				d="M10 1H42C46.9706 1 51 5.02944 51 10V32C51 36.9706 46.9706 41 42 41H10C5.02944 41 1 36.9706 1 32V10C1 5.02944 5.02944 1 10 1Z"
				fill="url(#paint0_linear_2230_2196)"
				stroke="#350F42"
				stroke-width="2"
			/>
			<g filter="url(#filter0_d_2230_2196)">
				<circle cx="26.438" cy="55.4361" r="6.17239" fill="url(#paint1_linear_2230_2196)" />
				<circle cx="26.4413" cy="55.4452" r="3.89835" fill="#350F42" />
				<circle cx="26.4482" cy="55.4443" r="2.93254" fill="url(#paint2_linear_2230_2196)" />
				<circle cx="26.437" cy="55.437" r="1.48383" fill="#350F42" />
				<path
					d="M33.0585 55.4367C33.5086 55.4367 33.8781 55.0707 33.8289 54.6233C33.6448 52.9502 32.8969 51.3797 31.6953 50.1782C30.3006 48.7835 28.4091 48 26.4367 48C24.4644 48 22.5728 48.7835 21.1782 50.1782C19.9766 51.3797 19.2287 52.9502 19.0446 54.6233C18.9954 55.0707 19.3649 55.4367 19.815 55.4367V55.4367C20.2651 55.4367 20.6241 55.07 20.687 54.6244C20.8622 53.3845 21.4351 52.2264 22.3307 51.3307C23.4197 50.2417 24.8967 49.63 26.4367 49.63C27.9768 49.63 29.4537 50.2417 30.5427 51.3307C31.4384 52.2264 32.0112 53.3845 32.1864 54.6244C32.2494 55.07 32.6084 55.4367 33.0585 55.4367V55.4367Z"
					fill="#350F42"
				/>
				<circle cx="25.5303" cy="53.9502" r="0.913127" fill="white" />
				<circle cx="27.9254" cy="57.3414" r="0.421443" fill="white" />
			</g>
			<defs>
				<filter
					id="filter0_d_2230_2196"
					x="15.0391"
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
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2230_2196" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2230_2196"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2230_2196"
					x1="26"
					y1="0"
					x2="26"
					y2="42"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#8F90BD" />
					<stop offset="1" stop-color="#A5A6CE" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2230_2196"
					x1="26.438"
					y1="49.2637"
					x2="26.438"
					y2="61.6085"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#EBD6EB" />
					<stop offset="0.9999" stop-color="white" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_2230_2196"
					x1="26.4482"
					y1="52.5117"
					x2="26.4482"
					y2="58.3768"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#853085" />
					<stop offset="1" stop-color="#9D4A9D" />
				</linearGradient>
			</defs>
		</g>
	{/if}

	{#if entity.animation.currentFrame === 2}
		<g>
			<path
				d="M1 14H57V74C57 78.9706 52.9706 83 48 83H10C5.02944 83 1 78.9706 1 74V14Z"
				fill="#8384AA"
				stroke="#350F42"
				stroke-width="2"
			/>
			<path
				d="M10 1H48C52.9706 1 57 5.02944 57 10V32C57 36.9706 52.9706 41 48 41H10C5.02944 41 1 36.9706 1 32V10C1 5.02944 5.02944 1 10 1Z"
				fill="url(#paint0_linear_2230_2220)"
				stroke="#350F42"
				stroke-width="2"
			/>
			<g filter="url(#filter0_d_2230_2220)">
				<circle cx="29.438" cy="54.4361" r="6.17239" fill="url(#paint1_linear_2230_2220)" />
				<circle cx="29.4413" cy="54.4452" r="3.89835" fill="#350F42" />
				<circle cx="29.4482" cy="54.4443" r="2.93254" fill="url(#paint2_linear_2230_2220)" />
				<circle cx="29.437" cy="54.437" r="1.48383" fill="#350F42" />
				<path
					d="M36.0585 54.4367C36.5086 54.4367 36.8781 54.0707 36.8289 53.6233C36.6448 51.9502 35.8969 50.3797 34.6953 49.1782C33.3006 47.7835 31.4091 47 29.4367 47C27.4644 47 25.5728 47.7835 24.1782 49.1782C22.9766 50.3797 22.2287 51.9502 22.0446 53.6233C21.9954 54.0707 22.3649 54.4367 22.815 54.4367V54.4367C23.2651 54.4367 23.6241 54.07 23.687 53.6244C23.8622 52.3845 24.4351 51.2264 25.3307 50.3307C26.4197 49.2417 27.8967 48.63 29.4367 48.63C30.9768 48.63 32.4537 49.2417 33.5427 50.3307C34.4384 51.2264 35.0112 52.3845 35.1864 53.6244C35.2494 54.07 35.6084 54.4367 36.0585 54.4367V54.4367Z"
					fill="#350F42"
				/>
				<circle cx="28.5303" cy="52.9502" r="0.913127" fill="white" />
				<circle cx="30.9254" cy="56.3414" r="0.421443" fill="white" />
			</g>
			<defs>
				<filter
					id="filter0_d_2230_2220"
					x="18.0391"
					y="45"
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
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2230_2220" />
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_dropShadow_2230_2220"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_2230_2220"
					x1="29"
					y1="0"
					x2="29"
					y2="42"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#8F90BD" />
					<stop offset="1" stop-color="#A5A6CE" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_2230_2220"
					x1="29.438"
					y1="48.2637"
					x2="29.438"
					y2="60.6085"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#EBD6EB" />
					<stop offset="0.9999" stop-color="white" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_2230_2220"
					x1="29.4482"
					y1="51.5117"
					x2="29.4482"
					y2="57.3768"
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
