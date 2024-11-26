import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { user, isOrganizer } = useAuth();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">EventTix</Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/my-tickets">Mes Tickets</Link>
              {isOrganizer && <Link to="/organizer/events">Mes Événements</Link>}
              <Link to="/settings">Paramètres</Link>
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