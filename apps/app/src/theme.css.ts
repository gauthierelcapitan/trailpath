import { createGlobalTheme, globalFontFace, style } from '@vanilla-extract/css';

const monoLisa = 'MonoLisa';

globalFontFace(monoLisa, {
  src: 'local("MonoLisa")',
});

const jetBrainsSans = 'JetBrains Mono';

globalFontFace(jetBrainsSans, {
  src: 'local("JetBrains Mono")',
});

export const theme = createGlobalTheme(':root', {
  color: {
    white: {
      500: '#FFFFFF',
    },
    imperialPurple: {
      500: '#510247',
    },
    orange: {
      50: '#FFF9F8',
      100: '#FFE8E4',
      200: '#FEC7BB',
      300: '#FDA693',
      400: '#FD856B',
      500: '#FC6443',
      600: '#FB360C',
      700: '#CC2703',
      800: '#941C02',
      900: '#5D1201',
    },
    california: {
      50: '#FDE4BA',
      100: '#FCDCA6',
      200: '#FBCD7E',
      300: '#FABD56',
      400: '#F9AE2F',
      500: '#F89E07',
      600: '#C17B05',
      700: '#8B5804',
      800: '#543602',
      900: '#1E1301',
    },
    rose: {
      50: '#FFC3DE',
      100: '#FEAFD3',
      200: '#FE86BD',
      300: '#FE5EA6',
      400: '#FD3590',
      500: '#FD0D7A',
      600: '#D0025F',
      700: '#990146',
      800: '#61012C',
      900: '#290013',
    },
    azure: {
      50: '#BCDBFE',
      100: '#A8D1FD',
      200: '#80BCFC',
      300: '#58A6FC',
      400: '#3091FB',
      500: '#087CFA',
      600: '#0461C6',
      700: '#03468F',
      800: '#022B58',
      900: '#011021',
    },
  },
  font: {
    mono: monoLisa,
    sans: jetBrainsSans,
  },
  gap: {
    none: '0',
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '40px',
  },
  screen: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
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
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
});

export const glassBackground = style({
  background: 'rgba(255, 255, 255, 0.5)',
  boxShadow: '0 0.75rem 2rem 0 rgb(0 0 0 / 10%)',
  borderRadius: '1rem',
  border: '1px solid rgba(255, 255, 255, 0.125)',
});

export const glassBackgroundHover = style({
  ':hover': {
    background: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
  },
});
