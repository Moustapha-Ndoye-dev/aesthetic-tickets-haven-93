import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 shadow-lg">
      <div className="text-center mb-4">
        <h2 className="text-xl text-white font-medium">Découvrez des événements incroyables</h2>
        <p className="text-white/80 mt-2">Concerts, spectacles, festivals et plus encore</p>
      </div>
      <div className="flex gap-4 justify-center">
        <Button 
          variant="secondary"
          className="px-6 py-2 bg-white/90 hover:bg-white text-gray-800 font-medium"
          onClick={() => onSearch("concert")}
        >
          Concerts
        </Button>
        <Button 
          variant="secondary"
          className="px-6 py-2 bg-white/90 hover:bg-white text-gray-800 font-medium"
          onClick={() => onSearch("festival")}
        >
          Festivals
        </Button>
        <Button 
          variant="secondary"
          className="px-6 py-2 bg-white/90 hover:bg-white text-gray-800 font-medium"
          onClick={() => onSearch("spectacle")}
        >
          Spectacles
        </Button>
      </div>
    </div>
  );
};