import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MyTickets = () => {
  const { toast } = useToast();
  const tickets = [
    {
      id: "1",
      eventName: "Festival de Jazz",
      date: "2024-06-15",
      token: "unique-token-123",
      isValid: true,
      location: "Parc des Expositions",
      time: "20:00",
    },
  ];

  const downloadTicket = async (ticketId: string) => {
    try {
      const ticket = document.getElementById(`ticket-${ticketId}`);
      if (!ticket) return;

      // Utiliser html2canvas pour convertir le ticket en image
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(ticket);
      
      // Convertir le canvas en PNG et télécharger
      const link = document.createElement('a');
      link.download = `ticket-${ticketId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast({
        title: "Ticket téléchargé",
        description: "Votre ticket a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      toast({
        title: "Erreur",
        description: "Impossible de télécharger le ticket.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Mes Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div id={`ticket-${ticket.id}`} className="bg-white p-6">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-primary">{ticket.eventName}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-6">
                <div className="bg-white p-4 rounded-lg shadow-inner">
                  <QRCodeSVG
                    value={ticket.token}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
                <div className="space-y-2 text-center">
                  <p className="text-lg font-medium">{ticket.date} à {ticket.time}</p>
                  <p className="text-gray-600">{ticket.location}</p>
                  <p className={`font-medium ${ticket.isValid ? "text-green-500" : "text-red-500"}`}>
                    {ticket.isValid ? "Valide" : "Utilisé"}
                  </p>
                </div>
                <Button 
                  onClick={() => downloadTicket(ticket.id)}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Télécharger
                </Button>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;