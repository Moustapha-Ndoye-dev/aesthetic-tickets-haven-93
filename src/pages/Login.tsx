import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import type { Profile, UserRole } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Tentative de connexion...");
    
    try {
      // First, attempt to sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Erreur d'authentification:", authError);
        throw authError;
      }

      if (!authData.user) {
        throw new Error("Aucun utilisateur trouvé");
      }

      console.log("Authentification réussie, récupération du profil...");

      // Then fetch the user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("Erreur de récupération du profil:", profileError);
        throw profileError;
      }

      if (!profileData) {
        throw new Error("Profil non trouvé");
      }

      // Validate and transform the role
      const role = profileData.role as UserRole;
      if (!['user', 'organizer', 'admin'].includes(role)) {
        throw new Error("Rôle utilisateur invalide");
      }

      // Create a properly typed profile object
      const profile: Profile = {
        id: profileData.id,
        email: profileData.email,
        full_name: profileData.full_name,
        role: role,
        created_at: profileData.created_at,
      };

      setUser(profile);
      
      console.log("Connexion réussie, redirection...");
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message === "Invalid login credentials" 
          ? "Email ou mot de passe incorrect"
          : error.message || "Une erreur est survenue lors de la connexion",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Connexion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
            <p className="text-center text-sm text-gray-600">
              Pas encore de compte ?{" "}
              <Link to="/register" className="text-primary hover:underline">
                S'inscrire
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;