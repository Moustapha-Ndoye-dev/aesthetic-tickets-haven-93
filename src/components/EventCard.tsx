import { Calendar, MapPin } from "lucide-react";
import { Button } from "./ui/button";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
  category: string;
}

export const EventCard = ({ title, date, location, image, price, category }: EventCardProps) => {
  return (
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
          <p className="font-medium text-primary text-lg">{price}</p>
          <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
            Réserver
          </Button>
        </div>
      </div>
    </div>
  );
};