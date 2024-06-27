import { print } from "@/utils/toast";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import CreateCampaignPage from "./create-campaign/page";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notify = () => {
    print("Hello World", "success");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen font-sans">
        <main className="flex-grow container mx-auto px-4 py-8">
          <Header />
          <Navbar />
          {children || <CreateCampaignPage />}
        </main>
        <Footer />
      </div>
    </>
  );
}
