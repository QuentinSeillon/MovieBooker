import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning px-3 position-relative">
      <Link className="navbar-brand text-dark" to="/">
        🎬 MovieBooker
      </Link>

      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="dropdown">
          <button
            className="btn btn-warning dropdown-toggle fw-bold"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Films
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to="/movies">
                Voir tous les films
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/movies/current">
                Voir films actuels
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          {user ? (
            <li className="nav-item">
              <button className="btn btn-link nav-link text-dark" onClick={handleLogout}>
                Se déconnecter
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/login">
                  Se connecter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/register">
                  S'inscrire
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
