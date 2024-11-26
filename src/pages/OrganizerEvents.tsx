import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const OrganizerEvents = () => {
  const events = [
    {
      id: "1",
      title: "Festival de Jazz",
      date: "2024-06-15",
      ticketsSold: 150,
      capacity: 500,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Événements</h1>
        <Link to="/organizer/events/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel Événement
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">Date: {event.date}</p>
                <p className="text-gray-600">
                  Tickets vendus: {event.ticketsSold}/{event.capacity}
                </p>
                <div className="flex justify-end">
                  <Link to={`/organizer/events/${event.id}`}>
                    <Button variant="outline">Gérer</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrganizerEvents;