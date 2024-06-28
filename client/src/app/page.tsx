import { print } from "@/utils/toast";
import CreateCampaignPage from "./create-campaign/page";

export default function Home({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notify = () => {
    print("Hello World", "success");
  };

  return <CreateCampaignPage />;
}
