import { SearchBar } from "./SearchBar";

export const Hero = () => {
  const handleSearch = (term: string) => {
    console.log("Searching for:", term);
  };

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
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <SearchBar onSearch={handleSearch} />
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center flex-1 min-w-[200px] max-w-[250px]">
                <h3 className="text-2xl font-bold mb-2">1000+</h3>
                <p className="text-sm text-gray-200">Événements disponibles</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center flex-1 min-w-[200px] max-w-[250px]">
                <h3 className="text-2xl font-bold mb-2">50k+</h3>
                <p className="text-sm text-gray-200">Utilisateurs satisfaits</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-center flex-1 min-w-[200px] max-w-[250px]">
                <h3 className="text-2xl font-bold mb-2">24/7</h3>
                <p className="text-sm text-gray-200">Support client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};