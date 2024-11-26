import { SearchBar } from "./SearchBar";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-[70vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/70" />
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30" 
          alt="Events background" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto space-y-8 bg-black/40 p-8 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-up">
            Trouvez et réservez vos événements
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Concerts, spectacles, festivals et plus encore
          </p>
          <div className="pt-8 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
};