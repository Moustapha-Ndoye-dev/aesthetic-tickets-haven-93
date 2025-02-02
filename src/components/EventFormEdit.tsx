import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { ImageUpload } from "./ImageUpload";

interface EventFormEditProps {
  event: {
    id: string;
    title: string;
    description?: string;
    date: string;
    time?: string;
    location?: string;
    price?: string;
    ticketsSold: number;
    capacity: number;
    image?: string;
  };
  onClose: () => void;
}

export const EventFormEdit = ({ event, onClose }: EventFormEditProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: event.title,
    description: event.description || "",
    date: event.date,
    time: event.time || "12:00",
    location: event.location || "",
    price: event.price || "0",
    capacity: event.capacity.toString(),
    image: event.image || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Événement modifié",
      description: "Votre événement a été modifié avec succès",
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <label className="block text-sm font-medium mb-1">Image</label>
            <ImageUpload onImageSelect={handleImageSelect} defaultImage={formData.image} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
        <Button type="submit">Modifier</Button>
      </div>
    </form>
  );
};