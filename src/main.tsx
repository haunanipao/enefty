import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { chain } from "./consts/parameters";
import { ChakraBaseProvider } from '@chakra-ui/react';
import { myTheme } from "@/theme/myTheme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThirdwebProvider activeChain={chain}>
      <ChakraBaseProvider theme={myTheme}>
        <App />
      </ChakraBaseProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
);
