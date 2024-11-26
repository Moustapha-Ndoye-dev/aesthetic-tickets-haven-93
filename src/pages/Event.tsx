import { Calendar, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

const Event = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-[40vh] relative overflow-hidden bg-black">
        <img
          src="/placeholder.svg"
          alt="Event cover"
          className="w-full h-full object-cover opacity-70"
        />
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4">Festival de Jazz</h1>
              <div className="flex flex-wrap gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>15 Juin 2024 - 20:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Parc des Expositions</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">À propos de l'événement</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-semibold mb-4">Billets</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Pass 1 jour</span>
                    <span className="text-primary font-semibold">45€</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Accès à tous les concerts du jour</p>
                  <Button className="w-full">
                    <Ticket className="w-4 h-4 mr-2" />
                    Réserver
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Event;