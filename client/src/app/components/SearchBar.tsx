import { AiOutlineSearch } from "react-icons/ai";

export function SearchBar() {
  return (
    <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
      <input
        type="text"
        placeholder="Search for campaigns"
        className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
      />

      <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
        <AiOutlineSearch className="text-white text-[20px]" />
      </div>
    </div>
  );
}
