import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { EventForm } from "@/components/EventForm";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const OrganizerEvents = () => {
  const { toast } = useToast();
  const [showEventForm, setShowEventForm] = useState(false);
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Festival de Jazz",
      date: "2024-06-15",
      ticketsSold: 150,
      capacity: 500,
    },
  ]);

  const handleDelete = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Événement supprimé",
      description: "L'événement a été supprimé avec succès",
      className: "bg-white border border-gray-200",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Mes Événements</h1>
        <Button onClick={() => setShowEventForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Événement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="bg-white">
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600">Date: {event.date}</p>
                <p className="text-gray-600">
                  Tickets vendus: {event.ticketsSold}/{event.capacity}
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="max-w-4xl bg-white">
          <EventForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrganizerEvents;