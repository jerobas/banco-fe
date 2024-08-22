import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "styled-components";

import "react-toastify/dist/ReactToastify.css";
import RoutesPage from "./routes/index.jsx";
import GlobalStyles from "./styles/global.styles";
import { globalTheme } from "./styles/theme/global.theme";

function App() {
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyles />
      <ToastContainer />
      <RoutesPage />
    </ThemeProvider>
  );
}

export default App;
