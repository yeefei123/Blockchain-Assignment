import { print } from "@/utils/toast";
import { CreateCampaign } from "./components/CreateCampaign";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";

export default function Home() {
  const notify = () => {
    print("Hello World", "success");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <CreateCampaign />
        </main>
        <Footer />
      </div>
    </>
  );
}
