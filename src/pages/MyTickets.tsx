import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MyTickets = () => {
  const tickets = [
    {
      id: "1",
      eventName: "Festival de Jazz",
      date: "2024-06-15",
      token: "unique-token-123",
      isValid: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Mes Tickets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{ticket.eventName}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <QRCodeSVG
                  value={ticket.token}
                  size={200}
                  level="H"
                  includeMargin
                />
              </div>
              <div className="text-center">
                <p className="text-gray-600">{ticket.date}</p>
                <p className={ticket.isValid ? "text-green-500" : "text-red-500"}>
                  {ticket.isValid ? "Valide" : "Utilisé"}
                </p>
              </div>
              <Button onClick={() => window.print()} variant="outline">
                Télécharger
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyTickets;