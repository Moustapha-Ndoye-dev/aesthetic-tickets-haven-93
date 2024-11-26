import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EventForm } from "@/components/EventForm";
import { EventFormEdit } from "@/components/EventFormEdit";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const OrganizerEvents = () => {
  const { toast } = useToast();
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Festival de Jazz",
      date: "2024-06-15",
      ticketsSold: 150,
      capacity: 500,
    },
  ]);

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setShowEditForm(true);
  };

  const handleDelete = (id: string) => {
    setSelectedEventId(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedEventId) {
      setEvents(events.filter(event => event.id !== selectedEventId));
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès",
      });
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Événements</h1>
        <Button onClick={() => setShowEventForm(true)} className="whitespace-nowrap">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Événement
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-white">
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
                  <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Modifier
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(event.id)}
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

      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="sm:max-w-3xl mx-4">
          <EventForm />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-3xl mx-4">
          {selectedEvent && (
            <EventFormEdit event={selectedEvent} onClose={() => setShowEditForm(false)} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrganizerEvents;