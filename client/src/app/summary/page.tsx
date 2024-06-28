"use client";
import { FormContext } from "@/context/FormContext";
import { useContext } from "react";

export default function SummaryPage() {
  const { campaignData, milestonesData } = useContext(FormContext);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 black">Summary</h1>
      <div className="w-3/4 bg-black text-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl  font-bold mb-4">Campaign Details</h2>
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
    </div>
  );
}
