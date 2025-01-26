import { MdOutlineSearch } from "react-icons/md";

function Search() {
  return (
    <div className="flex items-center px-4 py-2 h-8 w-44 border text-xs text-gray-200 shadow-md rounded-md focus:outline-none bg-white">
      <MdOutlineSearch size={22} className="text-gray-400 mr-2" />
      <input
        type="text"
        placeholder="Procurar..."
        className="border text-xs h-full w-full rounded-sm border-none focus:outline-none  text-gray-700 bg-white"
      />
    </div>
  );
}

export default Search;
