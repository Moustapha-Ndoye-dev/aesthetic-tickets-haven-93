import { create } from "zustand";
import { supabase, type Profile } from "@/lib/supabase";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AuthState {
  user: Profile | null;
  isOrganizer: boolean;
  setUser: (user: Profile | null) => void;
  logout: () => Promise<void>;
  loading: boolean;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isOrganizer: false,
  loading: true,
  setUser: (user) => set({ 
    user, 
    isOrganizer: user?.role === "organizer" || user?.role === "admin",
    loading: false
  }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isOrganizer: false });
  },
}));

export const useAuthListener = () => {
  const { setUser } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        // Récupérer le profil
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Error fetching profile:', error);
              toast({
                variant: "destructive",
                title: "Erreur",
                description: "Impossible de récupérer votre profil",
              });
              return;
            }
            setUser(data as Profile);
          });
      }
    });

    // Écouter les changements d'auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (event === 'SIGNED_IN' && session?.user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
            toast({
              variant: "destructive",
              title: "Erreur",
              description: "Impossible de récupérer votre profil",
            });
            return;
          }

          setUser(data as Profile);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, toast]);
};