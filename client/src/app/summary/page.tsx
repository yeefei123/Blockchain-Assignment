"use client";
import { FormContext } from "@/context/FormContext";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import Web3Modal from "web3modal";
import Crowdfunding from "../../abi/Crowdfunding.json";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions: {}, // add any additional providers here
});

export default function SummaryPage() {
  const { campaignData, milestonesData } = useContext(FormContext);
  const milestonesCount = parseInt(campaignData.milestones, 10);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const [localMilestones, setLocalMilestones] = useState(() =>
    milestonesData.length > 0
      ? milestonesData
      : Array.from({ length: milestonesCount }, () => ({
          title: "",
          description: "",
          amount: "",
          startDate: "",
          endDate: "",
        }))
  );

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      "Please check the campaign details carefully before submitting your campaign."
    );

    if (!confirmed) {
      return; // If not confirmed, do nothing
    }

    setLoading(true);

    try {
      const web3 = await web3Modal.connect();

      // Check if MetaMask is installed and connected
      if (!window.ethereum) {
        alert("Please install MetaMask");
        setLoading(false);
        return;
      }

      if (!window.ethereum.isConnected()) {
        alert("Please connect your wallet.");
        setLoading(false);
        return;
      }

      // Initialize ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractAddress =
        process.env.NEXT_PUBLIC_CROWDFUNDING_CONTRACT_ADDRESS;

      if (!contractAddress) {
        console.error("Crowdfunding contract address is not defined.");
        setLoading(false);
        return;
      }

      const contract = new ethers.Contract(
        contractAddress,
        Crowdfunding.abi,
        signer
      );

      // Prepare milestones data
      const milestones = localMilestones.map((milestone, index) => ({
        id: index,
        campaignId: 0, // This will be set in the contract
        milestonetitle: milestone.title,
        milestonedescription: milestone.description,
        targetAmt: ethers.utils.parseEther(milestone.amount),
        startDate: new Date(milestone.startDate).getTime(),
        endDate: new Date(milestone.endDate).getTime(),
      }));

      // Assuming milestones are passed as an array
      const createCampaignTx = await contract.createCampaign(
        campaignData.title,
        campaignData.desc,
        milestonesCount,
        campaignData.images,
        milestones
      );

      // Wait for the transaction to be mined
      await createCampaignTx.wait();

      alert("Campaign created successfully!");
      // Reset form data or navigate to another page
      router.push("/create-campaign");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Failed to create campaign. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-black">Summary</h1>

      {/* Campaign Details */}
      <div className="w-3/4 bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Campaign Details</h2>
        <p>
          <strong>Title:</strong> {campaignData.title}
        </p>
        <p>
          <strong>Description:</strong> {campaignData.desc}
        </p>
        <p>
          <strong>Milestones:</strong> {campaignData.milestones}
        </p>
        <p>
          <strong>Images:</strong> {campaignData.images}
        </p>
      </div>

      {/* Milestones Details */}
      <div className="w-3/4 bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Milestones Details</h2>
        {milestonesData.map((milestone, index) => (
          <div key={index} className="mb-4">
            <p>
              <strong>Title:</strong> {milestone.title}
            </p>
            <p>
              <strong>Description:</strong> {milestone.description}
            </p>
            <p>
              <strong>Amount:</strong> {milestone.amount}
            </p>
            <p>
              <strong>Start Date:</strong> {milestone.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {milestone.endDate}
            </p>
          </div>
        ))}
      </div>

      {!isLoading && (
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-blue-500 mb-5 hover:bg-gray-700 text-white font-bold py-2 px-20 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      )}

      {isLoading && (
        <div className="mt-2 mb-5 flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-20 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-gray-500 font-bold">Loading...</span>
        </div>
      )}
    </div>
  );
}
