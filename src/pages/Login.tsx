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
    console.log("Tentative de connexion avec:", { email });
    
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        console.error("Erreur d'authentification:", authError);
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          className: "bg-white border-red-500",
        });
        return;
      }

      if (!authData?.user) {
        console.error("Pas de données utilisateur après connexion");
        toast({
          variant: "destructive",
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          className: "bg-white border-red-500",
        });
        return;
      }

      console.log("Authentification réussie, récupération du profil...");

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .maybeSingle();

      if (profileError || !profileData) {
        console.error("Erreur de récupération du profil:", profileError);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de récupérer votre profil",
          className: "bg-white border-red-500",
        });
        return;
      }

      const role = profileData.role as UserRole;
      if (!['user', 'organizer', 'admin'].includes(role)) {
        console.error("Rôle invalide détecté:", role);
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Type de compte invalide",
          className: "bg-white border-red-500",
        });
        return;
      }

      const profile: Profile = {
        id: profileData.id,
        email: profileData.email,
        full_name: profileData.full_name,
        role: role,
        created_at: profileData.created_at,
      };

      console.log("Profil récupéré avec succès:", { id: profile.id, role: profile.role });
      
      setUser(profile);
      
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté",
        className: "bg-white border-green-500",
      });
      
      // Redirection basée sur le rôle
      if (role === 'organizer') {
        navigate("/organizer/events");
      } else {
        navigate("/");
      }

    } catch (error: any) {
      console.error("Erreur complète:", error);
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: "Une erreur est survenue lors de la connexion",
        className: "bg-white border-red-500",
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