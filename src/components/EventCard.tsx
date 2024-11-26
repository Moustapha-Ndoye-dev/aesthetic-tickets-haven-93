import { Calendar } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
}

export const EventCard = ({ title, date, location, image, price }: EventCardProps) => {
  return (
    <div className="group rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-3">{location}</p>
        <p className="font-medium text-primary">À partir de {price}</p>
      </div>
    </div>
  );
};