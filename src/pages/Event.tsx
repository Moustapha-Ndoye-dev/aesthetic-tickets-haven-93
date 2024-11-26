import { Calendar, MapPin, Share2, Ticket, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Event = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-[50vh] relative overflow-hidden bg-black">
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
          alt="Event cover"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Festival de Jazz de Paris</h1>
              <div className="flex flex-wrap gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>15 Juin 2024 - 20:00</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Parc des Expositions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>5000+ participants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">À propos de l'événement</h2>
                <p className="text-gray-600 leading-relaxed">
                  Rejoignez-nous pour une soirée exceptionnelle de jazz au cœur de Paris. 
                  Les meilleurs artistes de la scène jazz internationale se réunissent pour 
                  vous offrir un moment musical inoubliable. Au programme : performances live, 
                  jam sessions et découvertes musicales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Programme</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="text-primary font-medium">20:00</div>
                    <div>
                      <h3 className="font-medium">Ouverture des portes</h3>
                      <p className="text-gray-600">Accueil et installation du public</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-primary font-medium">20:30</div>
                    <div>
                      <h3 className="font-medium">Première partie</h3>
                      <p className="text-gray-600">Jazz Quartet de Paris</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-primary font-medium">22:00</div>
                    <div>
                      <h3 className="font-medium">Tête d'affiche</h3>
                      <p className="text-gray-600">Performance principale</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-6 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Billets</h2>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Pass Standard</span>
                        <span className="text-primary font-semibold">45€</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Accès à tous les concerts</p>
                      <Button className="w-full">
                        <Ticket className="w-4 h-4 mr-2" />
                        Réserver
                      </Button>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Pass VIP</span>
                        <span className="text-primary font-semibold">90€</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">Accès VIP + Meet & Greet</p>
                      <Button className="w-full" variant="outline">
                        <Ticket className="w-4 h-4 mr-2" />
                        Réserver
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Partager l'événement
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Event;