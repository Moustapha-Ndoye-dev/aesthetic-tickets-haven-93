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
      console.log('Creating event with data:', formData);
      
      // Combine date and time
      const eventDateTime = `${formData.date}T${formData.time}`;

      // Handle image upload
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

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(fileName);
          
          imageUrl = publicUrl;
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadError) {
          console.error('Error uploading image:', uploadError);
          // Continue with placeholder image if upload fails
          console.log('Using placeholder image instead');
        }
      }
      
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

      console.log('Sending event data to Supabase:', eventData);
      
      const { error } = await supabase
        .from('events')
        .insert(eventData);

      if (error) throw error;

      console.log('Event created successfully');
      
      await queryClient.invalidateQueries({ queryKey: ['events'] });
      await queryClient.invalidateQueries({ queryKey: ['organizer-events'] });
      
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
        description: "Une erreur est survenue lors de la création de l'événement",
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