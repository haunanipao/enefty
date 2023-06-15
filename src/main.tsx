import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { chain } from "./consts/parameters";
import { ChakraBaseProvider, extendTheme } from '@chakra-ui/react';

const colors = {
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
}
const fonts = {
  body: 'Montserrat',
  heading: 'Montserrat',
}
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ colors, fonts, config });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={chain}>
      <ChakraBaseProvider theme={theme}>
        <App />
      </ChakraBaseProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
);
