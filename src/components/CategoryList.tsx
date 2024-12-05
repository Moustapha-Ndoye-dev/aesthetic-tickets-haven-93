import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, Music, Ticket, Users } from "lucide-react";

// Map des icônes par défaut pour certaines catégories
const categoryIcons: { [key: string]: any } = {
  "Concerts": Music,
  "Festivals": Users,
  "Spectacles": Ticket,
  "Expositions": Calendar,
};

export const CategoryList = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      console.log('Fetching categories from Supabase...');
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) {
        console.error('Error fetching categories:', error);
        throw error;
      }

      console.log('Categories fetched successfully:', data);
      return data || [];
    },
  });

  return (
    <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto">
      {categories.map((category) => {
        const IconComponent = categoryIcons[category.name] || Calendar;
        
        return (
          <button
            key={category.id}
            className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-2 group"
          >
            <IconComponent className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium truncate">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};