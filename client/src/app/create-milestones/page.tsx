// src/app/create-milestones.tsx

"use client";

import { FormContext } from "@/context/FormContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

type MilestoneData = {
  [key: string]: string | number;
} & {
  title: string;
  description: string;
  amount: string;
  startDate: string;
  endDate: string;
};

export default function CreateMilestonesPage() {
  const searchParams = useSearchParams();
  const milestonesCount = Number(searchParams?.get("milestones") || 1);
  const router = useRouter();

  const { milestonesData, setMilestonesData } = useContext(FormContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [localMilestones, setLocalMilestones] = useState(
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

  const handleFormFieldChange = (
    index: number,
    fieldName: string,
    value: string
  ) => {
    const newMilestones = [...localMilestones];
    newMilestones[index][fieldName] = value;
    setLocalMilestones(newMilestones);
  };

  const validateStep = () => {
    const milestone = localMilestones[currentStep];
    const errors = {
      title: "",
      description: "",
      amount: "",
      startDate: "",
      endDate: "",
    };
    let valid = true;

    if (!milestone.title.trim()) {
      errors.title = "Milestone Title is required";
      valid = false;
    }
    if (!milestone.description.trim()) {
      errors.description = "Milestone Description is required";
      valid = false;
    }
    if (!milestone.amount.trim() || isNaN(Number(milestone.amount))) {
      errors.amount = "Valid Target Amount (in ETH) is required";
      valid = false;
    }
    if (!milestone.startDate.trim()) {
      errors.startDate = "Start Date is required";
      valid = false;
    }
    if (!milestone.endDate.trim()) {
      errors.endDate = "End Date is required";
      valid = false;
    }

    return { valid, errors };
  };

  const handleNext = () => {
    const { valid, errors } = validateStep();
    if (!valid) {
      // Handle errors (you could use state to show error messages)
      return;
    }
    if (currentStep < milestonesCount - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setMilestonesData(localMilestones);
      router.push("/summary");
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 black">Create Milestones</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col w-3/4 bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-white font-bold mb-2">
            Milestone Title
          </label>
          <input
            type="text"
            id="title"
            value={localMilestones[currentStep].title}
            onChange={(e) =>
              handleFormFieldChange(currentStep, "title", e.target.value)
            }
            placeholder="Enter milestone title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white font-bold mb-2"
          >
            Milestone Description
          </label>
          <textarea
            id="description"
            value={localMilestones[currentStep].description}
            onChange={(e) =>
              handleFormFieldChange(currentStep, "description", e.target.value)
            }
            placeholder="Enter milestone description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-white font-bold mb-2">
            Target Amount (in ETH)
          </label>
          <input
            type="number"
            id="amount"
            value={localMilestones[currentStep].amount}
            onChange={(e) =>
              handleFormFieldChange(currentStep, "amount", e.target.value)
            }
            placeholder="Enter target amount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-white font-bold mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={localMilestones[currentStep].startDate}
            onChange={(e) =>
              handleFormFieldChange(currentStep, "startDate", e.target.value)
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="endDate" className="block text-white font-bold mb-2">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={localMilestones[currentStep].endDate}
            onChange={(e) =>
              handleFormFieldChange(currentStep, "endDate", e.target.value)
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-between">
          {currentStep > 0 && (
            <button
              type="button"
              onClick={handlePrev}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {currentStep < milestonesCount - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
