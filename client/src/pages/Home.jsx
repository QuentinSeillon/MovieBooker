import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();


  return (
    <div>
      <h1 className="text-center mt-3">
        Bienvenue {user ? user.email : "invité"} sur notre site de réservation de séance
      </h1>
    </div>
  );
}

export default Home;
