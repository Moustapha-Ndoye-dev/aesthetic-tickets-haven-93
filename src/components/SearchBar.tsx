import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative max-w-xl w-full">
      <input
        type="text"
        placeholder="Rechercher un événement..."
        className="w-full px-4 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>
  );
};