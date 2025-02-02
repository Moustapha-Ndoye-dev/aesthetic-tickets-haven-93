import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import type { UserRole } from "@/lib/supabase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Début de l'inscription...");

    try {
      // 1. Create auth user with metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role
          }
        }
      });

      if (authError) throw authError;

      const userId = authData.user?.id;
      if (!userId) {
        throw new Error("Erreur lors de la création du compte");
      }

      console.log("Utilisateur créé avec succès:", userId);

      // 2. Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: userId,
          email,
          full_name: fullName,
          role
        }])
        .single();

      if (profileError) {
        console.error("Erreur lors de la création du profil:", profileError);
        throw profileError;
      }

      // 3. Sign out and redirect to login
      await supabase.auth.signOut();

      toast({
        title: "Inscription réussie",
        description: "Vous pouvez maintenant vous connecter",
      });

      navigate('/login');
    } catch (error: any) {
      console.error("Erreur d'inscription:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'inscription",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-4rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Inscription</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Type de compte</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">Utilisateur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="organizer" id="organizer" />
                  <Label htmlFor="organizer">Organisateur</Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Inscription en cours..." : "S'inscrire"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Déjà un compte ?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;