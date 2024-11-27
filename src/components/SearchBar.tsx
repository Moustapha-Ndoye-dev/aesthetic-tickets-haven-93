import { Search } from "lucide-react";
import { Input } from "./ui/input";
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
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <Input
        type="text"
        placeholder="Rechercher un événement..."
        className="w-full pl-12 h-12 text-lg bg-white/90 backdrop-blur-sm border-2 focus:border-primary"
        value={searchTerm}
        onChange={handleChange}
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Button 
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-9"
      >
        Rechercher
      </Button>
    </form>
  );
};