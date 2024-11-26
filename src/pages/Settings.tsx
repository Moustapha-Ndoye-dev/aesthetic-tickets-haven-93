import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [apiToken, setApiToken] = useState("your-api-token-123");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSave = () => {
    // Simuler la mise à jour du profil
    toast({
      title: "Profil mis à jour",
      description: "Vos modifications ont été enregistrées",
      className: "bg-white border border-gray-200",
    });
  };

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
                <CardTitle>API Token</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Votre Token API</label>
                  <div className="flex gap-2">
                    <Input value={apiToken} readOnly className="bg-white" />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(apiToken);
                        toast({
                          title: "Token copié",
                          description: "Le token a été copié dans le presse-papier",
                          className: "bg-white border border-gray-200",
                        });
                      }}
                      variant="outline"
                    >
                      Copier
                    </Button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Documentation API</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>GET /api/tickets/validate/{"{token}"}</p>
                    <p>POST /api/tickets/invalidate/{"{token}"}</p>
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