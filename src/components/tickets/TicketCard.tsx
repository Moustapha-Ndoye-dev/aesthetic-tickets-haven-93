import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TicketCardProps {
  id: string;
  eventName: string;
  date: string;
  location: string;
  time: string;
  token: string;
  price: string;
  isValid: boolean;
  onDownload: (id: string) => void;
}

export const TicketCard = ({
  id,
  eventName,
  date,
  location,
  time,
  token,
  price,
  isValid,
  onDownload,
}: TicketCardProps) => {
  if (!isValid) return null;

  return (
    <Card className="w-full md:w-[400px] hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{eventName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <QRCodeSVG value={token} size={200} />
        </div>
        <div className="text-center space-y-2">
          <p className="font-medium text-lg">{date} à {time}</p>
          <p className="text-gray-600">{location}</p>
          <p className="text-primary font-semibold">{price}</p>
        </div>
        <Button 
          className="w-full flex items-center gap-2 justify-center" 
          onClick={() => onDownload(id)}
        >
          <Download className="w-4 h-4" />
          Télécharger le ticket
        </Button>
      </CardContent>
    </Card>
  );
};