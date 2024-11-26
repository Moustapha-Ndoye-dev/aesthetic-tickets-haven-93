import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { QRCodeSVG } from "qrcode.react";

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

    setShowTicketDialog(true);
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

      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Votre ticket</DialogTitle>
          </DialogHeader>
          <div id={`ticket-${id}`} className="bg-white p-6 rounded-lg">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={`event-${id}-${user?.id}`}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">{date}</p>
                <p className="text-gray-600">{location}</p>
                <p className="font-medium text-primary">{price}€</p>
              </div>
            </div>
          </div>
          <Button onClick={downloadTicket} className="w-full mt-4">
            Télécharger le ticket
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};