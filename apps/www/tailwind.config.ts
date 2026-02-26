import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        // Landing accent palette
        acid: 'hsl(var(--acid) / <alpha-value>)',
        phosphor: 'hsl(var(--phosphor) / <alpha-value>)',
        electric: 'hsl(var(--electric) / <alpha-value>)',
        rust: 'hsl(var(--rust) / <alpha-value>)',
        void: 'hsl(var(--void) / <alpha-value>)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        display: ['var(--font-geist-sans)', 'sans-serif'],
        'mono-custom': ['var(--font-mono-custom)', 'Courier New', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
      },
      animation: {
        'glitch-1': 'glitch-1 8s infinite',
        'glitch-2': 'glitch-2 8s infinite',
        'flicker': 'flicker 6s infinite',
        'float-geo': 'float-geo 6s ease-in-out infinite',
        'terminal-blink': 'terminal-blink 1.2s step-end infinite',
        'reveal-up': 'reveal-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'reveal-right': 'reveal-right 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        'counter-in': 'counter-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};

export default config;
