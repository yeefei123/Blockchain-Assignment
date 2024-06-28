import { FormProvider } from "@/context/FormContext";
import Web3ModalProvider from "@/context/web3";
import { config } from "@/utils/web3";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen font-sans">
          <Web3ModalProvider initialState={initialState}>
            <Header />
            <Navbar />
            <FormProvider>{children}</FormProvider>
            <Footer />
          </Web3ModalProvider>
        </div>
      </body>
    </html>
  );
}
