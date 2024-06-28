import { FormProvider } from "@/context/FormContext";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen font-sans">
          <Header />
          <Navbar />
          <FormProvider>{children}</FormProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
