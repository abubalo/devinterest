import UserContextProvider from "@/hooks/UserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
