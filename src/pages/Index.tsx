import { Hero } from "@/components/Hero";
import { EventCard } from "@/components/EventCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { getEvents, type Event } from "@/lib/events";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [sortBy, setSortBy] = useState("date");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredEvents = events.filter((event: Event) => {
    const matchesSearch = searchTerm ? (
      event.title.toLowerCase().includes(searchTerm) ||
      event.location.toLowerCase().includes(searchTerm) ||
      event.category.toLowerCase().includes(searchTerm)
    ) : true;

    const matchesCategory = selectedCategory === "all" || event.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a: Event, b: Event) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "price":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Hero />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center text-red-600">
            Une erreur est survenue lors du chargement des événements.
          </div>
        </main>
      </div>
    );
  }

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
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="popularity">Popularité</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-[180px] h-12 bg-white border border-gray-200">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="concert">Concerts</SelectItem>
                  <SelectItem value="festival">Festivals</SelectItem>
                  <SelectItem value="spectacle">Spectacles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="h-[200px] w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            ) : (
              filteredEvents.map((event: Event) => (
                <EventCard 
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  location={event.location}
                  image_url={event.image_url}
                  price={event.price}
                  category={event.category}
                />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;