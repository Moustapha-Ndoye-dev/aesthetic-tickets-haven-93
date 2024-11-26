import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MyTickets = () => {
  const { toast } = useToast();
  const reservations = [
    {
      id: "RES-001",
      eventName: "Festival de Jazz",
      customerName: "Jean Dupont",
      customerEmail: "jean@example.com",
      date: "2024-06-15",
      token: "unique-token-123",
      isValid: true,
      location: "Parc des Expositions",
      time: "20:00",
      price: "45€",
      purchaseDate: "2024-03-15",
    },
    {
      id: "RES-002",
      eventName: "Concert Rock",
      customerName: "Marie Martin",
      customerEmail: "marie@example.com",
      date: "2024-07-20",
      token: "unique-token-456",
      isValid: true,
      location: "Zénith",
      time: "21:00",
      price: "35€",
      purchaseDate: "2024-03-16",
    },
  ];

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
      <h1 className="text-3xl font-bold mb-8">Liste des Réservations</h1>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Réservation</TableHead>
              <TableHead>Événement</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.id}</TableCell>
                <TableCell>{reservation.eventName}</TableCell>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.customerEmail}</TableCell>
                <TableCell>{reservation.date}</TableCell>
                <TableCell>{reservation.price}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    reservation.isValid 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {reservation.isValid ? "Valide" : "Utilisé"}
                  </span>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => downloadTicket(reservation.id)}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Télécharger
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Modal pour afficher le QR code lors du téléchargement */}
      {reservations.map((reservation) => (
        <div key={reservation.id} id={`ticket-${reservation.id}`} className="hidden">
          <Card className="w-[400px] p-6">
            <CardHeader>
              <CardTitle>{reservation.eventName}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <QRCodeSVG value={reservation.token} size={200} />
              <div className="text-center">
                <p className="font-medium">{reservation.customerName}</p>
                <p className="text-sm text-gray-500">{reservation.date} à {reservation.time}</p>
                <p className="text-sm text-gray-500">{reservation.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MyTickets;