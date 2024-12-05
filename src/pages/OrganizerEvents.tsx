import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EventForm } from "@/components/EventForm";
import { EventFormEdit } from "@/components/EventFormEdit";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { EventList } from "@/components/EventList";
import { TokenList } from "@/components/TokenList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const OrganizerEvents = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showEventForm, setShowEventForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['organizer-events'],
    queryFn: async () => {
      if (!user?.id) return [];
      
      console.log('Fetching organizer events...');
      const { data, error } = await supabase
        .from('events')
        .select(`
          *,
          tickets (
            id,
            is_valid
          )
        `)
        .eq('organizer_id', user.id);

      if (error) {
        console.error('Error fetching events:', error);
        throw error;
      }

      console.log('Events fetched successfully:', data);
      return data || [];
    },
    enabled: !!user?.id,
  });

  const handleEdit = (event: any) => {
    setSelectedEvent(event);
    setShowEditForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .eq('organizer_id', user.id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['organizer-events'] });
      
      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès",
        className: "bg-white border-green-500",
      });
      
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer l'événement",
        className: "bg-white border-red-500",
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-gray-600">
          Veuillez vous connecter pour accéder à cette page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes Événements</h1>
        <Button onClick={() => setShowEventForm(true)} className="whitespace-nowrap">
          <Plus className="w-4 h-4 mr-2" />
          Nouvel Événement
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Chargement...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg mb-4">
            Vous n'avez pas encore créé d'événements.
          </p>
          <Button onClick={() => setShowEventForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Créer mon premier événement
          </Button>
        </div>
      ) : (
        <EventList 
          events={events}
          onEdit={handleEdit}
          onDelete={(id) => {
            setSelectedEventId(id);
            setShowDeleteDialog(true);
          }}
        />
      )}

      <div className="mt-8">
        <TokenList />
      </div>

      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent className="max-w-5xl mx-auto">
          <DialogTitle>Créer un nouvel événement</DialogTitle>
          <EventForm />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="max-w-4xl mx-4">
          <DialogTitle>Modifier l'événement</DialogTitle>
          {selectedEvent && (
            <EventFormEdit event={selectedEvent} onClose={() => setShowEditForm(false)} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="max-w-md mx-4">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => selectedEventId && handleDelete(selectedEventId)}>
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OrganizerEvents;