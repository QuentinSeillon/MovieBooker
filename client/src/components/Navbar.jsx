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
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning px-3">
        <Link className="navbar-brand text-dark" to="/">🎬 CinéBook</Link>

        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/movies">Films</Link>
            </li>
            {user ? (
                <li className="nav-item">
                    <button className="btn btn-link nav-link text-dark" onClick={handleLogout}>
                    Se déconnecter
                    </button>
                </li>
            ) : (
                <>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/login">Se connecter</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/register">S'inscrire</Link>
                </li>
                </>
            )}
            </ul>
        </div>
    </nav>

  );
};

export default Navbar;
