import { ChangeEvent, useState } from "react";
export function CreateCampaign() {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log("Form submitted:", form);
    // Example: Call API to create campaign
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Create Campaign</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="target"
            className="block text-gray-700  font-bold mb-2"
          >
            Target Amount
          </label>
          <input
            type="number"
            name="target"
            id="target"
            required
            value={form.target}
            onChange={(e) => handleFormFieldChange("target", e)}
            placeholder="Enter your target amount here..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-2">
            <label
              htmlFor="startDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              required
              name="startDate"
              id="startDate"
              value={form.startDate}
              onChange={(e) => handleFormFieldChange("startDate", e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="w-1/2 ml-2">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-xl focus:outline-none focus:shadow-outline"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
