import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "@/components/Header";
import { AlertProvider } from "@/context/useAlert";
import { TopThreeProvider } from "@/context/useTopThree";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <TopThreeProvider>
          <CssBaseline />
          <AlertProvider>
            <Header />
            <Component {...pageProps} />
          </AlertProvider>
        </TopThreeProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
