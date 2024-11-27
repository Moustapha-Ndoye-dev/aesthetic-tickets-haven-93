import { useToast } from "@/components/ui/use-toast";
import { TicketCard } from "@/components/tickets/TicketCard";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

interface Ticket {
  id: string;
  eventId: string;
  eventName: string;
  date: string;
  location: string;
  price: string;
  userId: string;
  token: string;
  isValid: boolean;
}

const MyTickets = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    if (user) {
      const storedTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const userTickets = storedTickets.filter((ticket: Ticket) => ticket.userId === user.id);
      setTickets(userTickets);
    }
  }, [user]);

  const downloadTicket = async (ticketId: string) => {
    try {
      const ticket = document.getElementById(`ticket-${ticketId}`);
      if (!ticket) return;

      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(ticket);
      
      const link = document.createElement('a');
      link.download = `ticket-${ticketId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Ticket téléchargé",
        description: "Votre ticket a été téléchargé avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le ticket.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">
          Veuillez vous connecter pour voir vos tickets.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes Tickets</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            id={ticket.id}
            eventName={ticket.eventName}
            date={ticket.date}
            location={ticket.location}
            time="20:00"
            token={ticket.token}
            price={ticket.price}
            isValid={ticket.isValid}
            onDownload={downloadTicket}
          />
        ))}
      </div>

      {tickets.length === 0 && (
        <p className="text-center text-gray-600">
          Vous n'avez pas encore de tickets.
        </p>
      )}
    </div>
  );
};

export default MyTickets;