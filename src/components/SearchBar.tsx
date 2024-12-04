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
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="relative w-full max-w-2xl mx-auto"
    >
      <Button 
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-9"
      >
        Rechercher
      </Button>
    </form>
  );
};