import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { QRCodeSVG } from "qrcode.react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image_url: string | null;
  price: number;
  category: string;
}

export const EventCard = ({ id, title, date, location, image_url, price, category }: EventCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [ticketToken, setTicketToken] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const confirmReservation = async () => {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver un billet",
        className: "bg-white border-red-500",
      });
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const token = `TKN-${Math.random().toString(36).substr(2, 9)}`;
      
      const { error } = await supabase
        .from('tickets')
        .insert([
          {
            event_id: id,
            user_id: user.id,
            token: token,
          }
        ]);

      if (error) throw error;

      setTicketToken(token);
      setShowConfirmDialog(false);
      setShowTicketDialog(true);
      
      toast({
        title: "Réservation confirmée",
        description: "Votre billet a été réservé avec succès",
        className: "bg-white border-green-500",
      });
    } catch (error) {
      console.error('Error creating ticket:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de réserver le billet",
        className: "bg-white border-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadTicket = async () => {
    try {
      const ticket = document.getElementById(`ticket-${id}`);
      if (!ticket) return;

      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(ticket);
      
      const link = document.createElement('a');
      link.download = `ticket-${id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Ticket téléchargé",
        description: "Votre ticket a été téléchargé avec succès",
        className: "bg-white border-green-500",
      });
    } catch (error) {
      console.error('Error downloading ticket:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le ticket",
        className: "bg-white border-red-500",
      });
    }
  };

  return (
    <>
      <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
            src={image_url || '/placeholder.svg'}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm">
            {category}
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <h3 className="font-semibold text-xl mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="font-medium text-primary text-lg">{price}€</p>
            <Button 
              variant="outline" 
              className="group-hover:bg-primary group-hover:text-white transition-colors"
              onClick={() => setShowConfirmDialog(true)}
              disabled={loading}
            >
              {loading ? "Réservation..." : "Réserver"}
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la réservation</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous confirmer la réservation pour l'événement "{title}" au prix de {price}€ ?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReservation} disabled={loading}>
              {loading ? "Réservation..." : "Confirmer la réservation"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="bg-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle>Votre ticket</DialogTitle>
          </DialogHeader>
          <div id={`ticket-${id}`} className="p-4">
            <div className="text-center space-y-3">
              <h3 className="text-lg font-bold">{title}</h3>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={ticketToken}
                  size={150}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">{new Date(date).toLocaleDateString()}</p>
                <p className="text-gray-600 text-sm">{location}</p>
                <p className="font-medium text-primary">{price}€</p>
              </div>
            </div>
          </div>
          <Button onClick={downloadTicket} className="w-full mt-2">
            Télécharger le ticket
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};