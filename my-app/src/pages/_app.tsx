import Layout from "@/components/Layout/Layout";
import { UserProvider } from "@/context/UserContext";
import { OrderProvider } from "@/context/OrderContext";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/home.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <OrderProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </OrderProvider>
    </UserProvider>
  );
}
