import { Hero } from "@/components/Hero";
import { EventCard } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const events = [
  {
    title: "Festival de Jazz de Paris",
    date: "15 Juin 2024",
    location: "Parc des Expositions",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    price: "45€",
    category: "Festival"
  },
  {
    title: "Concert Rock Alternatif",
    date: "22 Juin 2024",
    location: "Zénith",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    price: "35€",
    category: "Concert"
  },
  {
    title: "Spectacle de Danse Contemporaine",
    date: "1 Juillet 2024",
    location: "Théâtre Municipal",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    price: "25€",
    category: "Spectacle"
  },
  {
    title: "Festival Électro Summer",
    date: "8 Juillet 2024",
    location: "Plage du Sud",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    price: "55€",
    category: "Festival"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-bold">Événements à venir</h2>
            <div className="flex gap-4">
              <Select defaultValue="date">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="popularity">Popularité</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Filtres</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.title} {...event} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;