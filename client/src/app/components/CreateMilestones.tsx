import { ChangeEvent, useState } from "react";

export function CreateMilestones() {
  const [form, setForm] = useState({
    milestonesTitle: "",
    milestonesDescription: "",
    milestonesTarget: "",
  });

  const [errors, setErrors] = useState({
    milestonesTitle: "",
    milestonesDescription: "",
    milestonesTarget: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      milestonesTitle: "",
      milestonesDescription: "",
      milestonesTarget: "",
    };

    if (!form.milestonesTitle.trim()) {
      newErrors.milestonesTitle = "Title is required";
      valid = false;
    }
  };

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
    // Clear error message when user starts typing again
    setErrors({ ...errors, [fieldName]: "" });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 black">Campaign Milestones</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="milestonesTitle"
            className="block text-white font-bold mb-2"
          >
            Campaign Title
          </label>
          <input
            type="text"
            name="milestonesTitle"
            id="milestonesTitle"
            required
            value={form.milestonesTitle}
            onChange={(e) => handleFormFieldChange("milestonesTitle", e)}
            placeholder="Enter your campaign milestonesTitle here..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.milestonesTitle && "border-red-500"
            }`}
          />
          {errors.milestonesTitle && (
            <p className="text-red-500 text-xs italic">
              {errors.milestonesTitle}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
