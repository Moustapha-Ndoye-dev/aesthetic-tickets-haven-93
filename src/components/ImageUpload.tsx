import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (imageUrl: string) => void;
  defaultImage?: string;
}

export const ImageUpload = ({ onImageSelect, defaultImage }: ImageUploadProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImage || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewUrl(imageUrl);
        onImageSelect(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex items-center gap-2 cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1.5 rounded-md text-sm"
        >
          <Upload className="w-4 h-4" />
          Choisir une image
        </label>
      </div>
      {previewUrl && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};