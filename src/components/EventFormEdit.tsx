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
    date: string;
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
    description: "",
    date: event.date,
    time: "12:00",
    location: "",
    price: "0",
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
    <form onSubmit={handleSubmit} className="space-y-4 w-full mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
        <Button type="submit">Modifier</Button>
      </div>
    </form>
  );
};