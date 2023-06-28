// Custom theme for Chakra UI
import { extendTheme } from '@chakra-ui/react';

export const myTheme = extendTheme({
  colors: {
    brand: 
    {
      50: '#fbe5ff',
      100: '#e7b5ff',
      200: '#d685fb',
      300: '#c554f8',
      400: '#b525f4',
      500: '#9b0ddb',
      600: '#7907ab',
      700: '#56047b',
      800: '#35014b',
      900: '#14001d',
    },
  },
  fonts: {
    body: 'Montserrat',
    heading: 'Montserrat',
  }
});
