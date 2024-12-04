import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import { BasicInfoFields } from "./EventForm/BasicInfoFields";
import { DetailsFields } from "./EventForm/DetailsFields";

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
    category: "",
    image: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Vous devez être connecté pour créer un événement",
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
      });
      
      navigate("/organizer/events");
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer l'événement",
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
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
      <div className="space-y-6">
        <BasicInfoFields formData={formData} handleChange={handleChange} />
        <DetailsFields 
          formData={formData} 
          handleChange={handleChange}
          handleImageSelect={handleImageSelect}
        />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Création..." : "Créer l'événement"}
          </Button>
        </div>
      </div>
    </form>
  );
};