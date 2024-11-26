import { SearchBar } from "./SearchBar";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90 text-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10" />
      <div className="relative container mx-auto px-4 py-24 flex flex-col items-center text-center gap-8">
        <h1 className="text-4xl md:text-6xl font-bold animate-fade-up">
          Trouvez vos prochains événements
        </h1>
        <p className="text-xl md:text-2xl text-white/80 max-w-2xl animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Découvrez les meilleurs concerts, spectacles et festivals près de chez vous
        </p>
        <div className="w-full animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <SearchBar />
        </div>
      </div>
    </div>
  );
};