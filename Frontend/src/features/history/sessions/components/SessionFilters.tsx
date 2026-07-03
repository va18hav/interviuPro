import { Search } from 'lucide-react';

export default function SessionFilters() {
  const filters = [
    { name: 'All Sessions', active: true },
    { name: 'Technical', active: false },
    { name: 'System Design', active: false }
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2.5">
        {filters.map((filter) => (
          <button
            key={filter.name}
            type="button"
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all ${filter.active
                ? 'text-[#00E599] border-[#00E599]/35 bg-[#00E599]/5'
                : 'text-gray-400 border-gray-800 hover:text-gray-300 hover:bg-gray-800/20'
              }`}
          >
            {filter.name}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="relative flex items-center max-w-xs w-full sm:w-64">
        <Search className="absolute left-3 w-4 h-4 text-gray-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search interviews..."
          disabled
          className="w-full bg-[#111623]/40 border border-gray-800 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none cursor-not-allowed"
        />
      </div>
    </div>
  );
}
