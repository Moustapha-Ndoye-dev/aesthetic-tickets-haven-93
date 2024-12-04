import { useToast } from "@/components/ui/use-toast";
import { TicketCard } from "@/components/tickets/TicketCard";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const MyTickets = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const { data: tickets = [], isLoading } = useQuery({
    queryKey: ['my-tickets', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          event:events (
            title,
            date,
            location,
            price
          )
        `)
        .eq('user_id', user.id)
        .eq('is_valid', true);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

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
      
      {isLoading ? (
        <div className="text-center">Chargement...</div>
      ) : tickets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              id={ticket.id}
              eventName={ticket.event.title}
              date={ticket.event.date}
              location={ticket.event.location}
              time={new Date(ticket.event.date).toLocaleTimeString()}
              token={ticket.token}
              price={ticket.event.price.toString()}
              isValid={ticket.is_valid}
              onDownload={downloadTicket}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Vous n'avez pas encore de tickets.
        </p>
      )}
    </div>
  );
};

export default MyTickets;