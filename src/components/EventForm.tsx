import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ImageUpload } from "./ImageUpload";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const EventForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
    capacity: "",
    category: "concert",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Vous devez être connecté pour créer un événement",
        className: "bg-white border-red-500",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('events')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            date: `${formData.date}T${formData.time}`,
            location: formData.location,
            price: parseFloat(formData.price),
            capacity: parseInt(formData.capacity),
            category: formData.category,
            image_url: formData.image,
            organizer_id: user.id,
          }
        ]);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['organizer-events'] });
      
      toast({
        title: "Événement créé",
        description: "Votre événement a été créé avec succès",
        className: "bg-white border-green-500",
      });
      
      navigate("/organizer/events");
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer l'événement",
        className: "bg-white border-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image: imageUrl }));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Titre</label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="h-[42px] resize-none"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">Heure</label>
            <Input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

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
            <label htmlFor="category" className="block text-sm font-medium mb-1">Catégorie</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm"
              required
            >
              <option value="concert">Concert</option>
              <option value="festival">Festival</option>
              <option value="spectacle">Spectacle</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <ImageUpload onImageSelect={handleImageSelect} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Création..." : "Créer l'événement"}
        </Button>
      </div>
    </form>
  );
};