import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logout();        // Appelle le backend et nettoie le contexte
    navigate("/");    // Redirige vers la page de login (ou "/" si tu préfères)
  };

  return (
    <div>
      <h1>
        Bienvenue {user ? user.email : "invité"} sur notre site de réservation de séance
      </h1>

      {!user && (
        <button onClick={goToLogin}>Se connecter</button>
      )}

      {user && (
        <button onClick={handleLogout}>Se déconnecter</button>
      )}
    </div>
  );
}

export default Home;
