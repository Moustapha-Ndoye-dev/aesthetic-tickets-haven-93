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

    // 1. Upload image if present
    let imageUrl = '/placeholder.svg';
    if (formData.image && formData.image.startsWith('data:image')) {
      try {
        const base64Data = formData.image.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const file = new File([byteArray], 'event-image.jpg', { type: 'image/jpeg' });
        
        const fileName = `${crypto.randomUUID()}.jpg`;
        const { error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(fileName, file);

        if (uploadError) {
          throw new Error('Erreur lors du téléchargement de l\'image');
        }

        const { data } = await supabase.storage
          .from('event-images')
          .getPublicUrl(fileName);
        
        imageUrl = data.publicUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Erreur lors du téléchargement de l'image",
        });
        setLoading(false);
        return;
      }
    }

    // 2. Create event
    try {
      const eventDateTime = `${formData.date}T${formData.time}`;
      const eventData = {
        title: formData.title,
        description: formData.description,
        date: eventDateTime,
        location: formData.location,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        category: formData.category,
        image_url: imageUrl,
        organizer_id: user.id,
      };

      const { error: insertError } = await supabase
        .from('events')
        .insert([eventData]);

      if (insertError) {
        throw new Error('Erreur lors de la création de l\'événement');
      }

      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['organizer-events'] });
      
      toast({
        title: "Succès",
        description: "L'événement a été créé avec succès",
      });
      
      navigate("/organizer/events");
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de l'événement",
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
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-6">
        <BasicInfoFields formData={formData} handleChange={handleChange} />
        <DetailsFields 
          formData={formData} 
          handleChange={handleChange}
          handleImageSelect={handleImageSelect}
        />
        <div className="col-span-2 flex justify-end gap-2 pt-4">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? "Création..." : "Créer l'événement"}
          </Button>
        </div>
      </div>
    </form>
  );
};