import { Hero } from "@/components/Hero";
import { CategoryList } from "@/components/CategoryList";
import { EventCard } from "@/components/EventCard";

const events = [
  {
    title: "Festival de Jazz",
    date: "15 Juin 2024",
    location: "Parc des Expositions",
    image: "/placeholder.svg",
    price: "45€"
  },
  {
    title: "Concert Rock",
    date: "22 Juin 2024",
    location: "Zénith",
    image: "/placeholder.svg",
    price: "35€"
  },
  {
    title: "Spectacle de Danse",
    date: "1 Juillet 2024",
    location: "Théâtre Municipal",
    image: "/placeholder.svg",
    price: "25€"
  },
  {
    title: "Festival Électro",
    date: "8 Juillet 2024",
    location: "Plage du Sud",
    image: "/placeholder.svg",
    price: "55€"
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <main className="container mx-auto px-4 py-12 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <CategoryList />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Événements à venir</h2>
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