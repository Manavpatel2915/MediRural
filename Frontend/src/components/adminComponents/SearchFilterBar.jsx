import React from 'react';
import { Search, Filter } from 'lucide-react'; // or wherever you're importing icons from

const SearchFilterBar = ({
  searchTerm,
  setSearchTerm,
  selectedCat,
  setSelectedCat,
  category = []
}) => {
  return (
    <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-3 md:space-y-0">
        <div className="border border-gray-400 rounded-lg flex items-center w-full relative">
          <Search className="absolute left-3 w-4 h-4 text-gray-500" />
          <input
            type="text"
            className="pl-10 py-1 outline-none w-full"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-6 h-6 text-gray-500" />
          <select
            name="filter"
            id="filter"
            className="border rounded-lg py-1 px-2 border-gray-500"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            {category.map((cat, idx) => (
              <option value={cat} key={idx}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
