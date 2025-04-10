import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user, logout, register } = useAuth();
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };


  return (
    <div>
      <h1>
        Bienvenue {user ? user.email : "invité"} sur notre site de réservation de séance
      </h1>

      {!user && (
        <>
          <button onClick={goToLogin}>Se connecter</button>
          <button onClick={goToRegister} style={{ marginLeft: "10px" }}>
            S'inscrire
          </button>
        </>
      )}

      {user && (
        <button onClick={handleLogout}>Se déconnecter</button>
      )}
    </div>
  );
}

export default Home;
