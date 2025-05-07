
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xs: 'var(--radius-xs)',
				s: 'var(--radius-s)',
				m: 'var(--radius-m)',
				l: 'var(--radius-l)'
			},
			fontSize: {
				// Display types
				'display-xl': ['4rem', { lineHeight: '4.5rem', letterSpacing: '-0.02em' }],
				'display-l': ['3rem', { lineHeight: '3.5rem', letterSpacing: '-0.02em' }],
				'display-m': ['2.5rem', { lineHeight: '3rem', letterSpacing: '-0.01em' }],
				'display-s': ['2rem', { lineHeight: '2.5rem', letterSpacing: '-0.01em' }],
				
				// Heading types
				'heading-xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],
				'heading-l': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],
				'heading-m': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
				'heading-s': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
				'heading-xs': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
				
				// Body types
				'body-xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
				'body-l': ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
				'body-m': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
				'body-s': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }],
				'body-xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0' }],
			},
			boxShadow: {
				'xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
				'sm': '0 1px 3px rgba(0, 0, 0, 0.1)',
				'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
				'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
				'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
			},
			backdropBlur: {
				'xs': '0.5rem',
				's': '1rem',
				'm': '1.5rem',
				'l': '2.5rem',
				'xl': '4rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
