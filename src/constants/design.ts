export const DESIGN_TOKENS = {
  // Spacing scale
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },
  
  // Border radius
  radius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  
  // Typography scale
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  
  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  
  // Line heights
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  
  // Transitions
  transition: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  
  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    navbar: 30,
    modal: 40,
    popover: 50,
    tooltip: 60,
    cursor: 9998,
    noise: 9999,
  },
} as const;

export const ANIMATION_CONFIG = {
  // Stagger delays
  stagger: {
    fast: 50,
    normal: 100,
    slow: 150,
  },
  
  // Duration
  duration: {
    fast: 0.3,
    normal: 0.5,
    slow: 0.8,
  },
  
  // Easing
  easing: {
    smooth: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    sharp: [0.4, 0, 0.6, 1],
  },
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  '2k': 1536,
  '4k': 2560,
} as const;

export const SCROLL_CONFIG = {
  smooth: true,
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
} as const;