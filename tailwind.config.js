// tailwind.config.js
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			white: '#fefefe',
  			baseDark: '#474451',
  			baseBlue: '#4e6e89',
  			accentRed: '#e96d60',
  			accentTeal: '#4daf9f',
  			accentYellow: '#ebc138',
  			grayLight: '#ced0d0',
  			accentBeige: '#d8b09e',
  			borderBeige: '#78716B',
  			mordalSubInfo: '#D6D3D1',
  			avgLine: '#C2BBB5',
  			chartLine: '#78716B',
  			chartMedian: '#D89FBD',
  			modalBaseFont: '#312821',
  			modalBaseFont_pale: '#78716B',
  			cardBaseFont: '#312821',
  			cardBaseFont_pale: '#78716B',
  			cardBaseFont_palemore: '#76716C',
  			cardLinkFont: '#386FAA',
			sliderColor: '#312821',
			sliderColor_pale: '#78716B',
			contentsBgColor : '#D0D0D0',
			underLineColor : '#D0D0D0',
			buttonBG:'#CFC8C2',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			kosugi: [
  				'Kosugi',
  				'sans-serif'
  			],
  			noto: [
  				'Noto Sans JP',
  				'sans-serif'
  			],
  			crimson: [
  				'Crimson Text',
  				'sans-serif'
  			],
  			roboto: [
  				'Roboto',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			growBar: {
  				'0%': {
  					transform: 'scaleX(0)'
  				},
  				'100%': {
  					transform: 'scaleX(1)'
  				}
  			}
  		},
  		animation: {
  			growBar: 'growBar 0.7s ease-out forwards'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};