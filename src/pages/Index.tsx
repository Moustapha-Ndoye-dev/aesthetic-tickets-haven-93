import { Hero } from "@/components/Hero";
import { EventCard } from "@/components/EventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const events = [
  {
    id: "1",
    title: "Festival de Jazz de Paris",
    date: "15 Juin 2024",
    location: "Parc des Expositions",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: "45",
    category: "festival"
  },
  {
    id: "2",
    title: "Concert Rock Alternatif",
    date: "22 Juin 2024",
    location: "Zénith",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    price: "35",
    category: "concert"
  },
  {
    id: "3",
    title: "Spectacle de Danse Contemporaine",
    date: "1 Juillet 2024",
    location: "Théâtre Municipal",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    price: "25",
    category: "spectacle"
  },
  {
    id: "4",
    title: "Festival Électro Summer",
    date: "8 Juillet 2024",
    location: "Plage du Sud",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: "55",
    category: "festival"
  },
];

const Index = () => {
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sorted = [...events];
    
    if (selectedCategory !== "all") {
      sorted = sorted.filter(event => event.category === selectedCategory);
    }
    
    switch (value) {
      case "date":
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "price":
        sorted.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
      case "popularity":
        // Pour l'exemple, on garde l'ordre actuel
        break;
    }
    
    setFilteredEvents(sorted);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    let filtered = [...events];
    
    if (category !== "all") {
      filtered = filtered.filter(event => event.category === category);
    }
    
    // Appliquer le tri actuel
    switch (sortBy) {
      case "date":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "price":
        filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
        break;
    }
    
    setFilteredEvents(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">Événements à venir</h2>
            <div className="flex gap-4">
              <Select value={sortBy} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px] h-12 bg-white border border-gray-200">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="popularity">Popularité</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px] h-12 bg-white border border-gray-200">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="concert">Concerts</SelectItem>
                  <SelectItem value="festival">Festivals</SelectItem>
                  <SelectItem value="spectacle">Spectacles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id}
                {...event}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;