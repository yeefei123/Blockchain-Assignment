"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreateMilestonesPage() {
  const searchParams = useSearchParams();

  const form = {
    title: searchParams?.get("title") || "",
    description: searchParams?.get("description") || "",
    milestones: searchParams?.get("milestones") || "",
    images: searchParams?.get("images") || "",
  };

  const [errors, setErrors] = useState({
    milestonestitle: "",
    milestonesdesc: "",
    milestonesAmt: "",
    startDate: "",
    endDate: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm2({ ...form2, [fieldName]: e.target.value });
    setErrors({ ...errors, [fieldName]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      milestonestitle: "",
      milestonesdesc: "",
      milestonesAmt: "",
      startDate: "",
      endDate: "",
    };

    if (!form2.milestonestitle.trim()) {
      newErrors.milestonestitle = "Milestone Title is required";
      valid = false;
    }

    if (!form2.milestonesdesc.trim()) {
      newErrors.milestonesdesc = "Milestone Description is required";
      valid = false;
    }

    if (!form2.milestonesAmt.trim() || isNaN(Number(form2.milestonesAmt))) {
      newErrors.milestonesAmt = "Valid Target Amount (in ETH) is required";
      valid = false;
    }

    if (!form2.startDate.trim()) {
      newErrors.startDate = "Start Date is required";
      valid = false;
    }

    if (!form2.endDate.trim()) {
      newErrors.endDate = "End Date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [form2, setForm2] = useState({
    milestonestitle: "",
    milestonesdesc: "",
    milestonesAmt: "",
    startDate: "",
    endDate: "",
  });

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 black">Create Milestones</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="milestonestitle"
            className="block text-white font-bold mb-2"
          >
            Milestone Title
          </label>
          <input
            type="milestonestitle"
            name="milestonestitle"
            id="milestonestitle"
            value={form2.milestonestitle}
            onChange={(e) => handleFormFieldChange("milestonestitle", e)}
            placeholder="Enter your milestone title here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.milestonestitle && "border-red-500"
            }`}
          />
          {errors.milestonestitle && (
            <p className="text-red-500 text-xs italic">
              {errors.milestonestitle}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="milestonesdesc"
            className="block text-white font-bold mb-2"
          >
            Milestone Description
          </label>
          <input
            type="milestonesdesc"
            name="milestonesdesc"
            id="milestonesdesc"
            value={form2.milestonesdesc}
            onChange={(e) => handleFormFieldChange("milestonesdesc", e)}
            placeholder="Enter your milestone description here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.milestonesdesc && "border-red-500"
            }`}
          />
          {errors.milestonesdesc && (
            <p className="text-red-500 text-xs italic">
              {errors.milestonesdesc}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="milestonesAmt"
            className="block text-white font-bold mb-2"
          >
            Target Amount (in ETH)
          </label>
          <input
            type="number"
            name="milestonesAmt"
            id="milestonesAmt"
            value={form2.milestonesAmt}
            onChange={(e) => handleFormFieldChange("milestonesAmt", e)}
            placeholder="Enter your target amount here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.milestonesAmt && "border-red-500"
            }`}
          />
          {errors.milestonesAmt && (
            <p className="text-red-500 text-xs italic">
              {errors.milestonesAmt}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="startDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            value={form2.startDate}
            onChange={(e) => handleFormFieldChange("startDate", e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.startDate && "border-red-500"
            }`}
          />
          {errors.startDate && (
            <p className="text-red-500 text-xs italic">{errors.startDate}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-gray-700 font-bold mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={form2.endDate}
            onChange={(e) => handleFormFieldChange("endDate", e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.endDate && "border-red-500"
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs italic">{errors.endDate}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
