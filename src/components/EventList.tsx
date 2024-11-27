import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  ticketsSold: number;
  capacity: number;
  image: string;
}

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export const EventList = ({ events, onEdit, onDelete }: EventListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {events.map((event) => (
        <Card key={event.id} className="bg-white overflow-hidden">
          <div className="aspect-video relative">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{event.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Date: {event.date}</p>
              <p className="text-sm text-gray-600">
                Tickets vendus: {event.ticketsSold}/{event.capacity}
              </p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => onEdit(event)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => onDelete(event.id)}
                >
                  <Trash className="w-4 h-4 mr-1" />
                  Supprimer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};