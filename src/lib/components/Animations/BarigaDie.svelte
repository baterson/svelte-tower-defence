<script>
	let { entity } = $props();
</script>

<div
	class="animation-container"
	style:left={`0px`}
	style:top={`0px`}
	style:transform={`scale(${entity.scale}) rotate(${entity.rotation}deg)`}
>
	<svg fill="none" xmlns="http://www.w3.org/2000/svg">
		{#if entity.animation.currentFrame === 0}
			<g>
				<path
					d="M84.1434 45.7573L62.0895 9.68007C58.4504 3.72711 50.448 2.25299 44.9266 6.51853L44.7636 6.64447C41.4661 9.19197 36.8885 9.27654 33.4991 6.85259C27.4993 2.56173 19.0668 4.98581 16.2615 11.8078L2.38679 45.5496C0.439136 50.2861 3.34748 55.6138 8.38481 56.5373C10.1843 56.8671 12.0426 56.5747 13.6538 55.708L17.2531 53.7718C20.3285 52.1175 24.0352 52.1456 27.0851 53.8464C30.7664 55.8994 35.2746 55.8923 38.963 53.8679C42.0686 52.1634 45.8587 52.1448 48.961 53.8399L49.1192 53.9263C52.7812 55.9272 57.2174 55.8927 60.8478 53.8351C63.836 52.1415 67.4817 52.0896 70.5169 53.6974L74.6292 55.8758C76.0603 56.6339 77.7052 56.8874 79.2982 56.5954C84.2691 55.6841 86.7793 50.0693 84.1434 45.7573Z"
					fill="url(#paint0_linear_2229_2060)"
					stroke="#350F42"
					stroke-width="2"
				/>
				<g filter="url(#filter0_d_2229_2060)">
					<circle cx="35.0943" cy="22.8501" r="6.17239" fill="url(#paint1_linear_2229_2060)" />
					<circle cx="35.0976" cy="22.8593" r="3.89835" fill="#350F42" />
					<circle cx="35.1044" cy="22.8583" r="2.93254" fill="url(#paint2_linear_2229_2060)" />
					<circle cx="35.0932" cy="22.851" r="1.48383" fill="#350F42" />
					<path
						d="M41.7147 22.8508C42.1648 22.8508 42.5343 22.4848 42.4851 22.0374C42.301 20.3642 41.5531 18.7938 40.3515 17.5922C38.9569 16.1976 37.0653 15.4141 35.093 15.4141C33.1206 15.4141 31.2291 16.1976 29.8344 17.5922C28.6328 18.7938 27.8849 20.3642 27.7008 22.0374C27.6516 22.4848 28.0211 22.8508 28.4712 22.8508V22.8508C28.9213 22.8508 29.2803 22.4841 29.3433 22.0384C29.5184 20.7986 30.0913 19.6405 30.987 18.7448C32.076 17.6558 33.5529 17.044 35.093 17.044C36.633 17.044 38.11 17.6558 39.199 18.7448C40.0946 19.6405 40.6675 20.7986 40.8427 22.0384C40.9056 22.4841 41.2646 22.8508 41.7147 22.8508V22.8508Z"
						fill="#350F42"
					/>
					<circle cx="34.1866" cy="21.3643" r="0.913127" fill="white" />
					<circle cx="36.5816" cy="24.7554" r="0.421443" fill="white" />
					<circle cx="17.6177" cy="25.2544" r="6.17239" fill="url(#paint3_linear_2229_2060)" />
					<circle cx="17.621" cy="25.2636" r="3.89835" fill="#350F42" />
					<circle cx="17.6279" cy="25.2626" r="2.93254" fill="url(#paint4_linear_2229_2060)" />
					<circle cx="17.6166" cy="25.2553" r="1.48383" fill="#350F42" />
					<path
						d="M24.2381 25.2551C24.6883 25.2551 25.0578 24.8891 25.0085 24.4417C24.8245 22.7685 24.0765 21.1981 22.875 19.9965C21.4803 18.6019 19.5888 17.8184 17.6164 17.8184C15.6441 17.8184 13.7525 18.6019 12.3579 19.9965C11.1563 21.1981 10.4083 22.7685 10.2243 24.4417C10.1751 24.8891 10.5446 25.2551 10.9947 25.2551V25.2551C11.4448 25.2551 11.8038 24.8884 11.8667 24.4427C12.0419 23.2029 12.6147 22.0448 13.5104 21.1491C14.5994 20.0601 16.0764 19.4483 17.6164 19.4483C19.1565 19.4483 20.6334 20.0601 21.7224 21.1491C22.6181 22.0448 23.1909 23.2029 23.3661 24.4427C23.429 24.8884 23.788 25.2551 24.2381 25.2551V25.2551Z"
						fill="#350F42"
					/>
					<circle cx="16.71" cy="23.7686" r="0.913127" fill="white" />
					<circle cx="19.105" cy="27.1597" r="0.421443" fill="white" />
				</g>
				<defs>
					<filter
						id="filter0_d_2229_2060"
						x="2.21875"
						y="9.41406"
						width="48.2695"
						height="32.0137"
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
							result="effect1_dropShadow_2229_2060"
						/>
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.207843 0 0 0 0 0.0588235 0 0 0 0 0.258824 0 0 0 1 0"
						/>
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2229_2060" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_2229_2060"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_2229_2060"
						x1="57.6522"
						y1="25.9837"
						x2="57.6522"
						y2="56"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#9D4A9D" />
						<stop offset="1" stop-color="#842F84" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2229_2060"
						x1="35.0943"
						y1="16.6777"
						x2="35.0943"
						y2="29.0225"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_2229_2060"
						x1="35.1044"
						y1="19.9258"
						x2="35.1044"
						y2="25.7909"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#853085" />
						<stop offset="1" stop-color="#9D4A9D" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_2229_2060"
						x1="17.6177"
						y1="19.082"
						x2="17.6177"
						y2="31.4268"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_2229_2060"
						x1="17.6279"
						y1="22.3301"
						x2="17.6279"
						y2="28.1952"
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
					d="M96.4322 22.7221L73.2709 5.87133C68.9755 2.74622 63.4256 1.91306 58.4019 3.63914L53.9005 5.18577C49.5782 6.67084 44.8926 6.72474 40.5373 5.33948L35.9107 3.86792C30.129 2.02894 23.8053 3.69973 19.6864 8.15457L7.6409 21.1826C3.67547 25.4714 6.39286 32.4443 12.2147 32.9189C12.952 32.979 13.6942 32.922 14.4136 32.7498L20.485 31.2973C24.5913 30.3149 28.8734 30.3327 32.9713 31.3491C37.4246 32.4536 42.1273 32.4491 46.5809 31.3619C50.7483 30.3447 55.1472 30.3311 59.3119 31.3431L59.5506 31.4011C63.9534 32.471 68.5506 32.4514 72.944 31.3439C76.9627 30.331 81.166 30.2983 85.2 31.2487L91.8059 32.805C92.3812 32.9405 92.9741 32.985 93.5632 32.937C98.7942 32.5105 100.676 25.8098 96.4322 22.7221Z"
					fill="url(#paint0_linear_2229_2041)"
					stroke="#350F42"
					stroke-width="2"
				/>
				<g filter="url(#filter0_d_2229_2041)">
					<circle cx="46.0341" cy="13.1766" r="5.95593" fill="url(#paint1_linear_2229_2041)" />
					<circle cx="46.0429" cy="13.1855" r="3.76164" fill="#350F42" />
					<circle cx="46.0445" cy="13.1871" r="2.8297" fill="url(#paint2_linear_2229_2041)" />
					<circle cx="46.0334" cy="13.1759" r="1.4318" fill="#350F42" />
					<path
						d="M52.4248 13.1759C52.8591 13.1759 53.2157 12.8227 53.1682 12.391C52.9906 10.7766 52.2689 9.26122 51.1094 8.10178C49.7637 6.75603 47.9385 6 46.0353 6C44.1321 6 42.3069 6.75603 40.9612 8.10178C39.8017 9.26122 39.08 10.7766 38.9024 12.391C38.8549 12.8227 39.2115 13.1759 39.6458 13.1759V13.1759C40.0801 13.1759 40.4265 12.8221 40.4873 12.3921C40.6563 11.1957 41.209 10.0782 42.0733 9.21392C43.1241 8.16313 44.5493 7.5728 46.0353 7.5728C47.5213 7.5728 48.9465 8.16313 49.9973 9.21392C50.8616 10.0782 51.4143 11.1957 51.5833 12.3921C51.6441 12.8221 51.9905 13.1759 52.4248 13.1759V13.1759Z"
						fill="#350F42"
					/>
					<circle cx="45.1624" cy="11.7444" r="0.881105" fill="white" />
					<circle cx="47.4692" cy="15.0141" r="0.406664" fill="white" />
					<circle cx="29.1747" cy="15.4969" r="5.95593" fill="url(#paint3_linear_2229_2041)" />
					<circle cx="29.1835" cy="15.5058" r="3.76164" fill="#350F42" />
					<circle cx="29.1852" cy="15.5074" r="2.8297" fill="url(#paint4_linear_2229_2041)" />
					<circle cx="29.174" cy="15.4962" r="1.4318" fill="#350F42" />
					<path
						d="M35.5654 15.4962C35.9998 15.4962 36.3563 15.1431 36.3088 14.7113C36.1312 13.0969 35.4095 11.5815 34.2501 10.4221C32.9043 9.07634 31.0791 8.32031 29.1759 8.32031C27.2727 8.32031 25.4475 9.07634 24.1018 10.4221C22.9423 11.5815 22.2206 13.0969 22.043 14.7113C21.9955 15.1431 22.3521 15.4962 22.7864 15.4962V15.4962C23.2207 15.4962 23.5671 15.1424 23.6279 14.7124C23.7969 13.516 24.3497 12.3985 25.2139 11.5342C26.2647 10.4834 27.6899 9.89311 29.1759 9.89311C30.662 9.89311 32.0871 10.4834 33.1379 11.5342C34.0022 12.3985 34.5549 13.516 34.724 14.7124C34.7847 15.1424 35.1311 15.4962 35.5654 15.4962V15.4962Z"
						fill="#350F42"
					/>
					<circle cx="28.303" cy="14.0647" r="0.881105" fill="white" />
					<circle cx="30.6098" cy="17.3344" r="0.406664" fill="white" />
				</g>
				<defs>
					<filter
						id="filter0_d_2229_2041"
						x="14.0391"
						y="0"
						width="47.1328"
						height="31.4531"
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
							result="effect1_dropShadow_2229_2041"
						/>
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.207843 0 0 0 0 0.0588235 0 0 0 0 0.258824 0 0 0 1 0"
						/>
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2229_2041" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_2229_2041"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_2229_2041"
						x1="69.4447"
						y1="15.9199"
						x2="69.4447"
						y2="32"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#9D4A9D" />
						<stop offset="1" stop-color="#842F84" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2229_2041"
						x1="46.0341"
						y1="7.2207"
						x2="46.0341"
						y2="19.1326"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_2229_2041"
						x1="46.0445"
						y1="10.3574"
						x2="46.0445"
						y2="16.0168"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#853085" />
						<stop offset="1" stop-color="#9D4A9D" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_2229_2041"
						x1="29.1747"
						y1="9.54102"
						x2="29.1747"
						y2="21.4529"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_2229_2041"
						x1="29.1852"
						y1="12.6777"
						x2="29.1852"
						y2="18.3371"
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
					d="M14.6028 20.9998L14.625 20L14.6899 20.9979L29.5123 20.0341L43.8077 20.9977L43.8745 21.0022L43.9412 20.9978L58.4672 20.0341L73.0591 20.9978L73.1262 21.0023L73.1934 20.9977L87.2581 20.0341L102.311 20.998L102.375 20L102.397 20.9998C105.501 20.931 105.889 16.4594 102.843 15.8572L74.0032 10.1543C73.455 10.0459 72.894 10.0172 72.3376 10.0692L59.3834 11.2789C54.5755 11.7279 49.7369 11.7446 44.926 11.3287L30.47 10.079C29.7709 10.0185 29.0666 10.0891 28.3934 10.287L13.7527 14.5908C10.1677 15.6447 10.867 20.917 14.6028 20.9998Z"
					fill="url(#paint0_linear_2229_2079)"
					stroke="#350F42"
					stroke-width="2"
				/>
				<g filter="url(#filter0_d_2229_2079)">
					<circle cx="50.1747" cy="13.1766" r="5.95593" fill="url(#paint1_linear_2229_2079)" />
					<circle cx="50.1835" cy="13.1855" r="3.76164" fill="#350F42" />
					<circle cx="50.1852" cy="13.1871" r="2.8297" fill="url(#paint2_linear_2229_2079)" />
					<circle cx="50.174" cy="13.1759" r="1.4318" fill="#350F42" />
					<path
						d="M56.5654 13.1759C56.9998 13.1759 57.3563 12.8227 57.3088 12.391C57.1312 10.7766 56.4095 9.26122 55.2501 8.10178C53.9043 6.75603 52.0791 6 50.1759 6C48.2727 6 46.4475 6.75603 45.1018 8.10178C43.9423 9.26122 43.2206 10.7766 43.043 12.391C42.9955 12.8227 43.3521 13.1759 43.7864 13.1759V13.1759C44.2207 13.1759 44.5671 12.8221 44.6279 12.3921C44.7969 11.1957 45.3497 10.0782 46.2139 9.21392C47.2647 8.16313 48.6899 7.5728 50.1759 7.5728C51.662 7.5728 53.0871 8.16313 54.1379 9.21392C55.0022 10.0782 55.5549 11.1957 55.724 12.3921C55.7847 12.8221 56.1311 13.1759 56.5654 13.1759V13.1759Z"
						fill="#350F42"
					/>
					<circle cx="49.303" cy="11.7444" r="0.881105" fill="white" />
					<circle cx="51.6098" cy="15.0141" r="0.406664" fill="white" />
					<circle cx="33.1747" cy="13.1766" r="5.95593" fill="url(#paint3_linear_2229_2079)" />
					<circle cx="33.1835" cy="13.1855" r="3.76164" fill="#350F42" />
					<circle cx="33.1852" cy="13.1871" r="2.8297" fill="url(#paint4_linear_2229_2079)" />
					<circle cx="33.174" cy="13.1759" r="1.4318" fill="#350F42" />
					<path
						d="M39.5654 13.1759C39.9998 13.1759 40.3563 12.8227 40.3088 12.391C40.1312 10.7766 39.4095 9.26122 38.2501 8.10178C36.9043 6.75603 35.0791 6 33.1759 6C31.2727 6 29.4475 6.75603 28.1018 8.10178C26.9423 9.26122 26.2206 10.7766 26.043 12.391C25.9955 12.8227 26.3521 13.1759 26.7864 13.1759V13.1759C27.2207 13.1759 27.5671 12.8221 27.6279 12.3921C27.7969 11.1957 28.3497 10.0782 29.2139 9.21392C30.2647 8.16313 31.6899 7.5728 33.1759 7.5728C34.662 7.5728 36.0871 8.16313 37.1379 9.21392C38.0022 10.0782 38.5549 11.1957 38.724 12.3921C38.7847 12.8221 39.1311 13.1759 39.5654 13.1759V13.1759Z"
						fill="#350F42"
					/>
					<circle cx="32.303" cy="11.7444" r="0.881105" fill="white" />
					<circle cx="34.6098" cy="15.0141" r="0.406664" fill="white" />
				</g>
				<defs>
					<filter
						id="filter0_d_2229_2079"
						x="18.0391"
						y="0"
						width="47.2734"
						height="29.1328"
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
							result="effect1_dropShadow_2229_2079"
						/>
						<feOffset dy="2" />
						<feGaussianBlur stdDeviation="2" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0.207843 0 0 0 0 0.0588235 0 0 0 0 0.258824 0 0 0 1 0"
						/>
						<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2229_2079" />
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow_2229_2079"
							result="shape"
						/>
					</filter>
					<linearGradient
						id="paint0_linear_2229_2079"
						x1="76.6512"
						y1="15.176"
						x2="76.6512"
						y2="20"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#9D4A9D" />
						<stop offset="1" stop-color="#842F84" />
					</linearGradient>
					<linearGradient
						id="paint1_linear_2229_2079"
						x1="50.1747"
						y1="7.2207"
						x2="50.1747"
						y2="19.1326"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint2_linear_2229_2079"
						x1="50.1852"
						y1="10.3574"
						x2="50.1852"
						y2="16.0168"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#853085" />
						<stop offset="1" stop-color="#9D4A9D" />
					</linearGradient>
					<linearGradient
						id="paint3_linear_2229_2079"
						x1="33.1747"
						y1="7.2207"
						x2="33.1747"
						y2="19.1326"
						gradientUnits="userSpaceOnUse"
					>
						<stop stop-color="#EBD6EB" />
						<stop offset="0.9999" stop-color="white" />
					</linearGradient>
					<linearGradient
						id="paint4_linear_2229_2079"
						x1="33.1852"
						y1="10.3574"
						x2="33.1852"
						y2="16.0168"
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
	.animation-container {
		z-index: 11;
		width: 100%;
		height: 100%;

		position: absolute;
		transform-origin: top left;
	}
</style>
