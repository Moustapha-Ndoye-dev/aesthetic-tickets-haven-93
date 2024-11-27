import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { QRCodeSVG } from "qrcode.react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  category: string;
}

export const EventCard = ({ id, title, date, location, image, price, category }: EventCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showTicketDialog, setShowTicketDialog] = useState(false);

  const handleReservation = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour réserver un billet",
        className: "bg-white border border-gray-200",
      });
      navigate("/login");
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmReservation = () => {
    setShowConfirmDialog(false);
    setShowTicketDialog(true);
    
    // Simuler la sauvegarde du ticket dans le localStorage
    const ticket = {
      id: `TIC-${Math.random().toString(36).substr(2, 9)}`,
      eventId: id,
      eventName: title,
      date,
      location,
      price,
      userId: user?.id,
      token: `event-${id}-${user?.id}`,
      isValid: true
    };

    const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
    localStorage.setItem('userTickets', JSON.stringify([...existingTickets, ticket]));

    toast({
      title: "Réservation confirmée",
      description: "Votre billet a été réservé avec succès",
      className: "bg-white border border-gray-200",
    });
  };

  const downloadTicket = async () => {
    try {
      const ticketElement = document.getElementById(`ticket-${id}`);
      if (!ticketElement) return;

      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(ticketElement);
      
      const link = document.createElement('a');
      link.download = `ticket-${title}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Ticket téléchargé",
        description: "Votre ticket a été téléchargé avec succès",
        className: "bg-white border border-gray-200",
      });
      
      navigate("/my-tickets");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de télécharger le ticket",
        className: "bg-white border border-gray-200",
      });
    }
  };

  return (
    <>
      <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="aspect-[16/9] overflow-hidden relative">
          <img
            src={image}
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
              <span>{date}</span>
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
              onClick={handleReservation}
            >
              Réserver
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
            <AlertDialogAction onClick={confirmReservation}>
              Confirmer la réservation
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
                  value={`event-${id}-${user?.id}`}
                  size={150}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="space-y-1">
                <p className="text-gray-600 text-sm">{date}</p>
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