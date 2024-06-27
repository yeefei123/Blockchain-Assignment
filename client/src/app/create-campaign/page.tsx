"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreateCampaignPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    milestones: "",
    images: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    milestones: "",
    images: "",
  });
  const router = useRouter();

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
    setErrors({ ...errors, [fieldName]: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      title: "",
      desc: "",
      milestones: "",
      images: "",
    };

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    }
    if (!form.desc.trim()) {
      newErrors.desc = "Description is required";
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
    if (Number(form.milestones) > 5) {
      newErrors.milestones = "Maximum number of milestones is 5";
      valid = false;
    }
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const query = new URLSearchParams(form).toString();
    router.push(`/create-milestones?${query}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 black">Create Campaign</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Form fields */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-white font-bold mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
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
          <label htmlFor="desc" className="block text-white font-bold mb-2">
            Campaign Description
          </label>
          <input
            type="text"
            name="desc"
            id="desc"
            value={form.desc}
            onChange={(e) => handleFormFieldChange("desc", e)}
            placeholder="Enter your campaign description here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.desc && "border-red-500"
            }`}
          />
          {errors.desc && (
            <p className="text-red-500 text-xs italic">{errors.desc}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="milestones"
            className="block text-white font-bold mb-2"
          >
            Number of milestones (max 5)
          </label>
          <input
            type="number"
            name="milestones"
            id="milestones"
            value={form.milestones}
            onChange={(e) => handleFormFieldChange("milestones", e)}
            placeholder="Enter your number of milestones here..."
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
            value={form.images}
            onChange={(e) => handleFormFieldChange("images", e)}
            placeholder="Enter your image url here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.images && "border-red-500"
            }`}
          />
          {errors.images && (
            <p className="text-red-500 text-xs italic">{errors.images}</p>
          )}
        </div>
        {!loading && (
          <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline">
            Next
          </button>
        )}
        {loading && (
          <button className="mt-2 bg-gray-500 hover:bg-green-700 text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline">
            Loading ...
          </button>
        )}
      </form>
    </div>
  );
}
