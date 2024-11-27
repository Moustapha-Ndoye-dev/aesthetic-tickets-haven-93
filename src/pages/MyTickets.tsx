import { useToast } from "@/components/ui/use-toast";
import { TicketCard } from "@/components/tickets/TicketCard";
import { useAuth } from "@/hooks/useAuth";

const MyTickets = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  // Simulation des tickets de l'utilisateur
  const userTickets = [
    {
      id: "TIC-001",
      eventName: "Festival de Jazz",
      date: "2024-06-15",
      location: "Parc des Expositions",
      time: "20:00",
      token: "unique-token-123",
      price: "45€",
    },
    {
      id: "TIC-002",
      eventName: "Concert Rock",
      date: "2024-07-20",
      location: "Zénith",
      time: "21:00",
      token: "unique-token-456",
      price: "35€",
    },
  ];

  const isTicketValid = (date: string) => {
    const eventDate = new Date(date);
    const today = new Date();
    eventDate.setDate(eventDate.getDate() + 1);
    return today < eventDate;
  };

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
        {userTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            {...ticket}
            isValid={isTicketValid(ticket.date)}
            onDownload={downloadTicket}
          />
        ))}
      </div>

      {userTickets.length === 0 && (
        <p className="text-center text-gray-600">
          Vous n'avez pas encore de tickets.
        </p>
      )}
    </div>
  );
};

export default MyTickets;