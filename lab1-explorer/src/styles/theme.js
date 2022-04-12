import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4252AF',
      light: '#18A0FB'
    },
    secondary: { main: '#FF2C55' },
    error: { main: '#F12B2C' },
    success: { main: '#29CC97' },
    warning: { main: '#FEC400' },
    info: {
      main: '#18A0FB',
      light: '#D1ECFE'
    },
    background: {
      default: '#F0F0F2'
    },
    grey: {
      20: 'rgba(0, 0, 0, .26)',
      40: 'rgba(0, 0, 0, .36)',
      50: '#E1E3E6',
      75: '#8887AE',
      100: '#C0BEFF',
      200: '#A8A6E6',
      300: '#8887AE',
      500: '#70738F',
      600: '#5A6474',
      700: '#3F4B63'
    },
    text: {
      primary: '#0E1428',
      secondary: '#83859E',
      hint: '#9FA2B4'
    }
  },
  typography: {
    fontFamily: 'Open Sans'
  }
});
