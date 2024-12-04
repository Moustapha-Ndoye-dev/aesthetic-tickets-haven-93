import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSave = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: name })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées",
        className: "bg-white border border-gray-200",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le profil",
      });
    }
  };

  const projectUrl = "https://rmmqiqpafecsaclqfrks.supabase.co";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
      
      <Tabs defaultValue="profile" className="bg-white rounded-lg shadow">
        <TabsList className="border-b">
          <TabsTrigger value="profile">Profil</TabsTrigger>
          {user?.role === "organizer" && (
            <TabsTrigger value="api">API</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nom</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white"
                  disabled
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleSave}>
                  Sauvegarder
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {user?.role === "organizer" && (
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Endpoints</h3>
                  <div className="space-y-4 text-sm">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-primary mb-2">GET /rest/v1/events</p>
                      <p className="text-gray-600 mb-2">Liste tous les événements</p>
                      <p className="font-mono text-xs">{`${projectUrl}/rest/v1/events`}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-primary mb-2">GET /rest/v1/tickets</p>
                      <p className="text-gray-600 mb-2">Liste les tickets d'un événement</p>
                      <p className="font-mono text-xs">{`${projectUrl}/rest/v1/tickets?event_id=eq.{event_id}`}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-primary mb-2">POST /rest/v1/tickets</p>
                      <p className="text-gray-600 mb-2">Crée un nouveau ticket</p>
                      <p className="font-mono text-xs">{`${projectUrl}/rest/v1/tickets`}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium text-primary mb-2">PATCH /rest/v1/tickets</p>
                      <p className="text-gray-600 mb-2">Met à jour un ticket (validation)</p>
                      <p className="font-mono text-xs">{`${projectUrl}/rest/v1/tickets?id=eq.{ticket_id}`}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Authentication</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Ajoutez ces headers à toutes vos requêtes :
                  </p>
                  <div className="space-y-2 font-mono text-xs">
                    <p>apikey: [votre_clé_api]</p>
                    <p>Authorization: Bearer [votre_jwt_token]</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Settings;