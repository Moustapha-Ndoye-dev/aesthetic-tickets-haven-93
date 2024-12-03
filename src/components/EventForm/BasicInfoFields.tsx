import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface BasicInfoFieldsProps {
  formData: {
    title: string;
    description: string;
    date: string;
    time: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const BasicInfoFields = ({ formData, handleChange }: BasicInfoFieldsProps) => {
  return (
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
  );
};