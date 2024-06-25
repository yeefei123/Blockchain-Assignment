export function CreateCampaign() {
  return (
    <div className="text-center items-center">
      <h1>Create Campaign</h1>
      <div className="flex flex-row mr-5">
        <div>
          <label htmlFor="title">Campaign Title</label>

          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter your campaign title here..."
          />
        </div>
      </div>
      <div className="flex flex-row mr-5">
        <label htmlFor="desc">Campaign Description</label>

        <input
          type="text"
          name="desc"
          id="desc"
          placeholder="Enter your campaign description here..."
        />
      </div>
      <div>
        <div className="flex flex-row mr-5">
          <label htmlFor="target">Target Amount</label>

          <input
            type="price"
            name="target"
            id="target"
            placeholder="Enter your target amount here..."
          />
        </div>
      </div>

      <button type="submit" name="submit" className="rounded bg-blue">
        Submit
      </button>
    </div>
  );
}
