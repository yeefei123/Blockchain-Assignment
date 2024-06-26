"use client";

import { print } from "@/utils/toast";
import { CreateCampaign } from "./components/CreateCampaign";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
export default function Home() {
  const notify = () => {
    print("Hello World", "success");
  };

  return (
    <>
      <div className="flex flex-col min-h-screen font-sans">
        <Header />
        <CreateCampaign />
        {/* <button onClick={notify}>Click Me!!</button> */}
        <Footer />
      </div>
    </>
  );
}
