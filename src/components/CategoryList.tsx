import { Calendar, Music, Ticket, Users } from "lucide-react";

const categories = [
  { name: "Concerts", icon: Music },
  { name: "Festivals", icon: Users },
  { name: "Spectacles", icon: Ticket },
  { name: "Expositions", icon: Calendar },
];

export const CategoryList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <button
          key={category.name}
          className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center gap-3 group"
        >
          <category.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
};