import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = () => {
    console.log("Recherche avec:", { searchTerm, category });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl">
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
      
      <Select 
        value={category} 
        onValueChange={setCategory}
      >
        <SelectTrigger className="w-[180px] h-12 bg-white border border-gray-200">
          <SelectValue placeholder="Catégorie" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200">
          <SelectItem value="all">Toutes les catégories</SelectItem>
          <SelectItem value="concert">Concerts</SelectItem>
          <SelectItem value="festival">Festivals</SelectItem>
          <SelectItem value="theatre">Théâtre</SelectItem>
          <SelectItem value="sport">Sport</SelectItem>
        </SelectContent>
      </Select>

      <Button className="h-12 px-8" onClick={handleSearch}>
        Rechercher
      </Button>
    </div>
  );
};