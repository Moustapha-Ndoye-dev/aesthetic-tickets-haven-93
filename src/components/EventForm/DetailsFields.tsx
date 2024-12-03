import { Input } from "../ui/input";
import { ImageUpload } from "../ImageUpload";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DetailsFieldsProps {
  formData: {
    location: string;
    price: string;
    capacity: string;
    category: string;
    image: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleImageSelect: (imageUrl: string) => void;
}

export const DetailsFields = ({ formData, handleChange, handleImageSelect }: DetailsFieldsProps) => {
  const { toast } = useToast();
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [showNewCategory, setShowNewCategory] = useState(false);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('name');
    if (data) setCategories(data);
  };

  useState(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ name: newCategory }]);

      if (error) throw error;

      toast({
        title: "Catégorie ajoutée",
        description: "La nouvelle catégorie a été ajoutée avec succès",
      });

      fetchCategories();
      setNewCategory("");
      setShowNewCategory(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible d'ajouter la catégorie",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">Lieu</label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="price" className="block text-sm font-medium mb-1">Prix (€)</label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="capacity" className="block text-sm font-medium mb-1">Capacité</label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          min="1"
          value={formData.capacity}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="category" className="block text-sm font-medium">Catégorie</label>
          <Button 
            type="button" 
            variant="ghost" 
            size="sm"
            onClick={() => setShowNewCategory(!showNewCategory)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Nouvelle catégorie
          </Button>
        </div>
        
        {showNewCategory ? (
          <div className="flex gap-2 mb-2">
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Nom de la catégorie"
              className="flex-1"
            />
            <Button type="button" onClick={handleAddCategory}>
              Ajouter
            </Button>
          </div>
        ) : null}

        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
          required
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map(cat => (
            <option key={cat.name} value={cat.name.toLowerCase()}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <ImageUpload onImageSelect={handleImageSelect} defaultImage={formData.image} />
      </div>
    </div>
  );
};