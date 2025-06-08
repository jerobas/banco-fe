import { ToastContainer } from "react-toastify";
import RoutesPage from "./routes/index.jsx";
import { useEffect } from "react";
import { setSocketToastifyConnection } from "./utils/index.js";

import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/global.styles";
import { globalTheme } from "./styles/theme/global.theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  useEffect(setSocketToastifyConnection, [])

  return <ThemeProvider theme={globalTheme}>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ToastContainer aria-label={undefined} />
      <RoutesPage />
    </QueryClientProvider>
  </ThemeProvider>
}

export default App;