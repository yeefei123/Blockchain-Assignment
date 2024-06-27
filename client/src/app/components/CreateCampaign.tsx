"use client";

import { ethers } from "ethers";
import { ChangeEvent, useState } from "react";
import Crowdfunding from "../../abi/Crowdfunding.json";

export function CreateCampaign() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    milestones: "",
    images: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    milestones: "",
    images: "",
  });

  const [isCreated, setIsCreated] = useState(false); // State to track if campaign is successfully created

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [fieldName]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      description: "",
      milestones: "",
      images: "",
    };

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!form.description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (
      !form.milestones.trim() ||
      isNaN(Number(form.milestones)) ||
      Number(form.milestones) <= 0
    ) {
      newErrors.milestones = "Valid number of milestones is required";
      valid = false;
    }
    // if (!form.endDate) {
    //   newErrors.endDate = "End Date is required";
    //   valid = false;
    // } else {
    //   const endDate = new Date(form.endDate);
    //   const today = new Date();
    //   if (endDate <= today) {
    //     newErrors.endDate = "End Date must be in the future";
    //     valid = false;
    //   }
    // }
    if (!form.images.trim() || !isValidUrl(form.images.trim())) {
      newErrors.images = "Valid image URL is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        alert("Please install MetaMask");
        setIsLoading(false);
        return;
      }

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Initialize ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Contract address of the deployed Crowdfunding contract
      const contractAddress = "0xa0876C0BaBa010b3Bc1d22746d374089793DFD26";
      const contract = new ethers.Contract(
        contractAddress,
        Crowdfunding.abi,
        signer
      );

      // Prepare the data
      const title = form.title;
      const description = form.description;
      // const target = ethers.utils.parseUnits(form.target, 18); // Adjust based on your token's decimals
      const milestones = form.milestones;
      // const deadline = Math.floor(new Date(form.endDate).getTime() / 1000);
      const images = form.images;

      // Call createCampaign function
      const transaction = await contract.createCampaign(
        await signer.getAddress(), // _owner
        title,
        description,
        milestones,
        // target,
        // deadline,
        images
      );

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log("Campaign created:", transaction);
      setIsCreated(true); // Set state to indicate campaign is successfully created
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("There was an error creating the campaign.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 black">Create Campaign</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-white font-bold mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={form.title}
            onChange={(e) => handleFormFieldChange("title", e)}
            placeholder="Enter your campaign title here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title && "border-red-500"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">{errors.title}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-white font-bold mb-2"
          >
            Campaign Description
          </label>
          <textarea
            name="description"
            id="description"
            required
            value={form.description}
            onChange={(e) => handleFormFieldChange("description", e)}
            placeholder="Enter your campaign description here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.description && "border-red-500"
            }`}
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">{errors.description}</p>
          )}
        </div>

        {/* <div className="mb-4">
          <label htmlFor="target" className="block text-white font-bold mb-2">
            Target Amount (in ETH)
          </label>
          <input
            type="number"
            name="target"
            id="target"
            required
            value={form.target}
            onChange={(e) => handleFormFieldChange("target", e)}
            placeholder="Enter your target amount here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.target && "border-red-500"
            }`}
          />
          {errors.target && (
            <p className="text-red-500 text-xs italic">{errors.target}</p>
          )}
        </div> */}

        {/* <div className="mb-4">
          <label
            htmlFor="endDate"
            className="block text-gray-700 font-bold mb-2"
          >
            End Date
          </label>
          <input
            type="date"
            required
            name="endDate"
            id="endDate"
            value={form.endDate}
            onChange={(e) => handleFormFieldChange("endDate", e)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.endDate && "border-red-500"
            }`}
          />
          {errors.endDate && (
            <p className="text-red-500 text-xs italic">{errors.endDate}</p>
          )}
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="milestones"
            className="block text-white font-bold mb-2"
          >
            Number of milestones
          </label>
          <input
            type="number"
            name="milestones"
            id="milestones"
            required
            value={form.milestones}
            onChange={(e) => handleFormFieldChange("target", e)}
            placeholder="Enter your milestone amount here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.milestones && "border-red-500"
            }`}
          />
          {errors.milestones && (
            <p className="text-red-500 text-xs italic">{errors.milestones}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-white font-bold mb-2">
            Image Url
          </label>
          <input
            type="text"
            name="images"
            id="images"
            required
            value={form.images}
            onChange={(e) => handleFormFieldChange("images", e)}
            placeholder="Enter your image URL here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.images && "border-red-500"
            }`}
          />
          {errors.images && (
            <p className="text-red-500 text-xs italic">{errors.images}</p>
          )}
        </div>

        {/* Conditional rendering based on campaign creation status */}
        {isCreated ? (
          <button
            type="submit"
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
            disabled
          >
            Created Successfully
          </button>
        ) : (
          <button
            type="submit"
            className={`mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline ${
              isLoading && "opacity-50 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        )}
      </form>
    </div>
  );
}
