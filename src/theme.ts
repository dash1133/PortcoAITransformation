// Brand system extracted directly from the Infinite Possibilities deck
// (InfinitePossibilitiesIntro_07102026.pdf and siblings).

export const COLORS = {
  orange: '#EB6336',
  gold: '#FDD35D',
  amber: '#FFA415',
  magenta: '#E13461',
  maroon: '#AB274F',
  teal: '#008081',

  cream: '#FFF3E4',
  offWhite: '#FAF8F6',
  white: '#FFFFFF',

  ink: '#1A1A1A',
  inkSoft: '#4A4441',
  inkMuted: '#8A8078',

  dark: '#141110',
  darkSoft: '#1F1A18',
  darkMuted: '#8C8078',
} as const;

// The 4-stop gradient of the infinity mark — used for rules, sweeps, accents.
export const BRAND_GRADIENT = `linear-gradient(90deg, ${COLORS.amber} 0%, ${COLORS.orange} 38%, ${COLORS.magenta} 70%, ${COLORS.teal} 100%)`;

export const FONT = {
  // Poppins is the closest widely-available geometric match to the deck's
  // Century Gothic. Loaded in Root.tsx.
  family: 'Poppins',
} as const;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
