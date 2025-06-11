import { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Background } from "./components/Background/index.js";
import RoutesPage from "./routes/index.jsx";
import { globalTheme } from "./styles/theme/global.theme";
import { setSocketToastifyConnection } from "./utils/index.js";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();

  return (
    <Background route={location.pathname}>
      <RoutesPage />
    </Background>
  );
};

const App = () => {
  useEffect(setSocketToastifyConnection, []);

  return (
    <ThemeProvider theme={globalTheme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ToastContainer aria-label={undefined} />
          <AppContent />
        </Router>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
