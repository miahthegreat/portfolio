import { ThemeProvider } from "next-themes";
import AppLayout from "../components/Layouts/AppLayout";
import { StateContext } from "../context/StateContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <StateContext>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </StateContext>
    </ThemeProvider>
  );
}

export default MyApp;
