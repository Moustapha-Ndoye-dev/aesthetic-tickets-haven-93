import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { user, isOrganizer } = useAuth();

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary">EventTix</Link>
        
        <div className="flex items-center gap-6">
          {user ? (
            <>
              {isOrganizer ? (
                <>
                  <Link to="/organizer/events" className="hover:text-primary transition-colors">Mes Événements</Link>
                  <Link to="/my-tickets" className="hover:text-primary transition-colors">Mes Réservations</Link>
                </>
              ) : (
                <Link to="/my-tickets" className="hover:text-primary transition-colors">Mes Tickets</Link>
              )}
              <Link to="/settings" className="hover:text-primary transition-colors">Paramètres</Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button>Inscription</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};