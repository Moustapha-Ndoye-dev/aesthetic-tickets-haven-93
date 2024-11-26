import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log("Recherche:", searchTerm);
  };

  return (
    <div className="flex gap-4 w-full max-w-4xl">
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Rechercher un événement..."
          className="w-full pl-12 h-12"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      
      <Button className="h-12 px-8 bg-primary hover:bg-primary/90" onClick={handleSearch}>
        Rechercher
      </Button>
    </div>
  );
};