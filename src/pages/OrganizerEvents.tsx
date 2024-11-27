import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Plus, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EventForm } from "@/components/EventForm";
import { EventFormEdit } from "@/components/EventFormEdit";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useQuery } from "@tanstack/react-query";

const OrganizerEvents = () => {
  const { toast } = useToast();
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  // Récupération des tokens
  const { data: tokens } = useQuery({
    queryKey: ['tokens'],
    queryFn: async () => {
      const response = await fetch('/api/admin/tokens');
      if (!response.ok) throw new Error('Failed to fetch tokens');
      return response.json();
    }
  });

  // Invalider un token
  const invalidateToken = async (token: string) => {
    try {
      const response = await fetch('/api/admin/tokens/invalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) throw new Error('Failed to invalidate token');

      toast({
        title: "Token invalidé",
        description: "Le token a été invalidé avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'invalider le token",
      });
    }
  };

  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Festival de Jazz",
      date: "2024-06-15",
      ticketsSold: 150,
      capacity: 500,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
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

      {/* Liste des événements */}
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

      {/* Section des tokens */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tokens QR Code</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens?.map((token: { token: string; isValid: boolean }) => (
            <Card key={token.token} className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm font-medium">Token: {token.token}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-sm ${token.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {token.isValid ? 'Valide' : 'Invalide'}
                  </span>
                  {token.isValid && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => invalidateToken(token.token)}
                    >
                      Invalider
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
