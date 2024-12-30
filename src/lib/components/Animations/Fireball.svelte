<script>
	let { entity } = $props();
	// style:transform={`scale(${entity.stats.scale}) rotate(${entity.rotation}deg)`}
</script>

<svg fill="none" xmlns="http://www.w3.org/2000/svg">
	{#if entity.animation.currentFrame === 0}
		<g>
			<path
				d="M8.11302 12.6662C8.11302 13.4105 7.65395 13.6377 7.05798 14.1411C6.42467 13.6483 6.00293 13.4105 6.00293 12.6662C6.00293 11.9218 6.47529 11.3184 7.05798 11.3184C7.64066 11.3184 8.11302 11.9218 8.11302 12.6662Z"
				fill="url(#paint0_linear_F1)"
			/>
			<path
				d="M7.86136 12.19C7.86136 12.6714 7.51179 12.8183 7.05798 13.1439C6.57573 12.8251 6.25459 12.6714 6.25459 12.19C6.25459 11.7086 6.61428 11.3184 7.05798 11.3184C7.50167 11.3184 7.86136 11.7086 7.86136 12.19Z"
				fill="url(#paint1_linear_F1)"
			/>
			<path
				d="M4.44296 15.0285C4.44296 15.5189 4.14071 15.6685 3.74834 16.0002C3.33138 15.6755 3.05371 15.5189 3.05371 15.0285C3.05371 14.5381 3.36471 14.1406 3.74834 14.1406C4.13197 14.1406 4.44296 14.5381 4.44296 15.0285Z"
				fill="url(#paint2_linear_F1)"
			/>
			<path
				d="M4.27727 14.7148C4.27727 15.0319 4.04712 15.1287 3.74834 15.3432C3.43084 15.1332 3.2194 15.0319 3.2194 14.7148C3.2194 14.3977 3.45621 14.1406 3.74834 14.1406C4.04046 14.1406 4.27727 14.3977 4.27727 14.7148Z"
				fill="url(#paint3_linear_F1)"
			/>
			<path
				d="M10 5.40395C10 8.38847 7.82438 9.29933 5 11.3178C1.99869 9.34183 0 8.38847 0 5.40395C0 2.41943 2.23858 0 5 0C7.76142 0 10 2.41943 10 5.40395Z"
				fill="url(#paint4_linear_F1)"
			/>
			<path
				d="M8.80734 3.49477C8.80734 5.42488 7.15067 6.01394 5 7.31933C2.7146 6.04142 1.19266 5.42488 1.19266 3.49477C1.19266 1.56466 2.89726 0 5 0C7.10274 0 8.80734 1.56466 8.80734 3.49477Z"
				fill="url(#paint5_linear_F1)"
			/>
			<path
				d="M7.54915 2.20041C7.54915 3.41567 6.43995 3.78655 5 4.60846C3.46984 3.80386 2.45085 3.41567 2.45085 2.20041C2.45085 0.985158 3.59214 0 5 0C6.40786 0 7.54915 0.985158 7.54915 2.20041Z"
				fill="url(#paint6_linear_F1)"
			/>

			<defs>
				<linearGradient
					id="paint0_linear_F1"
					x1="7.05798"
					y1="11.3184"
					x2="7.05798"
					y2="14.1411"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_F1"
					x1="7.05798"
					y1="11.3184"
					x2="7.05798"
					y2="13.1439"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_F1"
					x1="3.74834"
					y1="14.1406"
					x2="3.74834"
					y2="16.0002"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_F1"
					x1="3.74834"
					y1="14.1406"
					x2="3.74834"
					y2="15.3432"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_F1"
					x1="5"
					y1="0"
					x2="5"
					y2="11.3178"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint5_linear_F1"
					x1="5"
					y1="0"
					x2="5"
					y2="11.3178"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint6_linear_F1"
					x1="5"
					y1="0"
					x2="5"
					y2="4.60846"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="#FFF8CA" />
				</linearGradient>
			</defs>
		</g>
	{/if}

	{#if entity.animation.currentFrame === 1}
		<g>
			<path
				d="M7.46488 13.2357C7.46488 13.7121 7.13258 13.8575 6.70119 14.1797C6.24278 13.8643 5.9375 13.7121 5.9375 13.2357C5.9375 12.7593 6.27942 12.373 6.70119 12.373C7.12296 12.373 7.46488 12.7593 7.46488 13.2357Z"
				fill="url(#paint0_linear_F2)"
			/>
			<path
				d="M7.28271 12.9309C7.28271 13.239 7.02968 13.333 6.70119 13.5414C6.35212 13.3374 6.11966 13.239 6.11966 12.9309C6.11966 12.6228 6.38002 12.373 6.70119 12.373C7.02236 12.373 7.28271 12.6228 7.28271 12.9309Z"
				fill="url(#paint1_linear_F2)"
			/>
			<path
				d="M4.45314 15.5243C4.45314 15.7642 4.28699 15.8374 4.0713 15.9997C3.84209 15.8408 3.68945 15.7642 3.68945 15.5243C3.68945 15.2843 3.86041 15.0898 4.0713 15.0898C4.28218 15.0898 4.45314 15.2843 4.45314 15.5243Z"
				fill="url(#paint2_linear_F2)"
			/>
			<path
				d="M4.36206 15.3708C4.36206 15.5259 4.23554 15.5733 4.0713 15.6782C3.89676 15.5755 3.78054 15.5259 3.78054 15.3708C3.78054 15.2156 3.91071 15.0898 4.0713 15.0898C4.23188 15.0898 4.36206 15.2156 4.36206 15.3708Z"
				fill="url(#paint3_linear_F2)"
			/>
			<path
				d="M10 4.77238C10 7.40809 7.82438 8.21249 5 9.99509C1.99869 8.25002 0 7.40809 0 4.77238C0 2.13667 2.23858 0 5 0C7.76142 0 10 2.13667 10 4.77238Z"
				fill="url(#paint4_linear_F2)"
			/>
			<path
				d="M8.80734 3.08633C8.80734 4.79086 7.15067 5.31107 5 6.46389C2.7146 5.33534 1.19266 4.79086 1.19266 3.08633C1.19266 1.3818 2.89726 0 5 0C7.10274 0 8.80734 1.3818 8.80734 3.08633Z"
				fill="url(#paint5_linear_F2)"
			/>
			<path
				d="M7.54915 1.94324C7.54915 3.01647 6.43995 3.34401 5 4.06986C3.46984 3.35929 2.45085 3.01647 2.45085 1.94324C2.45085 0.87002 3.59214 0 5 0C6.40786 0 7.54915 0.87002 7.54915 1.94324Z"
				fill="url(#paint6_linear_F2)"
			/>

			<defs>
				<linearGradient
					id="paint0_linear_F2"
					x1="6.70119"
					y1="12.373"
					x2="6.70119"
					y2="14.1797"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_F2"
					x1="6.70119"
					y1="12.373"
					x2="6.70119"
					y2="13.5414"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_F2"
					x1="4.0713"
					y1="15.0898"
					x2="4.0713"
					y2="15.9997"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_F2"
					x1="4.0713"
					y1="15.0898"
					x2="4.0713"
					y2="15.6782"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_F2"
					x1="5"
					y1="0"
					x2="5"
					y2="9.99509"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint5_linear_F2"
					x1="5"
					y1="0"
					x2="5"
					y2="9.99509"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint6_linear_F2"
					x1="5"
					y1="0"
					x2="5"
					y2="4.06986"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="#FFF8CA" />
				</linearGradient>
			</defs>
		</g>
	{/if}

	{#if entity.animation.currentFrame === 2}
		<g>
			<path
				d="M7.30862 13.8359C7.30862 14.1886 7.03794 14.2963 6.68654 14.5349C6.31312 14.3013 6.06445 14.1886 6.06445 13.8359C6.06445 13.4832 6.34297 13.1973 6.68654 13.1973C7.0301 13.1973 7.30862 13.4832 7.30862 13.8359Z"
				fill="url(#paint0_linear_F3)"
			/>
			<path
				d="M7.16023 13.6103C7.16023 13.8384 6.95412 13.908 6.68654 14.0623C6.40219 13.9113 6.21284 13.8384 6.21284 13.6103C6.21284 13.3822 6.42492 13.1973 6.68654 13.1973C6.94815 13.1973 7.16023 13.3822 7.16023 13.6103Z"
				fill="url(#paint1_linear_F3)"
			/>
			<path
				d="M4.61832 15.6674C4.61832 15.8354 4.48975 15.8866 4.32283 16.0002C4.14546 15.889 4.02734 15.8354 4.02734 15.6674C4.02734 15.4994 4.15964 15.3633 4.32283 15.3633C4.48603 15.3633 4.61832 15.4994 4.61832 15.6674Z"
				fill="url(#paint2_linear_F3)"
			/>
			<path
				d="M4.54784 15.56C4.54784 15.6686 4.44993 15.7017 4.32283 15.7752C4.18777 15.7033 4.09783 15.6686 4.09783 15.56C4.09783 15.4513 4.19857 15.3633 4.32283 15.3633C4.4471 15.3633 4.54784 15.4513 4.54784 15.56Z"
				fill="url(#paint3_linear_F3)"
			/>
			<path
				d="M10 5.14577C10 7.9877 7.82438 8.85504 5 10.7771C1.99869 8.8955 0 7.9877 0 5.14577C0 2.30384 2.23858 0 5 0C7.76142 0 10 2.30384 10 5.14577Z"
				fill="url(#paint4_linear_F3)"
			/>
			<path
				d="M8.80734 3.3278C8.80734 5.1657 7.15067 5.72661 5 6.96963C2.7146 5.75278 1.19266 5.1657 1.19266 3.3278C1.19266 1.48991 2.89726 0 5 0C7.10274 0 8.80734 1.48991 8.80734 3.3278Z"
				fill="url(#paint5_linear_F3)"
			/>
			<path
				d="M7.54915 2.09528C7.54915 3.25248 6.43995 3.60564 5 4.38829C3.46984 3.62212 2.45085 3.25248 2.45085 2.09528C2.45085 0.93809 3.59214 0 5 0C6.40786 0 7.54915 0.93809 7.54915 2.09528Z"
				fill="url(#paint6_linear_F3)"
			/>

			<defs>
				<linearGradient
					id="paint0_linear_F3"
					x1="6.68654"
					y1="13.1973"
					x2="6.68654"
					y2="14.5349"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint1_linear_F3"
					x1="6.68654"
					y1="13.1973"
					x2="6.68654"
					y2="14.0623"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint2_linear_F3"
					x1="4.32283"
					y1="15.3633"
					x2="4.32283"
					y2="16.0002"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint3_linear_F3"
					x1="4.32283"
					y1="15.3633"
					x2="4.32283"
					y2="15.7752"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint4_linear_F3"
					x1="5"
					y1="0"
					x2="5"
					y2="10.7771"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FF6A00" />
					<stop offset="1" stop-color="#DC5C00" />
				</linearGradient>
				<linearGradient
					id="paint5_linear_F3"
					x1="5"
					y1="0"
					x2="5"
					y2="10.7771"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="#FFF942" />
					<stop offset="1" stop-color="#FFCC00" />
				</linearGradient>
				<linearGradient
					id="paint6_linear_F3"
					x1="5"
					y1="0"
					x2="5"
					y2="4.38829"
					gradientUnits="userSpaceOnUse"
				>
					<stop stop-color="white" />
					<stop offset="1" stop-color="#FFF8CA" />
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
