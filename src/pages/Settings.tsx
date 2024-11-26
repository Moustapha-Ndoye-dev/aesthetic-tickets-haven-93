import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

const Settings = () => {
  const { user, logout } = useAuth();
  const [apiToken, setApiToken] = useState("your-api-token-123");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
      
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Nom</label>
                <Input defaultValue={user?.name} />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input defaultValue={user?.email} />
              </div>
              <div className="flex justify-between">
                <Button variant="outline">Sauvegarder</Button>
                <Button variant="destructive" onClick={logout}>
                  Déconnexion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Token</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Votre Token API</label>
                <div className="flex gap-2">
                  <Input value={apiToken} readOnly />
                  <Button
                    onClick={() => navigator.clipboard.writeText(apiToken)}
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
      </Tabs>
    </div>
  );
};

export default Settings;